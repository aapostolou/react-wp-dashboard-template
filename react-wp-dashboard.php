<?php

/**
 * @package ReactWPDashboard
 */
/*
Plugin Name: React WP Plugin
*/

if (!defined('ABSPATH')) {
  die;
}


class ReactWPDashboard
{
  function activate()
  {
    flush_rewrite_rules();
  }
  function deactivate()
  {
    flush_rewrite_rules();
  }

  function register()
  {
    add_action('admin_menu', array($this, 'add_admin_page'));

    /* Functions */
    $this->functions();
    /* Database */
    $this->database();
    /* Endpoints */
    $this->endpoint();

    /* Roles / Permissions */
    $this->roles();
  }

  /* Admin Page */
  function add_admin_page()
  {
    add_menu_page(
      'React WP Dashboard',
      'React WP Dashboard',
      'manage_options',
      'react_wp_dashboard',
      array($this, 'admin_html'),
      'dashicons-clipboard',
      110
    );
  }

  function admin_html()
  {
    $react_app_js  = plugin_dir_url(__FILE__) . 'admin/react-app/build/static/main.js';
    $react_app_css = plugin_dir_url(__FILE__) . 'admin/react-app/build/static/main.css';
    $global_css = plugin_dir_url(__FILE__) . 'admin/styles.css';

    // time stops stylesheet/js caching while in development, might want to remove later  
    $version = time();
    wp_enqueue_script('react-wp-dashboard', $react_app_js, array(), $version, true);
    wp_enqueue_style('react-wp-dashboard', $react_app_css, array(), $version);
    wp_enqueue_style('react-wp-dashboard-global', $global_css, array(), $version);

    require_once plugin_dir_path(__FILE__) . 'admin/index.php';
  }

  /* Functions */
  private function functions()
  {
    require_once plugin_dir_path(__FILE__) . "functions.php";
  }
  /* Database */
  private function database()
  {
    require_once plugin_dir_path(__FILE__) . "database/index.php";

    if (class_exists('ReactWPDashboard_Database')) {
      ReactWPDashboard_Database::init();
    }
  }
  /* Endpoints */
  private function endpoint()
  {
    require_once plugin_dir_path(__FILE__) . "endpoint/index.php";

    if (class_exists('ReactWPDashboard_Endpoint')) {
      ReactWPDashboard_Endpoint::init();
    }
  }

  /* Roles / Permissions */
  private function roles()
  {
    require_once plugin_dir_path(__FILE__) . "roles.php";
  }
}

if (class_exists('ReactWPDashboard')) {
  $reactWPDashboard = new ReactWPDashboard();
  $reactWPDashboard->register();
}


// activation
register_activation_hook(__FILE__, array($reactWPDashboard, 'activate'));

// deactivation
register_deactivation_hook(__FILE__, array($reactWPDashboard, 'deactivate'));
