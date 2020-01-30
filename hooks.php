<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/*
Plugin Name: BLACKOUT AJAX AUTH AND MOBILE MENU
Description: It's a menu.
Author: Helix
Version: 1.0.0
*/

if (!function_exists("setup_blackout_mobile_menu")) {
    function setup_blackout_mobile_menu() {
        require_once("mobilenavwalker.php");
        wp_enqueue_script("recaptcha", "https://www.google.com/recaptcha/api.js", array(), false, false);
        wp_enqueue_script("site", plugins_url("/site.js", __FILE__), array("recaptcha"), false, true);

        wp_localize_script("site", "blackout_auth", array(
            "adminRootUrl" => admin_url(),
            'ajaxurl' =>  admin_url("admin-ajax.php"),
            "login_nonce" => wp_create_nonce("blackout-ajax-signin"),
            "logout_nonce" => wp_create_nonce("blackout-ajax-signout"),
            "signup_nonce" => wp_create_nonce("blackout-ajax-signup"),
            "users_can_register" => get_option("users_can_register"),
            "is_logged_in" => is_user_logged_in() ? true : false
        ));
    }
    add_action("wp_enqueue_scripts", "setup_blackout_mobile_menu");
}

function check_recaptcha($response) {
    $recaptcha_secret_key = "6LdpmNMUAAAAAAjlW_62q7nTdvYLoa1rCjloC273";

    if (isset($response) && !empty($response)) {

        try {
            $remote_ip = $_SERVER["REMOTE_ADDR"];
            $request = wp_remote_post('https://www.google.com/recaptcha/api/siteverify?secret=$'.$recaptcha_secret_key.'&response='.$response.'&remote_ip='.$remote_ip);
            $result = json_decode($request["body"], true);

            return $result['success'];
        }
        catch (Exception $err) {
            wp_send_json(array( "message" => $err->getMessage() ), 400 );
        }

        if (!$result["success"]) {
            wp_send_json(array( "message" => "grecaptcha request failed."), 400);
        }
        
    } else {
        wp_send_json(array( "message" => "Missing or Invalid recaptcha..."), 400);
    }
}

add_action("check_recaptcha", "check_recaptcha");

function check_nonce($post_key, $nonce_key) {
    if ( defined( 'WP_CACHE')) {
        return true;
    }

    $response = new stdClass();

    if (!isset($_POST[$post_key]) || !wp_verify_nonce($_POST[$post_key], $nonce_key)) {
        $response->message = "Invalid nonce";
        wp_send_json_error($response);
    }

}


function get_user_panel_link($name) {
    $create_post = "<a class='navbar-item' href=".esc_url(admin_url('post-new.php?post_type=post'))."><span
    class='icon is-small is-left'>
    <i class='fas fa-plus'></i>
</span>
<span>Create Post</span>
</a>";
    $edit_posts = "<a class='navbar-item' href=".esc_url(admin_url('post-new.php?post_type=post'))."><span
    class='icon is-small is-left'>
    <i class='far fa-edit'></i>
</span>
<span>Edit Post</span>
</a>";
    $edit_profile = "<a class='navbar-item' href=".esc_url(admin_url('post-new.php?post_type=post'))."><span
    class='icon is-small is-left'>
    <i class='fas fa-user'></i>
</span>
<span>Edit Profile</span>
</a>";
    $admin = "<a class='navbar-item' href=".esc_url(admin_url('post-new.php?post_type=post'))."><span
    class='icon is-small is-left'>
    <i class='fas fa-shield-alt'></i>
</span>
<span>Admin</span>
</a>";

 return ${$name};
}

add_action("get_user_panel_link", "get_user_panel_link");

function blackout_login_over_ajax() {

    $start = microtime(true);

    check_nonce("blackout_nonce", "blackout-ajax-signin");

    $args = array();

    $args["user_login"] = sanitize_text_field(trim($_POST["username"]));
    $args["user_password"] = trim($_POST["password"]);
    $args["remember"] = isset($_POST['remember']) ? true : false;


    if (!$args["user_login"] || !$args["user_password"]) {
        wp_send_json("Missing required fields...", 400);
    }

    if (!$user = get_user_by("login", sanitize_user( $args["user_login"] ) ) ) {
        $response->message = "Invalid username.";
        wp_send_json($response, 400);
    }

    check_recaptcha($_POST["grecaptcha"]);

    $response = new stdClass();

    $secure_cookie = is_ssl();

    if (!$secure_cookie && $user && !force_ssl_admin() ) {
        $secure_cookie = true;
        force_ssl_admin(true);
    }
+
    $user_signon = wp_signon($args, $secure_cookie);

    $end_time = microtime(true) - $start;
    
    if (is_wp_error($user_signon)) {
        $response->message = "User credentials invalid or user doesn't exist.";
        $response->exec_time = sprintf('Executed for %.5F seconds', $end_time);
        wp_send_json($response, 404);
    } else {
        $response->user->ID = $user->ID;
        $response->user->allcaps = $user->allcaps;
        $response->user->display_name = $user->display_name;
        $response->user->avatar_url = get_avatar_url($user->ID, array("size" => 96));
        $response->user->user_url = $user->user_url;
        $response->user->roles = $user->roles;
        $response->user->is_logged_in = true;
        $response->exec_time = sprintf('Executed for %.5F seconds', $end_time);

        wp_send_json($response, 200);
    }
    
}

add_action("wp_ajax_nopriv_blackout_login_over_ajax", "blackout_login_over_ajax");


function blackout_logout_over_ajax() {
   
    check_nonce("blackout_nonce", "blackout-ajax-signout");
    wp_logout();
    ob_clean();

    wp_send_json(array( "is_logged_in" => false ), 200);
    
}

add_action("wp_ajax_blackout_logout_over_ajax", "blackout_logout_over_ajax");


function blackout_create_user() {
    
    check_nonce("blackout_nonce", "blackout-ajax-signup");

    if (!isset($_POST["email"]) || !is_email($_POST["email"])) {
        wp_send_json("Invalid or missing email address...", 400);
    }
    
    if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST['grecaptcha'])) {
        wp_send_json("Missing credentials...", 400);
    }

    $recaptcha = $_POST["grecaptcha"];
    check_recaptcha($recaptcha);

    $args = array();

    $args["user_login"] = sanitize_text_field(trim($_POST["username"]));
    $args["password"] = trim($_POST['password']);
    $args["email"] = sanitize_email(trim($_POST["email"]));

    $user_id = username_exists($args["username"]);

    if (!$user_id && !email_exists($args["email"])) {
        $user_id = wp_create_user($args["user_login"], $args["password"], $args["email"]);
        if (is_wp_error($user_id)) {
            return wp_send_json($user_id,  500);          
        } else {
            return wp_send_json("Thank you for registering!", 200);
        }
    } else {
        return wp_send_json("User already exists.");
    }
}

add_action("wp_ajax_nopriv_blackout_create_user", "blackout_create_user");

function blackout_user_password_reset() {
    if ( $email = sanitize_email($_POST['email']) && (isset($email) && !empty($email)) ) {
        $response = new stdClass();
        if ( email_exists($email) && $user = get_user_by($email) ) {
            $key = get_password_rest_key($user);
            
            if (is_wp_error($key)) {
                $response->message = $key->get_error_message();
                $response->code = $key->get_error_code();
                wp_send_json($response, 500);
            } else {
                $message = "Click on the following link if you want to recover your password: ";
                $message .= wp_login_url()."?action=rp&key=".$key."&login=".$user->user_login;
                if (wp_mail($user->email, "You've requested a password reset.", $message)) {
                    $response->message = "An email has been dispatched to: ".$user->email;
                    wp_send_json($response, 200);
                } else {
                    $response->message = "Encountered a problem and the email could not be sent. Please contact the administrator.";
                    wp_send_json($response, 500);
                }
            }
        } else {
            $response->message = "Couldn't find a user account under that email address.";
            wp_send_json($response, 404);
        }

    } else {
        wp_send_json("You must enter a valid email addresss", 400);
    }
}

function has_cap($caps, $cap) {
    return $caps[$cap] === true;
}

add_action("has_cap", "has_cap");
?>