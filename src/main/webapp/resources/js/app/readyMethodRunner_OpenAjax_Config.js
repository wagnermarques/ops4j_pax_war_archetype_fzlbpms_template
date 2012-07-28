
//we need sincronism here with the factory of the modules it is possible
define(["./resources/js/app/readyMethodRunner_OpenAjax_Create_ManagedHub1.js",
        "./resources/js/app/readyMethodRunner_OpenAjax_Create_Client1_Container.js",
        "./resources/js/app/readyMethodRunner_OpenAjax_Create_Client2_Container.js",
        "./resources/js/app/readyMethodRunner_OpenAjax_Create_a_HubClient1.js",
        "./resources/js/app/readyMethodRunner_OpenAjax_Create_a_HubClient2.js",
        "./resources/js/app/readyMethodRunner_OpenAjax_App_Default_PublishAndSubscribes.js",
        "dojo/domReady!" ],function() {
	
	
	console.debug(" readyMethodRunner_OpenAjax_Config.js _> RUNNING NOW....");
	console.debug(" ...OpenAjax, for now, all configurations was doing by factory of the modules...");
	
	//Inspect OpenAjax configuration in firebug....																																							xXx	X	XCZ
	console.debug("readyMethodRunner_OpenAjax_Config.js _> window.mainAppController.get_ALL_OpenAjaxHub_ManagedHubs())...");
	console.debug(window.mainAppController.get_ALL_OpenAjaxHub_ManagedHubs());	
	
	console.debug("readyMethodRunner_OpenAjax_Config.js _> window.mainAppController.get_ALL_OpenAjaxHub_Containers())...");
	console.debug(window.mainAppController.get_ALL_OpenAjaxHub_Containers());
	
	console.debug("readyMethodRunner_OpenAjax_Config.js _> window.mainAppController.	get_ALL_OpenAjaxHub_Clients())...");
	console.debug(window.mainAppController.get_ALL_OpenAjaxHub_Clients());
	
	console.debug(window.mainAppController);
	
	
});// module

