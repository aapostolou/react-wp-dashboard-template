<?php


/**
 *  Implemented a custom function that returns the current logged in user's JWT Auth token
 */

/** Require the JWT library. */

use \Firebase\JWT\JWT;

if (!function_exists("generate_current_user_token")) {
  function generate_current_user_token()
  {
    $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : false;

    /** First thing, check the secret key if not exist return a error*/
    if (!$secret_key) {
      return new WP_Error(
        'jwt_auth_bad_config',
        __('JWT is not configurated properly, please contact the admin', 'wp-api-jwt-auth'),
        array(
          'status' => 403,
        )
      );
    }
    /** Try to authenticate the user with the passed credentials*/
    $user = wp_get_current_user();

    /** If the authentication fails return a error*/
    if (is_wp_error($user)) {
      $error_code = $user->get_error_code();
      return new WP_Error(
        '[jwt_auth] ' . $error_code,
        $user->get_error_message($error_code),
        array(
          'status' => 403,
        )
      );
    }

    /** Valid credentials, the user exists create the according Token */
    $issuedAt = time();
    $notBefore = apply_filters('jwt_auth_not_before', $issuedAt, $issuedAt);
    $expire = apply_filters('jwt_auth_expire', $issuedAt + (DAY_IN_SECONDS * 7), $issuedAt);

    $token = array(
      'iss' => get_bloginfo('url'),
      'iat' => $issuedAt,
      'nbf' => $notBefore,
      'exp' => $expire,
      'data' => array(
        'user' => array(
          'id' => $user->data->ID,
        ),
      ),
    );

    /** Let the user modify the token data before the sign. */
    $token = JWT::encode(apply_filters('jwt_auth_token_before_sign', $token, $user), $secret_key, 'HS256');

    /** The token is signed, now create the object with no sensible user data to the client*/
    $data = array(
      'token' => $token,
      'user_email' => $user->data->user_email,
      'user_nicename' => $user->data->user_nicename,
      'user_display_name' => $user->data->display_name,
    );

    return $token;

    /** Let the user modify the data before send it back */
    return apply_filters('jwt_auth_token_before_dispatch', $data, $user);
  }
}

/**
 *  Upload the media isnide the $_FILES array with key'image' and return the id
 * 
 *  $post_id = 0 means that the media won't be "attached" to any post
 * 
 *  if ($_FILES['image']){
 *    upload_media('image');
 *  }
 */
if (!function_exists("upload_media")) {
  function upload_media($file_id = 'image', $post_id = 0)
  {
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    return media_handle_upload($file_id, $post_id);
  }
}

/**
 * 
 */
if (!function_exists("get_all_image")) {
  function get_all_images()
  {
    $query_images_args = array(
      'post_type'      => 'attachment',
      'post_mime_type' => 'image',
      'post_status'    => 'inherit',
      'posts_per_page' => -1,
    );

    $query_images = new WP_Query($query_images_args);

    $images = array();
    foreach ($query_images->posts as $image) {
      $images[] = get_responsive_image($image->ID);
    }

    return $images;
  }
}

/**
 *  Will Return an object with the required properties to create a responsive image
 * 
 *  {
 *     media_id: int,
 *     src: string,
 *     srcset: string
 *  }
 * 
 *  *to delete use wp_delete_attachment($post_id) where $post_id is the id of the image
 */
if (!function_exists("get_responsive_image")) {
  function get_responsive_image($image_id)
  {
    $srcArray = wp_get_attachment_image_src($image_id);
    $src = $srcArray[0];
    $width = $srcArray[1];
    $height = $srcArray[2];
    $small_side = $width > $height ? $height : $width;

    $data = array(
      'media_id' => $image_id,
      'src' => $src,
      'srcset' => $src . ' ' . $small_side . 'w, ' . wp_get_attachment_image_srcset($image_id)
    );

    return $data;
  }
}

/**
 *  Will take a one dimentional array (returned by an SQL SELECT query) and will
 *  return an nested object based on id / parent_id type of connection
 * 
 *  {
 *    array: array - the '&' means that the array is passed by reference
 *    child_key: string - object key of child to compare (eg: 'parent_id')
 *    parent_key: string - object key of parent to compare (eg: 'id')
 *  }
 * 
 */
if (!function_exists("arrayToNestedObject")) {
  function arrayToNestedObject(&$array, $child_key, $parent_key = 'id')
  {
    $arr = [];

    foreach ($array as &$element) {
      $condition = function ($entry) use ($child_key, $parent_key, $element) {
        return $entry->$parent_key === $element->$child_key;
      };

      if ($element->$child_key) {
        $parent = objectFind($array, $condition);

        if ($parent && property_exists($parent, 'children')) {
          $parent->children[] = &$element;
        } else {
          $parent->children = [&$element];
        }
      } else {
        $arr[] = $element;
      }
    }

    return $arr;
  }
}

// Array.prototype.find (almost)
if (!function_exists("objectFind")) {
  function objectFind(&$array, $condition)
  {
    foreach ($array as $key => &$element) {
      if ($condition($element, $key)) {
        return $element;
      }
    }
  }
}

// Array.prototype.findIndex (almost)
if (!function_exists("objectFindIndex")) {
  function objectFindIndex(&$array, $condition)
  {
    foreach ($array as $key => $element) {
      if ($condition($element, $key)) {
        return $key;
      }
    }
  }
}

/**
 *  Transliterates Greek to English using ELOT-743 rules
 */
if (!function_exists("greekToEnglish")) {
  function greekToEnglish($text)
  {
    $result = $text;

    $vowels = (object) array(
      // Lower Case
      'ά' => 'α',
      'έ' => 'ε',
      'ή' => 'η',
      'ί' => 'ι',
      'ϊ' => 'ι',
      'ΐ' => 'ι',
      'ό' => 'ο',
      'ύ' => 'υ',
      'ϋ' => 'υ',
      'ΰ' => 'υ',
      'ώ' => 'ω',
      // Upper Case
      'Ά' => 'Α',
      'Έ' => 'Ε',
      'Ή' => 'Η',
      'Ί' => 'Ι',
      'Ϊ' => 'Ι',
      'Ό' => 'Ο',
      'Ύ' => 'Υ',
      'Ϋ' => 'Υ',
      'Ώ' => 'Ω',
    );


    // αυ, ευ, ηυ
    // θ,κ,ξ,π,σ,τ,υ,φ,χ,ψ
    // μπ, ου, γγ, γκ, γξ, γχ
    $special = (object) array(
      // Lower Case
      'αυθ' => 'afθ',
      'αυκ' => 'afκ',
      'αυξ' => 'afξ',
      'αυπ' => 'afπ',
      'αυσ' => 'afσ',
      'αυτ' => 'afτ',
      'αυυ' => 'afυ',
      'αυφ' => 'afφ',
      'αυχ' => 'afχ',
      'αυψ' => 'afψ',
      'ευθ' => 'efθ',
      'ευκ' => 'efκ',
      'ευξ' => 'efξ',
      'ευπ' => 'efπ',
      'ευσ' => 'efσ',
      'ευτ' => 'efτ',
      'ευυ' => 'efυ',
      'ευφ' => 'efφ',
      'ευχ' => 'efχ',
      'ευψ' => 'efψ',
      'ηυθ' => 'ifθ',
      'ηυκ' => 'ifκ',
      'ηυξ' => 'ifξ',
      'ηυπ' => 'ifπ',
      'ηυσ' => 'ifσ',
      'ηυτ' => 'ifτ',
      'ηυυ' => 'ifυ',
      'ηυφ' => 'ifφ',
      'ηυχ' => 'ifχ',
      'ηυψ' => 'ifψ',
      'αυ' => 'av',
      'ευ' => 'ev',
      'ηυ' => 'iv',
      'μπ' => 'b',
      'ου' => 'ou',
      'γγ' => 'ng',
      'γκ' => 'gk',
      'γξ' => 'nx',
      'γχ' => 'nch',
      // Random Upper Case
      'Αυθ' => 'Afθ',
      'ΑΥθ' => 'AFθ',
      'ΑυΘ' => 'AfΘ',
      'αΥθ' => 'aFθ',
      'αΥΘ' => 'aFΘ',
      'αυΘ' => 'afΘ',
      'ΑΥΘ' => 'AFΘ',
      'Αυκ' => 'Afκ',
      'ΑΥκ' => 'AFκ',
      'ΑυΚ' => 'AfΚ',
      'αΥκ' => 'aFκ',
      'αΥΚ' => 'aFΚ',
      'αυΚ' => 'afΚ',
      'ΑΥΚ' => 'AFΚ',
      'Αυξ' => 'Afξ',
      'ΑΥξ' => 'AFξ',
      'ΑυΞ' => 'AfΞ',
      'αΥξ' => 'aFξ',
      'αΥΞ' => 'aFΞ',
      'αυΞ' => 'afΞ',
      'ΑΥΞ' => 'AFΞ',
      'Αυπ' => 'Afπ',
      'ΑΥπ' => 'AFπ',
      'ΑυΠ' => 'AfΠ',
      'αΥπ' => 'aFπ',
      'αΥΠ' => 'aFΠ',
      'αυΠ' => 'afΠ',
      'ΑΥΠ' => 'AFΠ',
      'Αυσ' => 'Afσ',
      'ΑΥσ' => 'AFσ',
      'ΑυΣ' => 'AfΣ',
      'αΥσ' => 'aFσ',
      'αΥΣ' => 'aFΣ',
      'αυΣ' => 'afΣ',
      'ΑΥΣ' => 'AFΣ',
      'Αυτ' => 'Afτ',
      'ΑΥτ' => 'AFτ',
      'ΑυΤ' => 'AfΤ',
      'αΥτ' => 'aFτ',
      'αΥΤ' => 'aFΤ',
      'αυΤ' => 'afΤ',
      'ΑΥΤ' => 'AFΤ',
      'Αυυ' => 'Afυ',
      'ΑΥυ' => 'AFυ',
      'ΑυΥ' => 'AfΥ',
      'αΥυ' => 'aFυ',
      'αΥΥ' => 'aFΥ',
      'αυΥ' => 'afΥ',
      'ΑΥΥ' => 'AFΥ',
      'Αυφ' => 'Afφ',
      'ΑΥφ' => 'AFφ',
      'ΑυΦ' => 'AfΦ',
      'αΥφ' => 'aFφ',
      'αΥΦ' => 'aFΦ',
      'αυΦ' => 'afΦ',
      'ΑΥΦ' => 'AFΦ',
      'Αυχ' => 'Afχ',
      'ΑΥχ' => 'AFχ',
      'ΑυΧ' => 'AfΧ',
      'αΥχ' => 'aFχ',
      'αΥΧ' => 'aFΧ',
      'αυΧ' => 'afΧ',
      'ΑΥΧ' => 'AFΧ',
      'Αυψ' => 'Afψ',
      'ΑΥψ' => 'AFψ',
      'ΑυΨ' => 'AfΨ',
      'αΥψ' => 'aFψ',
      'αΥΨ' => 'aFΨ',
      'αυΨ' => 'afΨ',
      'ΑΥΨ' => 'AFΨ',
      'Ευθ' => 'Efθ',
      'ΕΥθ' => 'EFθ',
      'ΕυΘ' => 'EfΘ',
      'εΥθ' => 'eFθ',
      'εΥΘ' => 'eFΘ',
      'ευΘ' => 'efΘ',
      'ΕΥΘ' => 'EFΘ',
      'Ευκ' => 'Efκ',
      'ΕΥκ' => 'EFκ',
      'ΕυΚ' => 'EfΚ',
      'εΥκ' => 'eFκ',
      'εΥΚ' => 'eFΚ',
      'ευΚ' => 'efΚ',
      'ΕΥΚ' => 'EFΚ',
      'Ευξ' => 'Efξ',
      'ΕΥξ' => 'EFξ',
      'ΕυΞ' => 'EfΞ',
      'εΥξ' => 'eFξ',
      'εΥΞ' => 'eFΞ',
      'ευΞ' => 'efΞ',
      'ΕΥΞ' => 'EFΞ',
      'Ευπ' => 'Efπ',
      'ΕΥπ' => 'EFπ',
      'ΕυΠ' => 'EfΠ',
      'εΥπ' => 'eFπ',
      'εΥΠ' => 'eFΠ',
      'ευΠ' => 'efΠ',
      'ΕΥΠ' => 'EFΠ',
      'Ευσ' => 'Efσ',
      'ΕΥσ' => 'EFσ',
      'ΕυΣ' => 'EfΣ',
      'εΥσ' => 'eFσ',
      'εΥΣ' => 'eFΣ',
      'ευΣ' => 'efΣ',
      'ΕΥΣ' => 'EFΣ',
      'Ευτ' => 'Efτ',
      'ΕΥτ' => 'EFτ',
      'ΕυΤ' => 'EfΤ',
      'εΥτ' => 'eFτ',
      'εΥΤ' => 'eFΤ',
      'ευΤ' => 'efΤ',
      'ΕΥΤ' => 'EFΤ',
      'Ευυ' => 'Efυ',
      'ΕΥυ' => 'EFυ',
      'ΕυΥ' => 'EfΥ',
      'εΥυ' => 'eFυ',
      'εΥΥ' => 'eFΥ',
      'ευΥ' => 'efΥ',
      'ΕΥΥ' => 'EFΥ',
      'Ευφ' => 'Efφ',
      'ΕΥφ' => 'EFφ',
      'ΕυΦ' => 'EfΦ',
      'εΥφ' => 'eFφ',
      'εΥΦ' => 'eFΦ',
      'ευΦ' => 'efΦ',
      'ΕΥΦ' => 'EFΦ',
      'Ευχ' => 'Efχ',
      'ΕΥχ' => 'EFχ',
      'ΕυΧ' => 'EfΧ',
      'εΥχ' => 'eFχ',
      'εΥΧ' => 'eFΧ',
      'ευΧ' => 'efΧ',
      'ΕΥΧ' => 'EFΧ',
      'Ευψ' => 'Efψ',
      'ΕΥψ' => 'EFψ',
      'ΕυΨ' => 'EfΨ',
      'εΥψ' => 'eFψ',
      'εΥΨ' => 'eFΨ',
      'ευΨ' => 'efΨ',
      'ΕΥΨ' => 'EFΨ',
      'Ηυθ' => 'Ifθ',
      'ΗΥθ' => 'IFθ',
      'ΗυΘ' => 'IfΘ',
      'ηΥθ' => 'iFθ',
      'ηΥΘ' => 'iFΘ',
      'ηυΘ' => 'ifΘ',
      'ΗΥΘ' => 'IFΘ',
      'Ηυκ' => 'Ifκ',
      'ΗΥκ' => 'IFκ',
      'ΗυΚ' => 'IfΚ',
      'ηΥκ' => 'iFκ',
      'ηΥΚ' => 'iFΚ',
      'ηυΚ' => 'ifΚ',
      'ΗΥΚ' => 'IFΚ',
      'Ηυξ' => 'Ifξ',
      'ΗΥξ' => 'IFξ',
      'ΗυΞ' => 'IfΞ',
      'ηΥξ' => 'iFξ',
      'ηΥΞ' => 'iFΞ',
      'ηυΞ' => 'ifΞ',
      'ΗΥΞ' => 'IFΞ',
      'Ηυπ' => 'Ifπ',
      'ΗΥπ' => 'IFπ',
      'ΗυΠ' => 'IfΠ',
      'ηΥπ' => 'iFπ',
      'ηΥΠ' => 'iFΠ',
      'ηυΠ' => 'ifΠ',
      'ΗΥΠ' => 'IFΠ',
      'Ηυσ' => 'Ifσ',
      'ΗΥσ' => 'IFσ',
      'ΗυΣ' => 'IfΣ',
      'ηΥσ' => 'iFσ',
      'ηΥΣ' => 'iFΣ',
      'ηυΣ' => 'ifΣ',
      'ΗΥΣ' => 'IFΣ',
      'Ηυτ' => 'Ifτ',
      'ΗΥτ' => 'IFτ',
      'ΗυΤ' => 'IfΤ',
      'ηΥτ' => 'iFτ',
      'ηΥΤ' => 'iFΤ',
      'ηυΤ' => 'ifΤ',
      'ΗΥΤ' => 'IFΤ',
      'Ηυυ' => 'Ifυ',
      'ΗΥυ' => 'IFυ',
      'ΗυΥ' => 'IfΥ',
      'ηΥυ' => 'iFυ',
      'ηΥΥ' => 'iFΥ',
      'ηυΥ' => 'ifΥ',
      'ΗΥΥ' => 'IFΥ',
      'Ηυφ' => 'Ifφ',
      'ΗΥφ' => 'IFφ',
      'ΗυΦ' => 'IfΦ',
      'ηΥφ' => 'iFφ',
      'ηΥΦ' => 'iFΦ',
      'ηυΦ' => 'ifΦ',
      'ΗΥΦ' => 'IFΦ',
      'Ηυχ' => 'Ifχ',
      'ΗΥχ' => 'IFχ',
      'ΗυΧ' => 'IfΧ',
      'ηΥχ' => 'iFχ',
      'ηΥΧ' => 'iFΧ',
      'ηυΧ' => 'ifΧ',
      'ΗΥΧ' => 'IFΧ',
      'Ηυψ' => 'Ifψ',
      'ΗΥψ' => 'IFψ',
      'ΗυΨ' => 'IfΨ',
      'ηΥψ' => 'iFψ',
      'ηΥΨ' => 'iFΨ',
      'ηυΨ' => 'ifΨ',
      'ΗΥΨ' => 'IFΨ',
      'Αυ' => 'Av',
      'αΥ' => 'aV',
      'ΑΥ' => 'AV',
      'Ευ' => 'Ev',
      'εΥ' => 'eV',
      'ΕΥ' => 'EV',
      'Ηυ' => 'Iv',
      'ηΥ' => 'iV',
      'ΗΥ' => 'IV',
      'Μπ' => 'B',
      'μΠ' => 'b',
      'ΜΠ' => 'B',
      'Ου' => 'Ou',
      'οΥ' => 'oU',
      'ΟΥ' => 'OU',
      'Γγ' => 'Ng',
      'γΓ' => 'nG',
      'ΓΓ' => 'NG',
      'Γκ' => 'Gk',
      'γΚ' => 'gK',
      'ΓΚ' => 'GK',
      'Γξ' => 'Nx',
      'γΞ' => 'nX',
      'ΓΞ' => 'NX',
      'Γχ' => 'Nch',
      'γΧ' => 'nCH',
      'ΓΧ' => 'NCH'
    );


    $rest = (object) array(
      // Lower Case
      'α' => 'a',
      'β' => 'v',
      'γ' => 'g',
      'δ' => 'd',
      'ε' => 'e',
      'ζ' => 'z',
      'η' => 'i',
      'θ' => 'th',
      'ι' => 'i',
      'κ' => 'k',
      'λ' => 'l',
      'μ' => 'm',
      'ν' => 'n',
      'ξ' => 'x',
      'ο' => 'o',
      'π' => 'p',
      'ρ' => 'r',
      'σ' => 's',
      'τ' => 't',
      'υ' => 'y',
      'φ' => 'f',
      'χ' => 'ch',
      'ψ' => 'ps',
      'ω' => 'o',
      // Upper Case
      'Α' => 'A',
      'Β' => 'V',
      'Γ' => 'G',
      'Δ' => 'D',
      'Ε' => 'E',
      'Ζ' => 'Z',
      'Η' => 'I',
      'Θ' => 'TH',
      'Ι' => 'I',
      'Κ' => 'K',
      'Λ' => 'L',
      'Μ' => 'M',
      'Ν' => 'N',
      'Ξ' => 'X',
      'Ο' => 'O',
      'Π' => 'P',
      'Ρ' => 'R',
      'Σ' => 'S',
      'Τ' => 'T',
      'Υ' => 'Y',
      'Φ' => 'F',
      'Χ' => 'CH',
      'Ψ' => 'PS',
      'Ω' => 'O'
    );

    foreach ($vowels as $key => $value) {
      $result = str_replace($key, $value, $result);
    }
    foreach ($special as $key => $value) {
      $result = str_replace($key, $value, $result);
    }
    foreach ($rest as $key => $value) {
      $result = str_replace($key, $value, $result);
    }

    return $result;
  }
}

/**
 *  Random String Generator
 */
if (!function_exists("randomStringGenerator")) {
  function randomStringGenerator($length = 30, $dictionary = null)
  {
    $chars = $dictionary ?? 'abcdefghijklmnopqrstuvwxyz1234567890';

    $result = '';
    for ($i = 0; $i < $length; $i++) {
      $index = rand(0, strlen($chars) - 1);

      $result .= $chars[$index];
    }

    return $result;
  }
}
