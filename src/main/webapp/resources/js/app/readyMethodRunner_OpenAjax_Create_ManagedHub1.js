//http://www.openajax.org/member/wiki/OpenAjax_Hub_1.1_Specification_Managed_Hub_Overview

define(function() {

	console.debug("readyMethodRunner_OpenAjax_Create_ManagedHub1.js RUNNING NOW...");

	/*
	* Security Manager Callbacks
	*/
	
	/*
	 * Callback for publish requests. Approves all publish requests.
	 */
	function onMHPublish(topic, data, publishContainer, subscribeContainer) {
		console.debug(" Pub1 readyMethodRunner_OpenAjax_Create_ManagedHub1.js ....");
		console.debug(" Pub2 function onMHPublish("+topic+", "+data+", "+publishContainer+", "+subscribeContainer+") {...");
		console.debug(" Pub3 Approving all publish requests!!!");
	    return true;
	}

	
    /*
	 * Callback for subscribe requests. Approves all subscribe requests.
	 */ 
	function onMHSubscribe(topic, container) {
		console.debug(" Sub2 function onMHSubscribe("+topic+", "+container+") {...");
		console.debug(" Sub3 Approving all subscribe requests!!!"); 
		return true;		
	}
		    
	
    /*
	 * Callback for unsubscribe requests. 
	 * Approving all Unsubscribe requests.
	 */ 
	function onMHUnsubscribe(topic, container) {		     
		console.debug(" Unsub2 function onMHUnsubscribe("+topic+", "+container+") {...");
		console.debug(" Unsub3 Approving all Unsubscribe requests!!!"); 
		return true;		    
	}
		    		   
	
	/*
	 * Callback for security alerts
	 */
	function onMHSecurityAlert(source, alertType) {
		console.debug(" SecurityAlert1 function onMHSecurityAlert("+source+", "+alertType+") {...");
		console.debug(" SecurityAlert1 Approving all Unsubscribe requests!!!"); 
	}

		    
	/* Application initializes in response to document load event */
	/*
	 * Create a Managed Hub instance
	 */
	var managedHub1 = new OpenAjax.hub.ManagedHub(				
			{ 		        					
				onPublish:       onMHPublish,		            				
				onSubscribe:     onMHSubscribe,		            				
				onUnsubscribe:   onMHUnsubscribe,		            				
				onSecurityAlert: onMHSecurityAlert 				
			}					
	);
	
	
	
	
	
	console.log(" readyMethodRunner_OpenAjax_Create_ManagedHub1.js REGISTERING managedHub1 in mainAppController!!!");
	var mainAppController = window.mainAppController;
	mainAppController.setOpenAjaxHub_ManagedHub("managedHub1",managedHub1);
	

	
});//define([], function() {
