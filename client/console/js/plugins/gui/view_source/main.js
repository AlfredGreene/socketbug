/**
 * Socketbug - Web Socket Remote Debugging
 *
 * @version v0.2.0 ( 6/25/2011 )
 *
 * @link Website: http://www.socketbug.com
 * @link Twitter: http://www.twitter.com/socketbug_dev
 * @link Source: http://github.com/manifestinteractive/socketbug
 * @link Support & Feature Requests: http://socketbug.userecho.com
 * 
 * @copyright Copyright (c) 2011 Manifest Interactive, LLC
 *
 * @license Licensed under the LGPL v3 licenses.
 */

(function ()
{
	var sb_plugin;

	/* Prepare Plugin */
    define(

		sb_plugin =
		{
			init: function ()
			{
	            /* Configure and Capture Click Event to Close Source Code Window */
				jQuery('#close_source').button({ icons: { primary: "ui-icon-circle-close" }, text: false }).click(function(){ 
		
					jQuery('#source_code').slideUp(); 
					jQuery('#settings').slideDown();
				});
	        }
	    }
	);
	
	/* Initialize Plugin */
	sb_plugin.init();
	
}());