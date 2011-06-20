/**
 * Socketbug - Web Socket Remote Debugging
 *
 * @version v0.1.0 ( 6/20/2011 )
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
function load_socketbug_js(filename, version)
{
	var br = document.createTextNode('\r\n');
	var sb = document.createElement('script');
	sb.type = 'text/javascript'; 
	sb.async = false;
	sb.src = ('https:' == document.location.protocol 
		? 'https://app.socketbug.com/' 
		: 'http://app.socketbug.com/') 
		+ _sbs.version 
		+ '/application/'
		+ filename;
	
	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(sb, s);
	s.parentNode.insertBefore(br, s);
}

/* Load Required Socketbug Javascript */
(function(){
	load_socketbug_js('socket.io.js');
	load_socketbug_js('socketbug.js');
})();