<nav id="bko-mobile-menu">
    <div class="menu">
        <div class="menu-header">
            <span class="delete close toggle"></span>
            <figure class="image is-2by1">
                <img src="https://blackout-gaming.s3.amazonaws.com/Images/assets/mobile-header.png" alt="">
            </figure>
            <div class="navbar-menu">
                <div id="mobile-user" class="navbar-start">
                    <?php 
                    if (is_user_logged_in()) : 
                        $user = wp_get_current_user();
                        $avatar = get_avatar_url($user->ID, array("size" => 96));
                    ?>
                    <div class="navbar-item has-dropdown is-hoverable user">
                        <div class="navbar-link">
                            <div class="navbar-user-details">
                                <figure class="image is-24x24">
                                    <img src="<?php echo esc_url($user_avatar); ?>" alt="" class="is-rounded">
                                </figure>
                                <span class="navbar-username"><?php echo $user->display_name ?></span>
                            </div>
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

                    <?php else: $users_can_register = get_option("users_can_register")
                    ?>
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-outlined is-dark" role="button" data-action="login">Sign In</a>
                            <?php if ($users_can_register) : ?>
                            <a class="button is-outlined is-dark" role="button" data-action="register">Sign Up</a>
                            <?php endif; ?>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="navbar-menu">
            <?php
                  wp_nav_menu( array( 
                    'theme_location' => 'primary',
                    'depth' => 0,
                    'items_wrap' => '<div class="navbar-start">%3$s</div>',
                    'container' => false,
                    'menu_class' => 'navbar-start',
                    'menu_id' => '',
                    'after' => '</div>',
                    'walker' => new MobileNavWalker()
                  ));
                ?>
        </div>
    </div>
</nav>