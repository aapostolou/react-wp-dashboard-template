<?php

$get_test = function ($data) {
  return (object) array(
    'code' => 'success',
    'message' => 'This is a test endpoint'
  );
};
self::add_get_endpoint('/test', $get_test);

$post_test_administrator = function ($data) {
  return (object) array(
    'code' => 'success',
    'data' => wp_get_current_user()
  );
};
self::add_post_endpoint('/test/administrator', $post_test_administrator, array(self::class, 'is_administrator'));

$post_test_manager = function ($data) {
  return (object) array(
    'code' => 'success',
    'data' => wp_get_current_user()
  );
};
self::add_post_endpoint('/test/manager', $post_test_manager, array(self::class, 'is_manager'));
