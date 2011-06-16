/* ========== BEGIN THRID PARTY DEGUG CODE ========== */

/**
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
if(typeof(debug) === 'undefined')
{
	window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();
}

/* ========== END THRID PARTY DEGUG CODE ============ */

/* ========== BEGIN SOCKETBUG CODE ================== */

/**
 * Socketbug - v0.1 - 6/16/2011
 *
 * Website: http://www.socketbug.com
 * Cource: http://github.com/manifestinteractive/socketbug
 * 
 * Copyright (c) 2011 Manifest Interactive, LLC
 * Dual licensed under the MIT and GPL licenses.
 * http://www.socketbug.com/license/
 */
if(typeof(socketbug) === 'undefined')
{
	window.socketbug = (function(){
	
		/* Store socket connection */
		var socket;
		
		/* Socketbug Host */
		var host = "ws://localhost:8000/socketbug/server/php/socketbug.php";
		
		/**
		 * Debug Level:
		 *
		 * 5: log, debug, info, warn & error
		 * 4: debug, info, warn & error
		 * 3: info, warn & error
		 * 2: warn & error
		 * 1: error
		 * 0: disabled
		 */
		var debug_level = 5;
		
		/* Debug Callback Handler */
		var callback = function( level )
		{
			var args = Array.prototype.slice.call( arguments, 1 );
			ws_log(level, args);
		};
		
		var ws_log = function(level, args)
		{
			socket.send(args);
	
			switch(level)
			{
				/* STANDARD DEBUGGING */
				case 'log':
					if(debug_level >= 5)
					{
						console.log(args);
					}
					break;
			
				case 'debug':
					if(debug_level >= 4)
					{
						console.debug(args);
					}
					break;
			
				case 'info':
					if(debug_level >= 3)
					{
						console.info(args);
					}
					break;
			
				case 'warn':
					if(debug_level >= 2)
					{
						console.warn(args);
					}
					break;
			
				case 'error':
					if(debug_level >= 1)
					{
						console.error(args);
					}
					break;
		
				/* PASSTHROUGH DEBUGGING */
				case 'assert':
					console.assert(args);
					break;
			
				case 'clear':
					console.clear();
					break;
			
				case 'dir':
					console.dir(args);
					break;
			
				case 'dirxml':
					console.dirxml(args);
					break;
			
				case 'trace':
					console.trace();
					break;
			
				case 'group':
					console.group(args);
					break;
			
				case 'groupCollapsed':
					console.groupCollapsed(args);
					break;
			
				case 'groupEnd':
					console.groupEnd();
					break;
			
				case 'time':
					console.time(args);
					break;
			
				case 'timeEnd':
					console.timeEnd(args);
					break;
			
				case 'profile':
					console.profile(args);
					break;
			
				case 'profileEnd':
					console.profileEnd();
					break;
			
				case 'count':
					console.count(args);
					break;
			
				case 'exception':
					console.exception(args);
					break;
			
				case 'table':
					console.table(args);
					break;
			}
		};
		
		/* Initialize Socketbug */
		var init = function()
		{
			/* Setup debugging */
			debug.setLevel(debug_level);
			debug.setCallback(callback, true);
			
			try
			{
				socket = new WebSocket(host); 
				socket.onopen = function(msg)
				{
					console.log('Web Socket Opened');
				};
				socket.onmessage = function(msg)
				{
					if(typeof(msg.data) === 'undefined')
					{	
						console.error('msg.data is undefined');
						console.error(msg);
					}
					else
					{				
						console.log(msg.data);
				
						var json = JSON.stringify(msg.data);
				
						console.log('SANITY: '+json.substr(1, 6));
				
						if(json.substr(1, 6) == '\u0000')
						{
							console.log('DIRTY: '+json);
				
							json = '"'+json.substr(7, json.length);
					
						}
				
						console.log('CLEANING: '+json);
				
						json = JSON.parse( json );
				
						console.log('FIXED: '+json);
				
						var data = JSON.parse( json );
				
						console.log(data);
				
						try
						{
							for (user in data)
							{
								if (data[user].id)
								{
									var user_id = data[user].id;
									console.log(user_id);
								}
							}										
						}
						catch(err)
						{
							console.error('Try Catch Failed');
							console.error(err);
						}
					}
				};
				socket.onclose = function(msg)
				{
					console.warn('Web Socket Closed');
				};
				socket.onerror = function(msg)
				{
					console.error('THERE IS AN ERROR'+msg);
				};
			}
			catch(err)
			{
				console.error(err);
			}
		};
		
		/* Load Socketbug */
		init();
		
	})();
}