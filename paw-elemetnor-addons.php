<?php
/*
Plugin Name: Paw Elementor Addons
Plugin URI: https://www.themepaw.com/
Description: ThemePaw Elementor Addons
Version: 0.1
Author: Mohammad Limon.
Author URI: https://www.themepaw.com/
*/

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'PAWELMADNS_ROOT' ) ) {
	define( 'PAWELMADNS_ROOT', __FILE__ );
}

class PawElementorAddons {

    /**
     * Plugin version.
     *
     * @var string
     */
    const version = '0.1';

    /**
	 * Call this method to get the singleton
	 *
	 * @return PawElementorAddons|null
	 */
	public static function instance() {

		static $instance = null;
		if ( is_null( $instance ) ) {
			$instance = new PawElementorAddons();
		}

		return $instance;
	}

	public function __construct() {

        $this->define_constanst();

		register_activation_hook( __FILE__, array( $this, 'activation' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivation' ) );

        add_action( 'plugins_loaded', array( $this, 'init' ) );

	}

    /**
	 * Init
	 */
	public function init() {

		if( is_user_logged_in() ) {
			require_once PAWELMADNS_ABSPATH . 'library/library-source.php';
			require_once PAWELMADNS_ABSPATH . 'library/library-manager.php';
		}
	}


	/**
	 * plugin activation
	 *
	 * @return void
	 */
	public function activation() {

	}

	/**
	 * plugin activation
	 *
	 * @return void
	 */
	public function deactivation() {

	}

    /**
     * Define require constansts
     * 
     * @return void
     */
    public function define_constanst(){
        define( "PAWELMADNS_VERSION", self::version );
		define( "PAWELMADNS_URL", plugins_url( "/" , __FILE__ ) );
		define( 'PAWELMADNS_ABSPATH', dirname( PAWELMADNS_ROOT ) . '/' );
		define( 'PAWELMADNS_PLUGIN_BASENAME', plugin_basename( PAWELMADNS_ROOT ) );
		define( 'PAWELMADNS_BASE_FILE', __FILE__ );
		define( 'PAWELMADNS_BASE_DIR', dirname( PAWELMADNS_BASE_FILE ) );
        define( "PAWELMADNS_PATH", plugin_dir_path( __FILE__ ) );
    }

	
}

( new PawElementorAddons() );