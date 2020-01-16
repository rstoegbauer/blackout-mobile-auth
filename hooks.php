<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/*
Plugin Name: BLACKOUT MOBILE AND AUTH
Description: It's a menu.
Author: Helix
Version: 1.0.0
*/
if (!function_exists("setup_blackout_mobile_menu")) {
    function setup_blackout_mobile_menu() {
        wp_enqueue_script("blackout_mobile_menu", plugins_url("mobile.js", __FILE__), array(), false, false);
    }
    add_action("wp_enqueue_scripts", "setup_blackout_mobile_menu");
}
?>