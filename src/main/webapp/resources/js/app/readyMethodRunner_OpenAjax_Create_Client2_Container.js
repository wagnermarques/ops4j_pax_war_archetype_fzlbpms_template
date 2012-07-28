//http://www.openajax.org/member/wiki/OpenAjax_Hub_1.1_Specification_Managed_Hub_Overview
define(function() {
		
	console.debug("readyMethodRunner_OpenAjax_Create_Client2_Container.js _> RUNNING NOW...");
	
	var mainAppController = window.mainAppController;
	
		/*
		* Create an InlineHubClient and InlineContainer for client1
		*/		      
		
		/*
		 * Handle client-side securityalerts
		 */
		function onClientSecurityAlert(source, alertType) {
			console.debug("readyMethodRunner_OpenAjax_Create_Client2_Container.js _> ....");
			console.debug(" function onClientSecurityAlert("+source+", "+alertType+") {...");			
		}
		
		/*
		 * Called when client connects
		 */  
		function onClientConnect(container) {
			console.debug("readyMethodRunner_OpenAjax_Create_Client2_Container.js _> ....");
			console.debug(" function onClientConnect("+container+") {...");
		}
		      
		/*
		 * Called when client disconnects
		 */      
		function onClientDisconnect(container) {
			console.debug("readyMethodRunner_OpenAjax_Create_Client2_Container.js _> ....");
			console.debug(" function onClientDisconnect("+container+") {...")
		}

		
		/* Create an InlineContainer for this HubClient */		     
		var client2Container = new OpenAjax.hub.InlineContainer( mainAppController.getOpenAjaxHub_ManagedHub("managedHub1"), "client2Container",
		        {
		          Container: {
		            onSecurityAlert: onClientSecurityAlert,
		            onConnect:       onClientConnect,
		            onDisconnect:    onClientDisconnect
		          }
		        }
		);	
		


		console.log("readyMethodRunner_OpenAjax_Create_Client2_Container.js _> REGISTERING client2Container in mainAppController!!!");
		mainAppController.setOpenAjaxHub_Container("client2Container",client2Container);


	
});//define([], function() {
