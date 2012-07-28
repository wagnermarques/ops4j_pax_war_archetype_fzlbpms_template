
//we need sincronism here with the factory of the modules it is possible
define(function() {
	
	
	console.log(".");
	console.log(".");
	console.log(".");
	console.debug("readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js -> RUNNING NOW..");
	var mainAppController = window.mainAppController;
	
	
	
	/*
	 * 
	 * hubClient2 beeing connected to the its managedHub1 and subcribing at a top
	 * 
	 */	
	var hubClient1 = mainAppController.getOpenAjaxHub_Client("hubClient1");
	console.log("hubClient1="+hubClient1);
	
	// Callback called when a subscription receives data	
	function onData(topic, publisherData, subscriberData) {			
		console.log("#$#$ readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js -> function onData(" + topic + ", " + publisherData	+ ", " + subscriberData + ") {...");
		console.debug("readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js -> function onData(" + topic + ", " + publisherData	+ ", " + subscriberData + ") {...");			
		if (typeof publisherData === "string") {
			var messageArea = document.getElementById('OpenAjax_hub_messageArea');			
			// XSS protection: createTextNode strips HTML markup			
			var text = document.createTextNode(publisherData);			
			//messageArea.innerHTML = "";			
			messageArea.appendChild(text);			
		}	
	}
	
	hubClient1.connect(function (hubClient, success, error) {			
		console.log("readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js -> function clientApp1HubClientConnect( " + hubClient	+ ", " + success + ", " + error + " ) {...");							
		if (success) {		
			/* Call hubClient1.publish(...) to publish messages  */						
			/* Call hubClient1.subscribe(...) to subscribe to message topics */						
			hubClient1.subscribe('org.example.topics.textmessage', onData);			
		}				
	});
	
	
	
	
	/*
	 * 
	 * hubClient2 publishing data on the same managedHub1 topic hubClient2 is subcribed
	 * 
	 */
	var hubClient2 = mainAppController.getOpenAjaxHub_Client("hubClient2");	
	console.log("hubClient2 = "+hubClient2);
	
	hubClient2.connect(function (hubClient, success, error) {			
		console.log("readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js -> function clientApp1HubClientConnect( " + hubClient	+ ", " + success + ", " + error + " ) {...");							
		if (success) {		
			/* Call hubClient1.publish(...) to publish messages  */						
			/* Call hubClient1.subscribe(...) to subscribe to message topics */						
			hubClient2.publish('org.example.topics.textmessage', "Msg from hbClient2 published on org.example.topics.textmessage topic at readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js");			
		}				
	});
			
	
	hubClient2.publish('org.example.topics.textmessage', " 222 Msg from hbClient2 published on org.example.topics.textmessage topic at readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js");
	hubClient2.publish('org.example.topics.textmessage', " 333 Msg from hbClient2 published on org.example.topics.textmessage topic at readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js");
	hubClient2.publish('org.example.topics.textmessage', " 444 Msg from hbClient2 published on org.example.topics.textmessage topic at readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js");
	
	
});// module

