//http://www.openajax.org/member/wiki/OpenAjax_Hub_1.1_Specification_Managed_Hub_Overview
define(function() {
			

	console.debug("readyMethodRunner_OpenAjax_Create_a_hubclient2.js -> RUNNING NOW...");
	
	var mainAppController = window.mainAppController;

			
	// Handle security alerts:  								
	function client2SecurityAlertHandler(source, alertType) {	
	}

	
//	// Callback called when a subscription receives data	
//	function onData(topic, publisherData, subscriberData) {			
//		console.debug("readyMethodRunner_OpenAjax_Create_a_hubclient2.js -> function onData(" + topic + ", " + publisherData	+ ", " + subscriberData + ") {...");			
//		if (typeof publisherData === "string") {
//			var messageArea = document.getElementById('messageArea');			
//			// XSS protection: createTextNode strips HTML markup			
//			var text = document.createTextNode(publisherData);			
//			messageArea.innerHTML = "";			
//			messageArea.appendChild(text);			
//		}		
//	}

	
	/*    	
	 * 
	 * Create a OpenAjax.hub.InlineHubClient   
	 * 
	 * */	
	console.debug("readyMethodRunner_OpenAjax_Create_a_hubclient2.js -> var hubclient2 = new OpenAjax.hub.InlineHubClient({...");
	var hubclient2 = new OpenAjax.hub.InlineHubClient({		
		HubClient : {
			onSecurityAlert : client2SecurityAlertHandler
		},
		InlineHubClient : {
			container : mainAppController.getOpenAjaxHub_Container("client2Container")
		}		
	});

	
	
//	// Callback that is invoked when HubClient's attempt to connect
//	// to the Managed Hub completes
	
	//the publish/subscribe will be configured at readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js ->
//	function clientApp2HubClientConnect(hubClient, success, error) {
//		console.log("readyMethodRunner_OpenAjax_Create_a_hubclient2.js -> function clientApp1HubClientConnect( " + hubClient	+ ", " + success + ", " + error + " ) {...");				
//		if (success) {		
//			/* Call hubclient2.publish(...) to publish messages  */			
//			/* Call hubclient2.subscribe(...) to subscribe to message topics */			
//			hubclient2.subscribe('org.example.topics.textmessage', onData);
//		}		
//	}

	
	
	
	
//		// Connect to the ManagedHub	
//		hubclient2.connect(clientApp2HubClientConnect);
	
		console.log(" readyMethodRunner_OpenAjax_Create_a_hubclient2.js -> REGISTERING hubclient2 in mainAppController!!!");
		mainAppController.setOpenAjaxHub_Client( "hubClient2", hubclient2 );
		
	
});//define([], function() {



