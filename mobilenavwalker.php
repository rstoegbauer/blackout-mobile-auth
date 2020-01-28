<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class MobileNavWalker extends Walker_Nav_Menu {

    public function start_lvl(&$output, $depth = 0, $args = array()) {
        $output .= "<div class='navbar-dropdown'>";
    }

    public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        
        $hasChildren = $args->walker->has_children;
        $liClasses = $hasChildren? "navbar-item has-dropdown" : "navbar-item";

        if ($hasChildren) {
            $output .= "<div class='".$liClasses."'>";
            $output .= "<a class='navbar-link'>".$item->title."</a>";
        } else {
            $output .= "<a class='".$liClasses."' href=".$item->url.">".$item->title;
        }

        if ($hasChildren) {
            $item->classes[] = 'has_children';
        }
    }

    public function end_el(&$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        if (in_array("has_children", $item->classes)) {
            $output .= "</div>";
        }
        $output .= "</a>";
    }

    public function end_lvl(&$output, $depth = 0, $args = array()) {
        $output .= "</div>";
    }
}


?>