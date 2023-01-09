<?php

use Elementor\Core\Common\Modules\Ajax\Module as Ajax;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Paw_Template_Library_Manager {

	protected static $source = null;

	public static function init() {
		add_action( 'elementor/editor/footer', [ __CLASS__, 'print_template_views' ] );
		add_action( 'elementor/ajax/register_actions', [ __CLASS__, 'register_ajax_actions' ] );
		add_action( 'elementor/preview/enqueue_styles', [ __CLASS__, 'enqueue_preview_styles' ] );

		// Elementor Editor Styles
        add_action( 'elementor/editor/after_enqueue_scripts', [ __CLASS__, 'editor_scripts' ] );
	}

	/**
     * 
     * Enqueue Elementor Editor Styles
     * 
     */
    public static function editor_scripts() {
        wp_enqueue_style( 'paw-template-library-style', PAWELMADNS_URL . 'assets/css/template-library.css', [ 'elementor-editor' ], PAWELMADNS_VERSION );
        wp_enqueue_script( 'paw-template-library-script', PAWELMADNS_URL . 'assets/js/template-library.js', [ 'elementor-editor', 'jquery-hover-intent' ], PAWELMADNS_VERSION, true );

		$localized_data = [
			'isProActive' => 'yes',
			'i18n' => [
				'templatesEmptyTitle' => esc_html__( 'No Templates Found', 'paw-elementor-addons' ),
				'templatesEmptyMessage' => esc_html__( 'Try different category or sync for new templates.', 'paw-elementor-addons' ),
				'templatesNoResultsTitle' => esc_html__( 'No Results Found', 'paw-elementor-addons' ),
				'templatesNoResultsMessage' => esc_html__( 'Please make sure your search is spelled correctly or try a different word.', 'paw-elementor-addons' ),
			]
	
        ];
        
        wp_localize_script( 'paw-template-library-script', 'ThemepawAddonsEditor', $localized_data );
    }

	public static function print_template_views() {
		include_once PAWELMADNS_ABSPATH . 'library/templates.php';
	}

	public static function enqueue_preview_styles() {
		wp_enqueue_style( 'paw-template-preview-style', PAWELMADNS_URL . 'assets/css/template-preview.css', PAWELMADNS_VERSION );
	}

	/**
	 * Undocumented function
	 *
	 * @return Paw_Template_Library_Source
	 */
	public static function get_source() {
		if ( is_null( self::$source ) ) {
			self::$source = new Paw_Template_Library_Source();
		}

		return self::$source;
	}

	public static function register_ajax_actions( Ajax $ajax ) {
		$ajax->register_ajax_action( 'paw_get_template_library_data', function( $data ) {
			if ( ! current_user_can( 'edit_posts' ) ) {
				throw new \Exception( 'Access Denied' );
			}

			if ( ! empty( $data['editor_post_id'] ) ) {
				$editor_post_id = absint( $data['editor_post_id'] );

				if ( ! get_post( $editor_post_id ) ) {
					throw new \Exception( __( 'Post not found.', 'paw-elementor-addons' ) );
				}

				\Elementor\Plugin::instance()->db->switch_to_post( $editor_post_id );
			}

			$result = self::get_library_data( $data );

			return $result;
		} );

		$ajax->register_ajax_action( 'paw_get_template_item_data', function( $data ) {
			if ( ! current_user_can( 'edit_posts' ) ) {
				throw new \Exception( 'Access Denied' );
			}

			if ( ! empty( $data['editor_post_id'] ) ) {
				$editor_post_id = absint( $data['editor_post_id'] );

				if ( ! get_post( $editor_post_id ) ) {
					throw new \Exception( __( 'Post not found', 'paw-elementor-addons' ) );
				}

				\Elementor\Plugin::instance()->db->switch_to_post( $editor_post_id );
			}

			if ( empty( $data['template_id'] ) ) {
				throw new \Exception( __( 'Template id missing', 'paw-elementor-addons' ) );
			}

			$result = self::get_template_data( $data );

			return $result;
		} );
	}

	public static function get_template_data( array $args ) {
		$source = self::get_source();
		$data = $source->get_data( $args );
		return $data;
	}

	public static function get_library_data( array $args ) {
		$source = self::get_source();

		if ( ! empty( $args['sync'] ) ) {
			Paw_Template_Library_Source::get_library_data( true );
		}

		return [
			'templates' => $source->get_items(),
			'category' => $source->get_categories(),
			'type_category' => $source->get_type_category(),
		];
	}
}

Paw_Template_Library_Manager::init();
