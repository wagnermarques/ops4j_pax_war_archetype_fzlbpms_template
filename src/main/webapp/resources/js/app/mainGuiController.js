define([ "dojo/_base/declare",    
         "dojo/domReady!" ],
	
         function(declare) {	
		 console.debug("mainGuiController.js -> Running....");
		
		 	return function() {
								
				
				if (window.mainAppController == null)
					return new Error("To proceed with new mainGuiController( the window.mainAppController must be already instantiated");
				
				
				
				if ((window.mainAppController != null) && (window.mainAppController.getMainGuiController() != null)) {
					return function(mainGuiControllerArgs) {
								return window.mainAppController.getMainGuiController();
							}
				} else if ((window.mainAppController != null) && (window.mainAppController.getMainGuiController() == null)) {
					return function(mainGuiControllerArgs) {	
													
						var mainGuiControllerInstance = (declare(null,{																																																			

							clickEvent : function(){
								console.log("clickEvent : function(){...");
								hubClient.publish('org.example.topics.textmessage','Message from ClientApp2'); 
							},
							
							constructor : function(args) {
								console.debug("mainGuiController.js -> constructor : function(args="+args+") {...");
								console.debug("mainGuiController.js -> args...");
								console.debug(args);
								this.guiControllers = {};								
								declare.safeMixin(this, args);
								require(["./resources/js/app/readyMethodRunner_OpenAjax_Config.js"]);
								require(["./resources/js/app/readyMethodRunner.js"]);
								
							}
						}))(mainGuiControllerArgs);
						
						
						// mainGuiControllerInstance
						window.mainAppController.setMainGuiController(mainGuiControllerInstance);
						return window.mainAppController.getMainGuiController();
						};//function(mainGuiControllerArgs) {
					}// returned else function :: return function() {				
				
				
			}//return function() {			
});//module
						