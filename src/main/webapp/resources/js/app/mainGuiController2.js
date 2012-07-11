/**
 * 
 */
dojo.provide("ed.apps.gui.controllers.MainGuiController");


dojo.require("ed.apps.gui.event_handles.EventHandlers");

dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.AccordionContainer");

console.log("ed.apps.gui.controllers.MainGuiController => CARREGADO COM SUCESSO!!!");

dojo.declare("ed.apps.gui.controllers.MainGuiController", null, {

	

	//some defaults
	topContentPane_title : null,
	_eventHandlers : null,
	

	
	constructor : function(args){
		console.debug(" CCC ed.apps.gui.controllers.MainGuiController =>  constructor : function(args){...");
		dojo.safeMixin(this, args);
		console.debug(" CCC ed.apps.gui.controllers.MainGuiController => this.topContentPane_title"+this.topContentPane_title);
		this._eventHandlers = {};
	},//constructor
	
	

	buildUI : function(){
		console.debug(" BBB ed.apps.gui.controllers.MainGuiController => : buildUI : function(){...");	
		
		var mainBC = new dijit.layout.BorderContainer({
  			id: "mainBC",
    		style:"width:100%; height:100%"
			}).placeAt(dojo.body());

		//topContentPane
   		new dijit.layout.ContentPane({
			id:"topContentPane",
			region:"top",
			style:"height:15px",
			content: this.getTopContentPane_title(),
			splitter:false
		}).placeAt(mainBC);
   		
  		// rodapeContentPane no mainBC:
  		new dijit.layout.ContentPane({
  				id:"rodapeContentPane",
    			region:"bottom",
    			style:"height:9px",
    			content:"<p>nao definido</p>",
    			splitter:true
  		}).placeAt(mainBC);
  
  		
  		
  		//AccordionContainer left do mainBC:      
  		var accordion = new dijit.layout.AccordionContainer({
    					region:"left",
    					style:"width:200px; heigth:500px",        
    					content:"<p>indefinido</p>",
    					splitter:true
		}).placeAt(mainBC);
  
  		// preenche acordeon pane
  		new dijit.layout.ContentPane({ id: "accordPane_1", title:"Membros", content:"<p>Nao definido</p>" })
  		.placeAt(accordion);
  		new dijit.layout.ContentPane({ id: "accordPane_2", title:"D&iacute;zimos e Ofertas", content:"<p>Nao definido</p>" })
  		.placeAt(accordion);
  		new dijit.layout.ContentPane({ id: "accordPane_3", title:"Adm Patrimonial", content:"<p>Nao definido</p>" })
  		.placeAt(accordion);
  		new dijit.layout.ContentPane({ id: "accordPane_4", title:"Relat&oacute;rios", content:"<p>Nao definido</p>" })
  		.placeAt(accordion);
   		
  		//accordeon links
  		var linksAccordPane_1 = 
			"<a id='accord1_lnk1' href='#'>Cadastrar Membro</a><p></p>" +
			"<a id='accord1_lnk2' href='#'>Pesquisar Membros</a><p></p>" +
			"<a id='accord1_lnk3' href='#'>Carteirinha</a><p></p>" +
			"<a id='accord1_lnk4' href='#'>Familias</a><p></p>";
  			
  		var linksAccordPane_2 = 
			"<a  id='accord2_lnk1' href='#' onclick='accordLinks_ActionsHandler.performAction(this);return false;'>Pesquisar membros</a><p></p>";
  		
  		dijit.byId("accordPane_1").set("content",linksAccordPane_1);
  		dijit.byId("accordPane_2").set("content",linksAccordPane_2);
	
  		
  		//setting accordeon eventHandler
  		this.setEventHandler("AccordeonEventHandler", 
  					new ed.apps.gui.event_handles.AccordeonEventHandler({
  						_widget_whith_events_to_be_handle: accordion
  					})
  		);

  		
  		this.getEventHandler("AccordeonEventHandler").setEventListener("accord1_lnk1", function(){
  				console.debug(":::> RUNNING RUNNING EVENT LISTENER...  accord1_lnk1 eventListener.... at here,this="+this);
//  				var cp = new dojox.layout.ContentPane({
//					id:cpId,
//					title:title,
//					closable:true,
//					onClose: function(){    
//						var arrumarIsto = dijit.byId("combo_campo_de_pesquisa");
//						if(arrumarIsto) arrumarIsto.destroy();
//						return true;      						
//					},
//  				style:"height:35px",
//  				href:href_de_deConteudo	
//				});
//  				
//				var conteudo_do_contentPane = "./tab/membros_cadastrar.php";
//				var cp = _newContentPanel(sender.id, "Cadastrar Membro",conteudo_do_contentPane);
//				cp.placeAt(_defaultTabContainer);
//				_defaultTabContainer.selectChild(cp);				
  		});
  		

  	this.getEventHandler("AccordeonEventHandler").setEventListener("accord1_lnk2", function(){
			console.debug(":::> RUNNING RUNNING EVENT LISTENER...  accord1_lnk2 eventListener.....at here,this="+this);  				
	});


  		
  		
  		//cria um novo BorderContainer e coloca no centro do mainBC
  		var centerBC = new dijit.layout.BorderContainer({ region:"center" }).placeAt(mainBC);
  				
		//COLOCA UM TABCONTAINER NO center do centerBC e uma tab de apresentacao
  		var tabs = new dijit.layout.TabContainer({
    			id : "tabs",
    			region:"center",
    			splitter:true,
    			tabStrip: true
  		}).placeAt(centerBC);


      	// coloca um ContentPane na regiao de baixo do centerBC
  	  	//console.log("  [:D  initWidgets.js   ->    coloca um ContentPane na regiao de baixo do mainBC");
  		//new dijit.layout.ContentPane({
    	//	id:"centerBC_ContentPane_parteDeBaixo",
    	//	region:"bottom",
    	//	style:"width:100%",        
    	//	content:"<div id='gridDomNodeId'></div>",
    	//	splitter:true
  		//}).placeAt(centerBC);
  
  		mainBC.startup();
  		
  		//connecyEventHandlers
  		
   		
	},//buildUI
	
	
	getTopContentPane_title : function(){
		return this.topContentPane_title;
	},
	
	
	
	/*
	 * 
	 */
	setEventHandler : function(NameOf_eventHandler, ObjectInstanceOf_eventHandler){
		//console.debug(" SEV ed.apps.gui.controllers.MainGuiController => setEventHandler : function(NameOf_eventHandler, ObjectInstanceOf_eventHandler){");
		this._eventHandlers.NameOf_eventHandler = ObjectInstanceOf_eventHandler
	},
	getEventHandler : function(NameOf_eventHandler){
		//console.debug(" GEV ed.apps.gui.controllers.MainGuiController => getEventHandler : function(NameOf_eventHandler){....");
		//console.debug(" GEV returning from this._eventHandlers = "+ this._eventHandlers +" the "+NameOf_eventHandler+" eventHandler"); 
		//console.debug(this._eventHandlers.NameOf_eventHandler);
		return this._eventHandlers.NameOf_eventHandler;
	}

	
});