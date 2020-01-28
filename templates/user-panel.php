<?php
/* WE DO THE LOGGED IN CHECK IN THE HEADER */

$user = wp_get_current_user();
$user_avatar = get_avatar_url($user->ID, array("size" => 96));
?>
<div class="navbar-item has-dropdown is-hoverable user">
    <div class="navbar-link">
        <div class="navbar-user-details">
            <figure class="image is-24x24">
                <img src="<?php echo esc_url($user_avatar); ?>" alt="" class="is-rounded">
            </figure>
            <span class="navbar-username"><?php echo $user->display_name ?></span>
        </div>
        <div class="navbar-dropdown">
            <?php
            if (in_array("administrator", (array) $user->roles)) :
                    echo implode("\n", array(
                        get_user_panel_link("create_post"),
                        get_user_panel_link("edit_posts"),
                        get_user_panel_link("edit_profile"),
                        get_user_panel_link("admin")
                    ));
                
            elseif (!in_array('administrator', (array) $user->roles) && !in_array("subscriber", (array) $user->roles)) : 
                echo implode("\n", array(
                    get_user_panel_link("create_post"), 
                    get_user_panel_link("edit_posts"),
                    get_user_panel_link("edit_profile")
                ));
            else :
                echo get_user_panel_link("edit_profile")."\n";
            endif;
         
            ?>
            <hr class="navbar-divider">
            <a class="navbar-item is-dark" role="button" data-action="logout">
                <span class="icon-is-small is-left">
                    <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Logout</span>
            </a>
        </div>

    </div>
</div>