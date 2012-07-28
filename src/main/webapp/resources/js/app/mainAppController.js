//inspirations:
//http://dojotoolkit.org/documentation/tutorials/1.7/recipes/app_controller/
//http://dojotoolkit.org/documentation/tutorials/1.7/recipes/app_controller/
//http://dojotoolkit.org/documentation/tutorials/1.7/promises/
define(
		["dojo/dom",
		 "dojo/dom-construct",
		 
		 "dojo/on", 
		 "dojo/keys", 
		 
		 "dojo/_base/lang", 
		 "dojo/_base/array",  
		 "dojo/_base/event",
		 "dojo/_base/xhr",		 
		 "dojo/_base/Deferred",
	 	 "dojo/_base/connect",
	 	 "dojo/_base/declare",
	 	 
		 "dijit/Dialog", 		 
		 "dijit/registry",
 
	 	 "dojo/domReady!"],
	 	 
    function(	    		
    		dom, domConstruct,     		 
    		on, keys,     		 	
    		lang, array, event, xhr,  deferred, connect , declare,    		 	
    		Dialog, registry) {
			
			
			console.log("mainAppController -> Running...");
			
			
			
            if(window.mainAppController != null){
            console.debug("mainAppController.js -> [true] if(window.mainAppController != null)");	
   	 			return function(jsHashObjectToInitializeMainAppController){
   	 				console.log("mainAppController.js -> window.mainAppController != null, returning window.mainAppController = "+window.mainAppController);
   	 				return window.mainAppController;
   	 			};    	 		
   	 		}else{
   	 		console.debug("mainAppController.js -> [false] if(window.mainAppController != null)");
   	 			return function(jsHashObjectToInitializeMainAppController){
   	 			console.log("mainAppController.js -> window.mainAppController == null, I will instanciate it...");
   	 				require(["dojo/_base/declare"],function(declare){    	 				
   	 					window.mainAppController = (declare(null, {							
   	 					
   	 						 //private properties
   	 							_guiControllers : {    	 				
   	 								mainGuiController : null,
   	 								specificViewController: null
   	 							},    	 					
    	 				
   	 							_appStores : {    	 					
   	 								stores : {},    	 					
   	 								queries : {}					
   	 							},    	 						
    	 				
   	 							//OpenAjax objects repositories
   	 							_OpenAjaxHub_ManagedHubs : {},
   	 							
   	 							_OpenAjaxHub_Containers:{},
   	 							
   	 							_OpenAjaxHub_Clients:{},
   	 							
   	 							
   	 							//public methods
   	 							getMainGuiController : function(){
   	 									return this._guiControllers.mainGuiController;
   	 							},
    	 				
   	 							setMainGuiController : function(mainGuiControllerInstance){
   	 								console.debug("mainAppController.js -> setMainGuiController : function(mainGuiControllerInstance){...");
   	 								console.debug("mainAppController.js -> setMainGuiController : function(mainGuiControllerInstance){... mainGuiControllerInstance=...");
   	 								console.debug(mainGuiControllerInstance);
   	 								this._guiControllers.mainGuiController = mainGuiControllerInstance;    	 					    	 			
   	 							},
    	 				   	 				   
   	 							   	 							
   	 							widgetsStartup : function() {    	 		        
   	 								console.debug(" _1# mainAppController.js -> widgetsStartup : function() {...");
   	 								console.debug(" _1# mainAppController.js -> widgetsStartup : function() {... starting up widgetns in domNode = "+this.app_canvas_domNode);   	 		            	
   	 								this._guiControllers.mainGuiController.widgetsStartup(this.app_canvas_domNode);    	 		         
   	 							},

   	 							
   	 							
   	 							//OpenAjax ManagedHubs
   	 							setOpenAjaxHub_ManagedHub : function(/*String*/ name, /*OpenAjax.hub.InlineContainer*/ mh){
   	 								console.debug("mainAppController.js -> setOpenAjaxHub_ManagedHub : function("+name+", "+mh+"){..");
   	 								this._OpenAjaxHub_ManagedHubs[name]=mh;
   	 							},
   	 							
   	 							getOpenAjaxHub_ManagedHub : function(/*String*/ mhName){
   	 								console.debug("mainAppController.js -> getOpenAjaxHub_ManagedHub : function("+mhName+"){...");
   	 								return this._OpenAjaxHub_ManagedHubs[mhName];
   	 							},

   	 							get_ALL_OpenAjaxHub_ManagedHubs : function(){
   	 								return this._OpenAjaxHub_ManagedHubs;
   	 							},
   	 							
   	 						    //OpenAjax Containers
   	 							setOpenAjaxHub_Container : function(/*String*/ name, /*OpenAjax.hub.InlineContainer*/ c){
   	 								console.debug("mainAppController.js -> setOpenAjaxHub_Container : function("+name+", "+ c +"){,,,");
   	 								this._OpenAjaxHub_Containers[name]=c;
   	 							},
   	 							
   	 							getOpenAjaxHub_Container : function(/*String*/ cName){
   	 								console.debug("mainAppController.js -> getOpenAjaxHub_Container : function("+cName+"){..."); 
   	 								return this._OpenAjaxHub_Containers[cName];
   	 							},

   	 							get_ALL_OpenAjaxHub_Containers : function(){
   	 								return this._OpenAjaxHub_Containers;
   	 							},

   	 							
   	 						    //OpenAjax Clients
   	 							setOpenAjaxHub_Client : function(/*String*/ name, /*OpenAjax.hub.InlineContainer*/ cli){
   	 								console.debug("mainAppController.js -> setOpenAjaxHub_Container : function("+name+", "+ cli +"){,,,");
   	 								this._OpenAjaxHub_Clients[name]=cli;
   	 							},
   	 							
   	 							getOpenAjaxHub_Client : function(/*String*/ cName){
   	 								console.debug("mainAppController.js -> getOpenAjaxHub_Container : function("+cName+"){..."); 
   	 								return this._OpenAjaxHub_Clients[cName];
   	 							},

   	 							get_ALL_OpenAjaxHub_Clients : function(){
   	 								return this._OpenAjaxHub_Clients;
   	 							},
   	 							
   	 							
   	 							
   	 							//constructor
   	 							constructor : function(args){	
   	 								console.debug(" _1 mainAppController -> constructor : function(args){... args="+args);
    	 					
   	 							}// constructor
	 		               	 					
   	 					}))(jsHashObjectToInitializeMainAppController);//window.mainAppController = (declare(null, {   	 						
   	 				});//require(["dojo/_base/declare"],function(){   	 				
   	 				console.debug("mainAppController.js -> That is my mainAppController instance ="+window.mainAppController);
   	 				return window.mainAppController;
   	 			}//return function(jsHashObjectToInitializeMainAppController){	
   	 		}//}else{
});// module



