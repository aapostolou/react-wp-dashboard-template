<?php

global $wpdb;

// $wpdb->hide_errors();

class ReactWPDashboard_Database
{
  public static $table_prefix = 'rwpd_';

  static function init()
  {
    include_once plugin_dir_path(__FILE__) . "test.php";
  }

  private static function check_table($table_name)
  {
    global $wpdb;

    return $wpdb->get_var('SHOW TABLES LIKE "' . $table_name . '"') != $table_name;
  }

  private static function create_table_name($name)
  {
    global $wpdb;

    return $wpdb->prefix . self::$table_prefix . $name;
  }

  private static function create_table($name, $query)
  {
    global $wpdb;

    $table_name = self::create_table_name($name);
    if (self::check_table(($table_name))) {
      $query_create = "CREATE TABLE " . $table_name . " " . $query;

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta($query_create);
    }
  }
}
