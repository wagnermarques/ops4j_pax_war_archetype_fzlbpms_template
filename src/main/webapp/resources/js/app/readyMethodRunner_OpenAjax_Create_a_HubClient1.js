//http://www.openajax.org/member/wiki/OpenAjax_Hub_1.1_Specification_Managed_Hub_Overview
define(function() {
			

	console.debug("readyMethodRunner_OpenAjax_Create_a_HubClient1.js -> RUNNING NOW...");
	
	var mainAppController = window.mainAppController;

			
	// Handle security alerts:  								
	function client1SecurityAlertHandler(source, alertType) {	
	}

	
	// Callback called when a subscription receives data	
	function onData(topic, publisherData, subscriberData) {			
		console.debug("readyMethodRunner_OpenAjax_Create_a_HubClient1.js -> function onData(" + topic + ", " + publisherData	+ ", " + subscriberData + ") {...");			
		if (typeof publisherData === "string") {
			var messageArea = document.getElementById('OpenAjax_hub_messageArea');			
			// XSS protection: createTextNode strips HTML markup			
			var text = document.createTextNode(publisherData);			
			messageArea.innerHTML = "";			
			messageArea.appendChild(text);			
		}		
	}

	
	/*    	
	 * 
	 * Create a OpenAjax.hub.InlineHubClient   
	 * 
	 * */	
	console.debug("readyMethodRunner_OpenAjax_Create_a_HubClient1.js -> var hubclient1 = new OpenAjax.hub.InlineHubClient({...");
	var hubClient1 = new OpenAjax.hub.InlineHubClient({		
		HubClient : {
			onSecurityAlert : client1SecurityAlertHandler
		},
		InlineHubClient : {
			container : mainAppController.getOpenAjaxHub_Container("client1Container")
		}		
	});

	
	
	// Callback that is invoked when HubClient's attempt to connect
	// to the Managed Hub completes
	// 
	//the connect callback for client1 will be provide at hubclient1.connect(clientApp1HubClientConnect);
//	function clientApp1HubClientConnect(hubClient, success, error) {
//		console.log("readyMethodRunner_OpenAjax_Create_a_HubClient1.js -> function clientApp1HubClientConnect( " + hubClient	+ ", " + success + ", " + error + " ) {...");				
//		if (success) {		
//			/* Call hubClient1.publish(...) to publish messages  */			
//			/* Call hubClient1.subscribe(...) to subscribe to message topics */			
//			hubclient1.subscribe('org.example.topics.textmessage', onData);
//		}		
//	}

	
	
	
	
		// Connect to the ManagedHub	
		// we are just creating the client in this file
		// we will make tha connections at readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js
		//hubclient1.connect(clientApp1HubClientConnect);
	
		console.log(" readyMethodRunner_OpenAjax_Create_a_HubClient1.js -> REGISTERING hubClient1 in mainAppController!!!");
		mainAppController.setOpenAjaxHub_Client( "hubClient1", hubClient1 );
		
	
});//define([], function() {



