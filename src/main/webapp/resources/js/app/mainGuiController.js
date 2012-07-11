define([ 
    "dojo/dom", "dojo/dom-construct", "dojo/dom-class", "dojo/on",
	"dojo/keys",

	"dojo/_base/lang", "dojo/_base/array", "dojo/_base/event",
	"dojo/_base/xhr", "dojo/_base/Deferred", "dojo/_base/connect",
	"dojo/_base/declare",

	"dijit/Dialog", "dijit/registry",

	"./gui_layout_definitions", // at own module:
											// gui_layout_definition_constructor()
	"./gui_eventsHandler",
	"../ipgg_georef/readyMethodRunner",
	"dojo/domReady!" ],

	function(dom, domConstruct, domClass, on, keys, lang, array, event,
			 xhr, deferred, connect, declare, Dialog, registry,
			 gui_layout_definitions) {

			// var _instance = null;
			// var _thisModuleInitFn = this;
			// console.debug(" _2 mainGuiController.js -> module initialization
			// fn running now...");
			// console.debug(" _2 mainGuiController.js -> var _thisModuleInitFn
			// = this; _thisModuleInitFn="+_thisModuleInitFn);
			// how to create a mainGuiController instance...
			// simple: new mainGuiController return the return of thit function
			// below

			return function() {
				if (window.mainAppController == null)
					return new Error("Para fazer new mainGuiController( he necessario window.mainAppController esteja instanciado");

				if ((window.mainAppController != null)
						&& (window.mainAppController.getMainGuiController() != null)) {
					return function(mainGuiControllerArgs) {
						return window.mainAppController.getMainGuiController();
					}

				} else if ((window.mainAppController != null)
						&& (window.mainAppController.getMainGuiController() == null)) {
					return function() {

						var mainGuiControllerInstance = (declare(null,
							{
								_app_canvas_domNode : null,								
								_eventHandlers : null,
								_gui_layout_definition : null,

								// A T R I B U T O S E S T A T I C O S D E
								// configuracoes GLOBAIS DA GUI
								// depois de rodar o construtor o _gcc vai
								// ficar da seguinte maneira
								// _gcc
								// _gcc.appConfig
								// _gcc.appConfig.path_iconePrincipal : "",
								// _gcc.appConfig.path_bannerComTituloDaAplicacao
								// : "",
								// _gcc.appConfig.notaDeRodape : "",
								_gcc : null,

								// CONFIG AccordPanes

								// disponibiliza metodo de configuracao
								// inicial da gui
								// se utiliza da seguinte forma
								// guiController.getGuiControllerContext.configuracaoInicialDaGui();
								// CONFIGURA WIDGETS QUE JA FORAM CRIADOS
								_startupMainGuiController : function() {										
									console.log(" _2.2.2.2* mainGuiController -> _startupMainGuiController : function(){... ->  configuracao inicial da gui...");
									console.log(" _2.2.2.2* mainGuiController -> _startupMainGuiController : registry.toArray() -> "+ registry.toArray());
										
									registry.toArray().forEach(function(w) {// theese
																			// widgets
																			// came
																			// from
																			// gui_layout_definitions
											console.log(" _2.2.2.2* mainGuiController -> _startupMainGuiController : -> ...registry.toArray().forEach(function(w){ --> CONFIGURANDO WIDGET="+ w);
															// configura aqui a
															// logo e o nome da
															// aplicacao
															// if(w.id ==
															// "topContentPane")
															// {
															// console.log("
															// _2.2.2.2*
															// mainGuiController
															// ->
															// _startupMainGuiController
															// -> configurando
															// topContentPane..."+w);
															// var imgTag =
															// "<img
															// src="+_gcc.appConfig.path_iconePrincipal+">"+_gcc.appConfig.tituloDaAplicacao+"</img>";
															// var
															// imgBannerComTituloDaAplicacao
															// = "<img
															// src="+_gcc.appConfig.path_bannerComTituloDaAplicacao+"></img>";
															//	 		 		   				
															//	 		 		   				
															// var
															// tagImagemETitulo
															// = "<table>"+
															// "<td>"+
															// imgBannerComTituloDaAplicacao
															// +
															// "</td>"+
															// "</table>";
															//	 		 	    				
															// w.set("content",
															// tagImagemETitulo);
															// }//configura aqui
															// a logo e o nome
															// da aplicacao

															// recheiaDeLinks_AccordeonPane_usuarios
															// if(w.id ==
															// "accordPane_1") {
															// console.log("
															// _2.2.2.2*
															// mainGuiController
															// ->
															// _startupMainGuiController
															// -> configurando
															// accordPane_1..."+w);
															// w.set("content",_gcc.appConfig.linksAccordPane_1);
															// }

															// recheiaDeLinks
															// accordPane_cursos
															// if(w.id ==
															// "accordPane_2") {
															// console.log("
															// _2.2.2.2*
															// mainGuiController
															// ->
															// _startupMainGuiController
															// -> configurando
															// accordPane_2..."+w);
															// w.set("content",_gcc.appConfig.linksAccordPane_cursos);
															// }

															// recheiaDeLinks
															// accordPane_alunos
															// if(w.id ==
															// "accordPane_3") {
															// console.log("
															// _2.2.2.2*
															// mainGuiController
															// ->
															// _startupMainGuiController
															// -> configurando
															// accordPane_3..."+w);
															// w.set("content",_gcc.appConfig.linksAccordionPane_alunos);
															// }

															// //preenche notas
															// de rodape
															// if(w.id ==
															// "rodapeContentPane")
															// {
															// console.log("
															// _2.2.2.2*
															// mainGuiController
															// ->
															// _startupMainGuiController
															// -> configurando
															// rodapeContentPane..."+w);
															// w.set("content",_gcc.appConfig.notaDeRodape);
															// }

															// if(w.id ==
															// "tabs") {
															// console.log("
															// _2.2.2.2*
															// mainGuiController
															// ->
															// _startupMainGuiController
															// -> configurando
															// tabs..."+w);
															// var
															// cpDeApresentacao
															// = new
															// dojox.layout.ContentPane({
															// id:"cp_apresentacao",
															// title:
															// "apresentacao",
															// href:_gcc.appConfig.href_do_fragmentoHtml_de_apresentacao_do_aplicativo
															// }).placeAt(w);
															// w.startup();
															// }
														});// dijit.registry.forEach
										// _refreshGui();
									},// _startup = function(){

									// some defaults
									// topContentPane_title : null,
									// _eventHandlers : null,

									
									_widgetsStartup : function(app_canvas_domNode) {										
										console.debug(" _2.2.2  mainGuiController.js -> var _widgetsStartup = function(){");
										console.debug(" _2.2.2  mainGuiController.js -> starting gui_layout_definition...at this._app_canvas_domNode="+ app_canvas_domNode);
										var gui_layout_definitionsARGS = {
											_app_canvas_domNode : app_canvas_domNode
										};
										_gui_layout_definition = new gui_layout_definitions(
												gui_layout_definitionsARGS);
										this._startupMainGuiController();
									},

									widgetsStartup : function(app_canvas_domNode) {
										console.debug(" _2.2 mainGuiController.js -> widgetsStartup()...");
										this._widgetsStartup(app_canvas_domNode);
									},

									
									setGuiController: function(
											/*String */guiControllerId, 
											/*jsObject*/guiControllerInstance){
										console.debug(" [] setGuiController: \n function(/*String */guiControllerId, /*jsObject*/guiControllerInstance){...guiControllerId="+guiControllerId+", guiControllerInstance="+guiControllerInstance);
										this.guiControllers.guiControllerId = guiControllerInstance;
										
									},
									
									getGuiController: function(/*String*/guiControllerId){
										console.debug(" [] getGuiController: \n function(/*String*/guiControllerId){... guiControllerId="+guiControllerId);
										return this.guiControllers.guiControllerId; 
									},
									
									/**
									 * constructor
									 */
									constructor : function(args) {
										console.debug(" _2* mainGuiController.js -> constructor, args="
														+ args);
										console.debug(args);
										console.debug(" _2* mainGuiController.js -> this._app_canvas_domNode="
														+ this._app_canvas_domNode);
										// lang.mixin(this, args);
										this.guiControllers = {};
										declare.safeMixin(this, args);
										console.debug(" _2* mainGuiController.js -> (after lang.mixin)this._app_canvas_domNode="
														+ this._app_canvas_domNode);
										console.debug(" CCC ed.apps.gui.controllers.MainGuiController => this.topContentPane_title"
														+ this.topContentPane_title);
										// this._app_canvas_domNode =
										this._eventHandlers = {};
									},// constructor

									/**
									 * O mainBC tem um centerContentPane a ideia
									 * simplesmente trocar o seu conteudo
									 * destruindo o que estiver nele e colocando
									 * outro conteudo
									 * 
									 * centerContentPaneNativeNode he um domNode
									 * que tem no centerContentPane esse domNode
									 * e passado para os widgets quando so
									 * criados POR ENQUANTO TRABALHAR COM
									 * RECEBENDO CONTENTPANE contentOfTheView
									 * pode ser um contentPane, neste caso, so
									 * destruimos a anterior e colocamos o novo
									 * contentOfTheView pode ser uma url. Neste
									 * caso usamos o contentPane que tem a
									 * atualizamos ele
									 * 
									 * 
									 * asATabOrasAMainView 
									 * 		= asATab a newView vai ser colocada como uma nova tab na mainTC
									 * 		= asAMainView a newView vai substituir a mainTC e vai ser colocada no center do mainCP
									 */
									setView : function(newView, asATabOrasAMainView) {
										console.debug("setView # setView # setView # setView # setView # setView ");
										console.debug("_5% mainGuiController.js -> setView : setView : function(contentOfTheView){... newView="
														+ newView + " asATabOrasAMainView="+asATabOrasAMainView);

										// -> preparativos pra funcao...
										var mainBC = registry.byId("mainBC");
										var mainBCChildrens = mainBC.getChildren();

										
										
										if (newView.declaredClass == "dojox.layout.ContentPane"
												|| newView.declaredClass == "dijit.layout.ContentPane") {											
												
											if(asATabOrasAMainView == "asAMainView"){												
												console.log("_5% setting "+newView+" asAMainView");
												mainBCChildrens.forEach(function(child) {
														// o widget que estiver
														// ocupando a posicao
														// newView.region e
														// destruido para ser
														// substituido pela
														// newView

														if (child.get("region") == newView.region)
															child.destroyRecursive();
												});
												mainBC.addChild(newView);
											}

											if(asATabOrasAMainView == "asATab"){
												console.log("_5% setting "+newView+" asATab");
												var mainTC = registry.byId("mainTC");												 
												mainTC.addChild(newView);
												mainTC.selectChild(newView, true);
											}
											
											
											
										} else if (newView.declaredClass == "dijit.layout.TabContainer"){
											
											if(asATabOrasAMainView == "asAMainView"){
												console.log("_5% setting "+newView+" asAMainView");
												mainBCChildrens.forEach(function(child) {
													if (child.get("region") == newView.region)
														child.destroyRecursive();
												});
												mainBC.addChild(newView);
											}
											
											if(asATabOrasAMainView == "asATab"){
												console.log("_5% setting "+newView+" asATab");
												var mainTC = registry.byId("mainTC");												 
												mainTC.addChild(newView);
												mainTC.selectChild(newView, true);
											}
											
											
										}

										// console.debug("_5%
										// mainGuiController.js -> setView :
										// function(widget){...
										// centerContentPane.getChildren()...");
										// centerContentPane.onDownloadEnd =
										// function(){
										// console.debug("_5%
										// mainGuiController.js -> setView :
										// function(widget){... CONTEUDO
										// CARREGOU...onDownloadEnd
										// function(){...");
										// //registry.byId("mainBC").startup();
										// };

										// centerContentPane.onLoad =
										// function(){
										// console.debug("_5%
										// mainGuiController.js -> setView :
										// function(widget){... CONTEUDO
										// CARREGOU...onLoad function(){...");
										// //registry.byId("mainBC").startup();
										// };

										// centerContentPane.set("onDownloadEnd",
										// centerContentPane.set("onDownloadError",
										// function(){
										// console.debug("_5%
										// mainGuiController.js -> setView :
										// function(widget){... CONTEUDO
										// CARREGADO! onDownloadStart
										// function(){...");
										// });
										//					    
										//					    

										// -> D E S T R U I N D O O Q U E E S T
										// I V E R A P A R E C E N D O
										// #caso haja widgets dentro do content
										// pane
										// var centerContentPaneChildrens =
										// centerContentPane.getChildren().length
										//						
										// if(centerContentPaneChildrens.length
										// > 0) {
										// centerContentPaneChildrens.destroyDescendants();
										// var i=0;
										// for(i;
										// i<centerContentPaneChildrens.lenght ;
										// i){
										// centerContentPaneChildrens[i].destroyRecursive();
										// }
										// }

										// -> C O N S T R U I N D O O Q U E VAI
										// A P A R E C E R
										// #pode ser que tenha so html mesmo...
										console.log("setting view to newView="
												+ newView);

										// DEPRECATED:
										// dijit.layout.ContentPane.setHref() is
										// deprecated. Use set('href', ...)
										// instead. -- will be removed in
										// version: 2.0
										// var centerContentPaneContent =
										// centerContentPane.setHref(contentOfTheView);

										// var centerContentPaneContent =
										// centerContentPane.set("href",contentOfTheView);
										// var centerContentPaneContent =
										// centerContentPane.set("content",contentOfTheView);
										// var centerContentPaneContent =
										// centerContentPane.set("content","<span>zxcvzxcvzxcvzxcv</span>");
										// registry.byId("mainBC").startup();
										// centerContentPaneContent.then(function(){
										// console.debug("var
										// centerContentPaneContent =
										// centerContentPane.set('href',contentOfTheView);
										// ->
										// centerContentPaneContent.then(function(){...");
										// console.dir(centerContentPane);
										// registry.byId("mainBC").startup();
										// });
									},

									/*
									 * gui event handlers management
									 */
									setEventHandler : function(
											NameOf_eventHandler,
											ObjectInstanceOf_eventHandler) {
										console.debug(" _2.2.2.2* mainGuiController.js ->  setEventHandler : function(NameOf_eventHandler, ObjectInstanceOf_eventHandler){");
										console.debug(" _2.2.2.2* mainGuiController.js ->  function(NameOf_eventHandler, ObjectInstanceOf_eventHandler){... "
														+ NameOf_eventHandler
														+ ", "
														+ ObjectInstanceOf_eventHandler);
										this._eventHandlers.NameOf_eventHandler = ObjectInstanceOf_eventHandler
									},

									getEventHandler : function(
											NameOf_eventHandler) {
										// console.debug(" GEV
										// ed.apps.gui.controllers.MainGuiController
										// => getEventHandler :
										// function(NameOf_eventHandler){....");
										// console.debug(" GEV returning from
										// this._eventHandlers = "+
										// this._eventHandlers +" the
										// "+NameOf_eventHandler+"
										// eventHandler");
										// console.debug(this._eventHandlers.NameOf_eventHandler);
										return this._eventHandlers.NameOf_eventHandler;
									}

								}))();// return
										// dojo.declare("ed.apps.gui.controllers.MainGuiController",
										// null, {

						// mainGuiControllerInstance
						window.mainAppController.setMainGuiController(mainGuiControllerInstance);
						return window.mainAppController.getMainGuiController();
					}// returned else function
				}// if

				// /**
				// * getInstance
				// * TODO prevent new operator to create new instance... figure
				// it out how to do it
				//			 */
				//	 		getInstance = function(mainGuiControllerArgs) {
				//	 			console.debug(" _2.2.2.2* mainGuiController.js ->  getInstance : function(){...");
				//	 			var _thisGetInstance = this;
				//	 			console.debug(" _2.2.2.2* mainGuiController.js ->  getInstance : function(){...   var _thisGetInstance = this; _thisGetInstance="+_thisGetInstance);											
				//	 			if (_instance) {
				//					console.debug(" _2.2.2.2* mainGuiController.js ->  if(mainGuiController) {=true");					
				//					return function(){
				//						return _instance;
				//					}
				//				} else {					
				//					console.debug(" _2.2.2.2* mainGuiController.js ->  if(mainGuiController) {=false");
				//					console.debug(declare);
				//					gssdafds
				// 
				//				}//else
				//			};//getInstance = function() {
				//	 		
				//			return getInstance;
			}
		});
