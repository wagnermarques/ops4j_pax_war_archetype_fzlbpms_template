//inspiracao 
//http://dojotoolkit.org/documentation/tutorials/1.7/recipes/app_controller/
//http://dojotoolkit.org/documentation/tutorials/1.7/recipes/app_controller/
//MUITO PROVAVELMENTE VAI USAR DEFERREDS
//http://dojotoolkit.org/documentation/tutorials/1.7/promises/
define(
		["dojo/dom",
		 "dojo/dom-construct",
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
			
			
			window.mainAppController = null;
			
			
            if(window.mainAppController != null){            	
   	 			return function(jsHashObjectToInitializeMainAppController){
   	 				return window.mainAppController;
   	 			}    	 		
   	 		}else{    	 			
   	 			return function(jsHashObjectToInitializeMainAppController){     					   	 			   	 			
   	 				require(["dojo/_base/declare"],function(declare){    	 				
   	 					window.mainAppController = (declare(null, {							

   	 					// --apesar dessa classe ser um singleton, ou seja,
   	 					// nao haver outras instancias delas no   	 				
   	 					// programa, nao he necessario que seus campos sejam
   	 					// da instancia em particular, pode se
   	 					// estaticos da classe sem problema, por isso estao
   	 					// declarados aqui e nao no construtor
    	 			
   	 					
   	 					_guiControllers : {    	 				
   	 						mainGuiController : null,
    	 					specificViewController: null
    	 				},    	 					
    	 				
    	 				app_canvas_domNode : null,
    	 				
    	 				
    	 				_appStores : {    	 					
    	 					stores : {    	 						
    	 						// storeName:storeReference    	 						
    	 					},    	 					
    	 					queries : {    	 						
    	 						// querieId:querieDefinition    	 					
    	 					}					
    	 				},    	 						
    	 				
    	 				
    	 				getMainGuiController : function(){
    	 					return this._guiControllers.mainGuiController;
    	 				},
    	 				
    	 				setMainGuiController : function(mainGuiControllerInstance){
    	 					console.debug("mainAppController.js -> setMainGuiController : function(mainGuiControllerInstance){...");
    	 					console.debug("mainAppController.js -> setMainGuiController : function(mainGuiControllerInstance){... mainGuiControllerInstance=...");
    	 					console.debug(mainGuiControllerInstance);
    	 					this._guiControllers.mainGuiController = mainGuiControllerInstance;    	 					    	 			
    	 				},
    	 				
    	 				getApp_canvas_domNode : function(){
    	 					return this.app_canvas_domNode;
    	 				},
    	 				setApp_canvas_domNode : function(app_canvas_domNode){
    	 					this.app_canvas_domNode = app_canvas_domNode; 
    	 				},


    	 				
    	 				// ---- private methods    	 		        
    	 				widgetsStartup : function() {    	 		        
    	 					console.debug(" _1# mainAppController.js -> widgetsStartup : function() {...");
    	 					console.debug(" _1# mainAppController.js -> widgetsStartup : function() {... starting up widgetns in domNode = "+this.app_canvas_domNode);
   	 		            	// some context preparations if was needed
   	 		            	// TODO _guiController.getDataStores();
   	 		            	// _guiController.getDataStores(); 	 		            
    	 					
   	 		            	this._guiControllers.mainGuiController.widgetsStartup(this.app_canvas_domNode);    	 		         
    	 				},


    	 				constructor : function(args){	
    	 					console.debug(" _1 mainAppController -> constructor : function(args){... args="+args);
    	 		            
//    	 					this.initApp = function() {
//    	 						this._initApp(this.app_canvas_domNode);
//    	 		            };    	 		           
    	 					
    	 				}// constructor
	 		            
   	 				}))(jsHashObjectToInitializeMainAppController);   	 						
   	 				});//require(["dojo/_base/declare"],function(){
   	 				return window.mainAppController;
   	 			}//return function(jsHashObjectToInitializeMainAppController){	
   	 		}//}else{
});// module



