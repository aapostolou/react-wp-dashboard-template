<?php

global $wpdb;
// $wpdb->hide_errors();

class ReactWPDashboard_Endpoint
{
  public static $endpoint = 'rwpd/v1';

  /* Initialize */
  static function init()
  {
    include_once plugin_dir_path(__FILE__) . "test.php";
  }

  /* ================== */
  /* - GENERALIZATION - */
  /* ================== */

  public static function add_endpoint($route, $callback, $method, $permission_callback = false)
  {
    add_action('rest_api_init', function () use ($route, $callback, $method, $permission_callback) {
      register_rest_route(self::$endpoint, $route, array(
        'methods'  => $method,
        'callback' => $callback,
        'permission_callback' => $permission_callback ?? function ($request) {
          return true;
        },
      ));
    });
  }

  public static function add_get_endpoint($route, $callback, $permission_callback = false)
  {
    self::add_endpoint($route, $callback, 'GET', $permission_callback);
  }
  public static function add_post_endpoint($route, $callback, $permission_callback = false)
  {
    self::add_endpoint($route, $callback, 'POST', $permission_callback);
  }
  public static function add_update_endpoint($route, $callback, $permission_callback = false)
  {
    self::add_endpoint($route, $callback, 'UPDATE', $permission_callback);
  }
  public static function add_delete_endpoint($route, $callback, $permission_callback = false)
  {
    self::add_endpoint($route, $callback, 'DELETE', $permission_callback);
  }

  /* ======================= */
  /* - RESULTS - RESPONSES - */
  /* ======================= */

  private static function success_result($data = null)
  {
    if (!(isset($data))) {
      return (object) array(
        'code' => 'success',
      );
    }

    return (object) array(
      'code' => 'success',
      'data' => json_decode(json_encode($data, JSON_NUMERIC_CHECK))
    );
  }
  private static function error_result($msg = null)
  {
    if (!(isset($msg))) {
      return (object) array(
        'code' => 'error',
      );
    }

    return (object) array(
      'code' => 'error',
      'message' => $msg
    );
  }

  private static function under_construction_result($msg = 'Endpoint is under construction')
  {
    return (object) array(
      'code' => 'under_construction',
      'message' => $msg
    );
  }

  private static function missing_field_error($name)
  {
    return self::error_result("Parameter '" . $name . "' is missing.");
  }

  /* ======================= */
  /* - FIELDS & VALIDATION - */
  /* ======================= */

  private static function check_variable($var)
  {
    return (isset($var) && $var);
  }
  private static function check_fields($data, $fields)
  {
    foreach ($fields as $field) {
      if (self::check_variable($data[$field])) {
        return self::missing_field_error($field);
      }
    }
    return (object) array('code' => 'success');
  }

  /* ID */
  private static function validate_field_id($id)
  {
    if (!self::check_variable(($id))) {
      return self::missing_field_error('id');
    }

    if (!(is_numeric(intval($id)) && is_int(intval($id)))) {
      return self::error_result('ID must be an integer');
    }

    if (intval($id) === 0) {
      return self::error_result('ID value is invalid');
    }

    return (object) array('code' => 'success');
  }

  /* Nullable ID */
  private static function validate_field_nullable_id($id)
  {
    if (!self::check_variable($id)) {
      return self::missing_field_error('Nullable ID');
    }

    if (!(is_numeric($id) && is_int($id))) {
      return self::error_result('Nullable ID must be an integer');
    }

    if (intval($id) === 0) {
      return self::success_result(null);
    } else {
      return self::success_result(intval($id));
    }
  }

  /* Weight */
  private static function validate_field_weight($id)
  {
    if (!self::check_variable(($id))) {
      return self::missing_field_error('weight');
    }

    if (!(is_numeric(intval($id)) && is_int(intval($id)))) {
      return self::error_result('weight must be an integer');
    }

    if (intval($id) === 0) {
      return self::error_result('weight value is invalid');
    }

    return (object) array('code' => 'success');
  }

  /* Text Field */
  private static function validate_field_text($field, $name)
  {
    if (!self::check_variable(trim($field))) {
      return self::missing_field_error($name);
    }

    $pattern = "/.{3,}/";

    if (!preg_match($pattern, trim($field))) {
      return self::error_result("$name needs to be at least 3 characters long.");
    }
    return (object) array('code' => 'success');
  }

  /* Slug */
  private static function validate_field_slug($slug)
  {
    if (!self::check_variable(($slug))) {
      return self::missing_field_error('slug');
    }

    $pattern = "/^[a-z]?[a-z0-9-]*[a-z0-9]$/";

    if (!preg_match($pattern, $slug)) {
      return self::error_result('Invalid Slug pattern.');
    }
    return (object) array('code' => 'success');
  }

  /* Status */
  private static function validate_field_status($status)
  {
    if (!self::check_variable(($status))) {
      return self::missing_field_error('status');
    }

    if (!(is_numeric(intval($status)) && is_int(intval($status)))) {
      return self::error_result('status must be an integer');
    }

    if (intval($status) < 0) {
      return self::error_result('status must be positive');
    }

    return (object) array('code' => 'success');
  }



  /* =============== */
  /* - PERMISSIONS - */
  /* =============== */

  public static function is_manager($request)
  {
    $user = wp_get_current_user();

    $roles_array = ['administrator', 'manager'];
    foreach ($roles_array as $role) {
      if (in_array($role, (array) $user->roles)) {
        return true;
      }
    }

    return false;
  }

  public static function is_administrator($request)
  {
    $user = wp_get_current_user();

    $roles_array = ['administrator'];
    foreach ($roles_array as $role) {
      if (in_array($role, (array) $user->roles)) {
        return true;
      }
    }

    return false;
  }
}
