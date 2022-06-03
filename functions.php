<?php


/**
 *  Implemented a custom function that returns the current logged in user's JWT Auth token
 */

/** Require the JWT library. */

use \Firebase\JWT\JWT;

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
  $token = JWT::encode(apply_filters('jwt_auth_token_before_sign', $token, $user), $secret_key);

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


/**
 *  Upload the media isnide the $_FILES array with key'image' and return the id
 * 
 *  $post_id = 0 means that the media won't be "attached" to any post
 * 
 *  if ($_FILES['image']){
 *    upload_media('image');
 *  }
 */
function upload_media($file_id = 'image', $post_id = 0)
{
  require_once(ABSPATH . 'wp-admin/includes/image.php');
  require_once(ABSPATH . 'wp-admin/includes/file.php');
  require_once(ABSPATH . 'wp-admin/includes/media.php');

  return media_handle_upload($file_id, $post_id);
};


/**
 *  Will Return an object with the required properties to create a responsive image
 * 
 *  {
 *     id: number,
 *     src: string,
 *     srcset: string
 *  }
 * 
 *  *to delete use wp_delete_attachment($post_id) where $post_id is the id of the image
 */
function get_responsive_image($image_id)
{
  $srcArray = wp_get_attachment_image_src($image_id);
  $src = $srcArray[0];
  $width = $srcArray[1];
  $height = $srcArray[2];
  $small_side = $width > $height ? $height : $width;

  $data = array(
    'id' => $image_id,
    'src' => $src,
    'srcset' => $src . ' ' . $small_side . 'w, ' . wp_get_attachment_image_srcset($image_id)
  );

  return $data;
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

// Array.prototype.find (almost)
function objectFind(&$array, $condition)
{
  foreach ($array as $key => &$element) {
    if ($condition($element, $key)) {
      return $element;
    }
  }
}
// Array.prototype.findIndex (almost)
function objectFindIndex(&$array, $condition)
{
  foreach ($array as $key => $element) {
    if ($condition($element, $key)) {
      return $key;
    }
  }
}

/**
 *  Transliterates Greek to English using ELOT-743 rules
 */
function greekToEnglish($text)
{
  $result = mb_strtolower($text);

  $vowels = (object) array(
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
  );

  // αυ, ευ, ηυ
  // θ,κ,ξ,π,σ,τ,υ,φ,χ,ψ
  // μπ, ου, γγ, γκ, γξ, γχ
  $special = (object) array(
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
    'γχ' => 'nch'
  );

  $rest = (object) array(
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
    'ω' => 'o'
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

/**
 *  Random String Generator
 */
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
