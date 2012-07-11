define(
 	[
	 "dojo/_base/lang",
 	 "dojo/_base/declare",
 	 "dojo/_base/connect",
 	 
	 "dojo/dom",
	 "dojo/dom-construct",
 	 "dojo/parser", 
 	 "dojo/on",
 	 "dojo/query",
 	 
 	 "dijit/layout/ContentPane", 
 	 "dijit/layout/BorderContainer",
 	 "dijit/layout/AccordionContainer",
 	 "dijit/registry",

 	 
 	 "./gui_eventsHandlerAbstract",
 	 "dojo/domReady!"
 	 ], 
 	 

 	 function(	lang,
 			 	declare,
 			 	connect,
 			 	dom, domConstruct, parser, on, query, 
 			 	ContentPane , BorderContainer, AccordionContainer, registry, gui_eventsHandlerAbstract ) { 		
			
 		console.debug(" _4EvHdlr][ gui_eventsHandler.js ->  module initialization fn running now....");
	
 		
 		return declare(gui_eventsHandlerAbstract, {
 				
 				/**
 				 * constructor : function(args){
 				 * 
 				 * instanciar de seguinte forma...
 				 * var accordeonEventHandler = new gui_eventsHandler({_widget_whith_events_to_be_handle : registry.byId("accordeon")});
 				 * com uma instancia dessa, passa ela pro setEventHandler do mainGuiController
 				 * entao agora o controlador da view tem um eventHandler para o accordeon
 				 * agora toda aplicacao tem um ponto unico pra chamar esses eventos
 				 * 
 				 */
 				constructor : function(args){
 					//alert("gui_eventsHandler.js -> constructor : function(args){ ");
 					console.debug(" _4EvHdlr][ gui_eventsHandler.js ->  constructor : function(){...");
 					declare.safeMixin(this,args);		
 				},//constructor

 				showEventListeners: function(){
 					console.debug(" _4EvHdlr][ gui_eventsHandler.js ->  showEventListeners: function(){...");
 					this.inherited(arguments);
 				},
 					
 				/*
 				 * each time a eventHandler is setted by setEventListener method we have a litle problem
 				 * because if there was a listener setted previously its connected again e run twice 
 				 * TODO is better do not reconnect all to recconnect again...
 				 * 
 				 * 
 				 */
 				updateConnects : function(){ 					
 					console.debug(" _4EvHdlr][ gui_eventsHandler.js ->  updateConnects : function(){...");		
 					
 					
					//alert("in updateConnects : function(){...");
 					//alert(this._widget_whith_events_to_be_handle);
 					
 					//all links in accordeon containe has its onClick connected to its id sinoimous eventListeners
 					var accordinks = query(".accord_lnk");
 					//alert(accordinks.length);
 					
 					var accordLinks = query(".accord_lnk", this._widget_whith_events_to_be_handle.domNode);
 					//alert(accordinks.length);
 					
 					//disconnect first a reconnect after
 					for(var i=0, j = this._connectHandlers.length;  i<j;  i++){ 						
 						connect.disconnect(this._connectHandlers[i]);
 					}		
 					this._connectHandlers = new Array();
 							
 					for(var i=0, j = accordLinks.length; i<j; i++){			
 						var lnkId = dojo.attr(accordLinks[i],"id");			
 						if( this._eventListeners[lnkId]){
 							console.log("connecting onclick event of link "+accordLinks[i]+ " to "+this._eventListeners[lnkId]+" event listener id="+lnkId);
 							this._connectHandlers.push(connect.connect(accordLinks[i],"onclick", this, this._eventListeners[lnkId]));
 						}else{
 							console.log("missing "+lnkId+ "event listener...");
 						}
 						
 						
 						
 					}//for
 					
 					console.debug(" _4EvHdlr][ gui_eventsHandler.js ->  this._connectHandlers");
 					//var accordeonLinks = dojo.query("a");		
 					//dojo.forEach(accordeonLinks, function(link){
 					//	console.log(dojo.get("id",link));
 					//});
 					//this.inherited(arguments);
 				}//updateConnects
 			});





 			///*
 			// * as tab pode ter links dentro delas 
 			// * podem ter links nas suas abas
 			// * eu quero um lugar pra colocar os eventhandlers e que todos os 
 			// * compartilhado para todas as abas que forem abertas
 			// */
 			//dojo.declare("ed.apps.gui.event_handles.TabEventHandler",
// 							[ed.apps.gui.event_handles.AbstracEventHandler], {
 			//	
// 				constructor : function(args){
// 					console.debug("ed.apps.gui.event_handles.TabEventHandler => constructor : function(){...");
// 					dojo.safeMixin(this,args);		
// 				},//constructor
 			//
// 				showEventListeners: function(){
// 					console.debug("ed.apps.gui.event_handles.TabEventHandler => showEventListeners: function(){...");
// 					this.inherited(arguments);
// 				},
// 					
// 				/*
// 				 * each time a eventHandler is setted by setEventListener method we have a litle problem
// 				 * because if there was a listener setted previously its connected again e run twice 
// 				 * TODO is better do not reconnect all to recconnect again...
// 				 */
// 				updateConnects : function(){
//// 					
//// 					console.debug(" $$ ed.apps.gui.event_handles.TabEventHandler => updateConnects : function(){...");		
//// 					//all links in accordeon containe has its onClick connected to its id sinoimous eventListeners		
//// 					var accordLinks = dojo.query("a", this._widget_whith_events_to_be_handle.domNode);
//// 					
//// 					//disconnect first a reconnect after
//// 					for(var i=0, j = this._connectHandlers.length;  i<j;  i++){
//// 						dojo.disconnect(this._connectHandlers[i]);
//// 					}		
//// 					this._connectHandlers = new Array();
//// 							
//// 					for(var i=0, j = accordLinks.length; i<j; i++){			
//// 						var lnkId = dojo.attr(accordLinks[i],"id");			
//// 						if( this._eventListeners[lnkId]){
//// 							console.log("connecting onclick event of link "+accordLinks[i]+ " to "+this._eventListeners[lnkId]+" event listener id="+lnkId);
//// 							this._connectHandlers.push(dojo.connect(accordLinks[i],"onclick", this, this._eventListeners[lnkId]));
//// 						}else{
//// 							console.log("missing "+lnkId+ "event listener...");
//// 						}
//// 						
//// 						
//// 						
//// 					}//for
//// 					
//// 					console.log(this._connectHandlers);
//// 					//var accordeonLinks = dojo.query("a");		
//// 					//dojo.forEach(accordeonLinks, function(link){
//// 					//	console.log(dojo.get("id",link));
//// 					//});
//// 					//this.inherited(arguments);
 			////	
// 				}//updateConnects
 			//
 			//});


				
			 	
});