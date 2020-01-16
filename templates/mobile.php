<nav id="bko-mobile-menu">
    <div class="menu">
        <div class="menu-header">
            <span class="delete close toggle"></span>
            <figure class="image is-2by1">
                <img src="" alt="">
            </figure>
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
                    'walker' => new Navwalker()
                  ));
                ?>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a href="/wp-login.php" class="button is-outlined is-dark" role="button">Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>