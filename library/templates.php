<?php
/**
 * Template library templates
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<script type="text/template" id="template-paw-templateLibrary-header-logo">
	<img src="<?php echo PAWELMADNS_URL . 'assets/images/main-logo.svg'; ?>" alt="Main Logo">
</script>

<script type="text/template" id="template-paw-templateLibrary-header-back">
	<i class="eicon-" aria-hidden="true"></i>
	<span><?php echo __( 'Back to Library', 'paw-elementor-ad/dons' ); ?></span>
</script>

<script type="text/template" id="template-paw-TemplateLibrary_header-menu">
	<# _.each( tabs, function( args, tab ) { var activeClass = args.active ? 'elementor-active' : ''; #>
		<div class="elementor-component-tab elementor-template-library-menu-item {{activeClass}}" data-tab="{{{ tab }}}">{{{ args.title }}}</div>
	<# } ); #>
</script>

<script type="text/template" id="template-paw-templateLibrary-header-actions">
	<div id="paw-templateLibrary-header-sync" class="elementor-templates-modal__header__item">
		<i class="eicon-sync" aria-hidden="true" title="<?php esc_attr_e( 'Sync Library', 'paw-elementor-addons' ); ?>"></i>
		<span class="elementor-screen-only"><?php esc_html_e( 'Sync Library', 'paw-elementor-addons' ); ?></span>
	</div>
</script>

<script type="text/template" id="template-paw-templateLibrary-preview">
    <iframe></iframe>
</script>

<script type="text/template" id="template-paw-templateLibrary-header-insert">
	<div id="elementor-template-library-header-preview-insert-wrapper" class="elementor-templates-modal__header__item">
		{{{ paw.library.getModal().getTemplateActionButton( obj ) }}}
	</div>
</script>

<script type="text/template" id="template-paw-templateLibrary-insert-button">
	<a class="elementor-template-library-template-action elementor-button paw-templateLibrary-insert-button">
		<i class="eicon-file-download" aria-hidden="true"></i>
		<span class="elementor-button-title"><?php esc_html_e( 'Insert', 'paw-elementor-addons' ); ?></span>
	</a>
</script>

<script type="text/template" id="template-paw-templateLibrary-pro-button">
	<a class="elementor-template-library-template-action elementor-button paw-templateLibrary-pro-button" href="https://exclusiveaddons.com/pricing/" target="_blank">
		<i class="eicon-external-link-square" aria-hidden="true"></i>
		<span class="elementor-button-title"><?php esc_html_e( 'Get Pro', 'paw-elementor-addons' ); ?></span>
	</a>
</script>

<script type="text/template" id="template-paw-templateLibrary-loading">
	<div class="elementor-loader-wrapper">
		<div class="elementor-loader">
			<div class="elementor-loader-boxes">
				<div class="elementor-loader-box"></div>
				<div class="elementor-loader-box"></div>
				<div class="elementor-loader-box"></div>
				<div class="elementor-loader-box"></div>
			</div>
		</div>
		<div class="elementor-loading-title"><?php esc_html_e( 'Loading', 'paw-elementor-addons' ); ?></div>
	</div>
</script>

<script type="text/template" id="template-paw-templateLibrary-templates">
	<div id="paw-templateLibrary-toolbar">
		<div id="paw-templateLibrary-toolbar-filter" class="paw-templateLibrary-toolbar-filter">
			<# if ( paw.library.getTypeCategory() ) { #>
	
				<select id="paw-templateLibrary-filter-category" class="paw-templateLibrary-filter-category">
					<option class="paw-templateLibrary-category-filter-item active" value="" data-tag=""><?php esc_html_e( 'Filter', 'paw-elementor-addons' ); ?></option>
					<# _.each( paw.library.getTypeCategory(), function( slug ) { #>
						<option class="paw-templateLibrary-category-filter-item" value="{{ slug }}" data-tag="{{ slug }}">{{{ paw.library.getCategory()[slug] }}}</option>
					<# } ); #>
				</select>
			<# } #>
		</div>

		<div id="paw-templateLibrary-toolbar-search">
			<label for="paw-templateLibrary-search" class="elementor-screen-only"><?php esc_html_e( 'Search Templates:', 'paw-elementor-addons' ); ?></label>
			<input id="paw-templateLibrary-search" placeholder="<?php esc_attr_e( 'Search', 'paw-elementor-addons' ); ?>">
			<i class="eicon-search"></i>
		</div>
	</div>

	<div class="paw-templateLibrary-templates-window">
		<div id="paw-templateLibrary-templates-list"></div>
	</div>
</script>

<script type="text/template" id="template-paw-templateLibrary-template">
	<div class="paw-templateLibrary-template-body" id="paw-template-{{ template_id }}">
		<div class="paw-templateLibrary-template-preview">
			<i class="eicon-zoom-in-bold" aria-hidden="true"></i>
		</div>
		<img class="paw-templateLibrary-template-thumbnail" src="{{ thumbnail }}">
		<div class="paw-templateLibrary-template-title">
			<span>{{{ title }}}</span>
		</div>
	</div>
	<div class="paw-templateLibrary-template-footer">
		{{{ paw.library.getModal().getTemplateActionButton( obj ) }}}
		<a href="#" class="elementor-button paw-templateLibrary-preview-button">
			<i class="eicon-device-desktop" aria-hidden="true"></i>
			<?php esc_html_e( 'Preview', 'paw-elementor-addons' ); ?>
		</a>
	</div>
</script>

<script type="text/template" id="template-paw-templateLibrary-empty">
	<div class="elementor-template-library-blank-icon">
		<i class="eicon-search-results"></i>
	</div>
	<div class="elementor-template-library-blank-title"></div>
	<div class="elementor-template-library-blank-message"></div>
	<div class="elementor-template-library-blank-footer">
		<?php esc_html_e( 'Want to learn more about the Exclusive Addons?', 'paw-elementor-addons' ); ?>
		<a class="elementor-template-library-blank-footer-link" href="https://exclusiveaddons.com/" target="_blank"><?php echo __( 'Click here', 'paw-elementor-addons' ); ?></a>
	</div>
</script>
