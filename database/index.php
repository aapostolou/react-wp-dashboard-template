<?php

global $wpdb;

// $wpdb->hide_errors();

class ReactWPDashboard_Database
{
  public static $table_prefix = 'rwpd_';

  static function init()
  {
    include plugin_dir_path(__FILE__) . "test.php";
  }

  private static function check_table($table_name)
  {
    global $wpdb;

    return $wpdb->get_var('SHOW TABLES LIKE "' . $table_name . '"') != $table_name;
  }

  public static function create_table_name($name)
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

  private static function get_created_tables()
  {
    global $wpdb;

    $result = $wpdb->get_results("SELECT table_name FROM information_schema.tables WHERE table_name LIKE '" . $wpdb->prefix . self::$table_prefix . "%'");

    $created_tables = [];
    foreach ($result as $value) {
      array_push($created_tables, $value->table_name);
    }

    return $created_tables;
  }

  private static function delete_created_tables()
  {
    global $wpdb;

    $wpdb->query("SET FOREIGN_KEY_CHECKS = 0");

    foreach (self::get_created_tables() as $table) {
      $wpdb->query("DROP TABLE $table");
    }

    $wpdb->query("SET FOREIGN_KEY_CHECKS = 1");
  }
}
