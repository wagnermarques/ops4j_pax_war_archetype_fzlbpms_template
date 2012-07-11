/**
 * This file is your application’s main JavaScript file. It is listed as a dependency in run.js and will
 * automatically load when run.js loads.
 *
 * Because this file has the special filename “main.js”, and because we’ve registered the “app” package in run.js,
 * whatever object this module returns can be loaded by other files simply by requiring “app” (instead of “app/main”).
 *
 * Our first dependency is to the “dojo/has” module, which allows us to conditionally execute code based on
 * configuration settings or environmental information. Unlike a normal conditional, these branches can be compiled
 * away by the build system; see “staticHasFeatures” in app.profile.js for more information.
 *
 * Our second dependency is to the special module “require”; this allows us to make additional require calls using
 * relative module IDs within the body of our define function.
 *
 * In all cases, whatever function is passed to define() is only invoked once, and the return value is cached.
 *
 * More information about everything described about the loader throughout this file can be found at
 * http://livedocs.dojotoolkit.org/loader/amd.
 */



//http://dojotoolkit.org/reference-guide/dojo/_base/window.html
/*
 * dojo._base.window
since:	V?

dojo._base.window 
contains functions for dealing with the document-wide DOM and context related stuff.

As with all dojo._base components, these functions are included within Dojo Base. 
You get this functionality by just including dojo.js in your page.
Features

    dojo.doc
    Alias for the current document

    dojo.body
    Return the body element of the document

    dojo.setContext
    Changes the behavior of many core Dojo functions that deal with namespace and DOM lookup

    dojo.withGlobal
    Call callback with globalObject as dojo.global and globalObject.document as dojo.doc

    dojo.withDoc
    Call callback with documentObject as dojo.doc
 */

define([ 
		'dojo/has', 
		'require' ], function (has, require) {
    
    
    
    var app = {
    	WellcomeDialog : null,
    	getCurrentUser : null //consider security issues here...    		
    };
    
    
    //var ifr = dom.byId("someIframe");
  	//var newGlobal = ifr.contentWindow; // get the global scope object from the frame

  	// Call a callback with different 'global' values and context.
  	// win.withGlobal(newGlobal,  function(){
	    // console.log("The current dojo.global is: ", win.global);
	    // console.log("The current dojo.doc is: ", win.doc);
	    // console.log("The current scope is: ", this);
  	// }, this);
    
    if (has('host-browser')) {
    	console.debug(" 0 app main.js -> ok, in a browser...");
        /*
         * This require call’s first dependency, “./Dialog”, uses a relative module identifier; you should use this
         * type of notation for dependencies *within* a package in order to ensure the package is fully portable. It
         * works like a path, where “./” refers to the current directory and “../” refers to the parent directory. If
         * you are referring to a module in a *different* package, you should *not* use a relative module identifier.
         *
         * The second dependency is a plugin dependency; in this case, it is a dependency on the special functionality
         * of the “dojo/domReady” plugin, which waits until the DOM is ready before finishing loading.
         * The “!” after the module name indicates you want to use special plugin functionality; if you were to
         * require just “dojo/domReady”, it would load that module just like any other module, without any of the
         * special plugin functionality.
         */
        
        
        require(
        	[ 'dojo/dom',//dom.byId        	  
        	  '../app/mainAppController',        
        	  '../app/mainGuiController',
        	  './BasicWelcomeDialog', 
        	  'dojo/domReady!' ],         	  
        	function (dom, mainAppController, mainGuiController, WellcomeDialog) {
        		
        		//setting up a SINGLETON APP CONTROLLER
        		var mainAppControllerInstance = new mainAppController({});
        		mainAppControllerInstance.setApp_canvas_domNode(dom.byId("app_canvas"));        		 
           		
           		//setting up a SINGLETON GUI CONTROLLER, ... and put it at the app controller
           		var mainGuiControllerInstance = (new mainGuiController({}))();//mainAppContruller must be created to get a mainguicontroller instance
           		mainAppControllerInstance.setMainGuiController(mainGuiControllerInstance);        			
           		        
           		mainAppControllerInstance.widgetsStartup();
        	        	
        		app.WellcomeDialog = new WellcomeDialog().placeAt(document.body);

            	//  It is important to remember to always call startup on widgets after you have added them to the DOM.
            	//  It won’t hurt if you do it twice, but things will often not work right if you forget to do it.
				app.WellcomeDialog.startup();
            	//  And now…
				app.WellcomeDialog.show();
        	});
    
        

    //F R O M     H E R E,  I N    F A C T,  W E   A R E   I N    T H E    S E R V E R    
    }/*if (has('host-browser')) {*/else {    
    	//we are in server, maybe node.js...
        console.log('Hello from the server!');
    }
});