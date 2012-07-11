define(
 	[
	 "dojo/_base/lang",
 	 "dojo/_base/declare",
 	 
	 "dojo/dom",
	 "dojo/dom-construct",
 	 "dojo/parser", 
 	
 	 "dijit/layout/ContentPane", 
 	 "dijit/layout/BorderContainer",
 	 "dijit/layout/AccordionContainer",
 	 "dijit/registry",
 	 
 	 "dojo/domReady!"
 	 ], 
 	 

 	 function(	lang,
 			 	declare,
 			 	dom, domConstruct, parser, 
 			 	ContentPane , BorderContainer, AccordionContainer, registry ) { 		
			
 		console.debug(" _4EvHdlrAbstrX][ gui_eventsHandlerAbstract.js ->  module initialization fn running now....");
 		
	
 		return declare(null, {
				
 				_widget_whith_events_to_be_handle:null,
 				_eventListeners : null,
 				/*
 				 * this property is for a super specific infraestruture class purpose
 				 * all time that the method setEventListener is called, all the methods (listeners) in the
 				 * _widget_whith_events_to_be_handle are connected. But all the times setEventListener is called to
 				 * set a new event listener is possible that some another method listener had been setted previously
 				 * and if its true that early listener is connected again a so called twice
 				 * 
 				 * To know
 				 */
 				_connectHandlers : new Array(),
 				
 				constructor : function(args){
 					//alert("gui_eventsHandlerAbstract -> constructor : function(args){|||||||");
 					console.debug("_4EvHdlrAbstrX][ gui_eventsHandlerAbstract.js ->   constructor : function(){...");		
 					this._eventListeners = {};		
 					
 					declare.safeMixin(this,args);		
 					
 					//the last responsabily
 					//this.updateConnects();
 				},//constructor
 				
 				/**
 				 * setEventListener so seta mesmo o listener no eventHandler apropriado
 				 * por exemplo, vc pode ter um event handler pra um widget accordeonContainer, por exemplo
 				 * 
 				 */
 				setEventListener : function(NameOf_eventListener, ObjectInstanceOf_eventListener){
 					//console.debug("@ed.apps.gui.event_handles.AbstracEventHandler => setEventListener : function(NameOf_eventListener, ObjectInstanceOf_eventListener){...");
 					//console.debug("@ed.apps.gui.event_handles.AbstracEventHandler => settting "+ NameOf_eventListener + " = "+ ObjectInstanceOf_eventListener +" EventListener.");
 					this._eventListeners[NameOf_eventListener.toString()]  =  ObjectInstanceOf_eventListener;
 					this.updateConnects();
 				},
 				getEventListener : function(NameOf_eventListener){
 					//console.debug("#ed.apps.gui.event_handles.AbstracEventHandler => getEventListener : function(NameOf_eventListener){...");
 					//console.debug("#returning eventListener named"+ NameOf_eventListener +" =>"+this._eventListeners);
 					return this._eventListeners[NameOf_eventListener];
 				},
 				showEventListeners : function(){
 					//console.debug("!ed.apps.gui.event_handles.AbstracEventHandler => showEventListeners : function(){..."); 
 					console.log(this._eventListeners);
 				},
 				
 				updateConnects : function(){
 					console.debug(" $$ ed.apps.gui.event_handles.AbstracEventHandler => updateConnects : function(){...");
 				}
 			});
		 	
});