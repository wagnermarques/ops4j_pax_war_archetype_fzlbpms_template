define(
 	[
	 "dojo/_base/lang",
 	 "dojo/_base/declare",
 	 
	 "dojo/dom",
	 "dojo/dom-construct",
 	 "dojo/parser", 
 	
 	 "dijit/layout/ContentPane", 
 	 "dijit/layout/BorderContainer",
 	 //"./gui_layout_accordeon_widget",
 	 
 	 "dojox/layout/ContentPane",
 	 "dojo/domReady!"
 	 ], 
 	 

 	 function(	lang,
 			 	declare,
 			 	dom, domConstruct, parser, 
 			 	ContentPane , BorderContainer, 
 			 	
 			 	//gui_layout_accordeon_widget,
 			 	XContentPane) {
 		
 		console.debug(" _3 gui_layout_definitions module initialization fn running now....");
 		

 		
 		
 		return declare(null, {
 		
 			_app_canvas_domNode : null,


 			
 			//FIEDLS AND ITS GETTERS AND SETTERS
			MainBC : null,
			getMainBCAttr : function(){
				return this.MainBC;
			},

			TopContatPaneInTheMainBC: null,
			getTopContatPaneInTheMainBCAttr  : function(){
				return this.TopContatPaneInTheMainBC;
			},
			
			CenterContatPaneInTheMainBC: null,			
			getCenterContatPaneInTheMainBCAttr : function(){
				return this.CenterContatPaneInTheMainBC;
			},
			
			LeftContatPaneInTheMainBC: null,			
			getLeftContatPaneInTheMainBCAttr : function(){
				return this.LeftContatPaneInTheMainBC;
			},

			LeftBC_of_MainBC : null,
			getLeftBC_of_MainBC : function(){
				return this.LeftBC_of_MainBC;
			},




			_layoutStartingUp_AccordeonContainer_inThe_LeftContatPane : function(){
 	 			console.log(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_AccordeonContainer_inThe_LeftContatPane(){...");
 	 			console.log(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_AccordeonContainer_inThe_LeftContatPane(){... this.LeftContatPaneInTheMainBC="+this.LeftContatPaneInTheMainBC);
 	 			
 	 			//gui_layout_accordeon_widget vai instanciar um accordeon
 	 			var acc = new gui_layout_accordeon_widget();
				acc.getInstance().placeAt(this.MainBC);
//				mainBC.startup();

 	 			//.getWidgetInstance();
 	 			//this.LeftContatPaneInTheMainBC.addChild(new gui_layout_accordeon_widget().getWidgetInstance());
 	 			
 	 				  
 	 		},
 	 		
			_layoutStartingUp_AccordeonContainer_inThe_LeftBC_inThe_MainBC_left_region : function(){			
 	 			console.log(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_AccordeonContainer_inThe_LeftBC_inThe_MainBC...");
 	 			console.log(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_AccordeonContainer_inThe_LeftBC_inThe_MainBC... LeftBC_of_MainBC="+this.LeftBC_of_MainBC);
 	 			
 	 			//gui_layout_accordeon_widget vai instanciar um accordeon
 	 			var acc = new gui_layout_accordeon_widget(); 	 			
				acc.getInstance().placeAt(this.LeftBC_of_MainBC);
				

 	 			//.getWidgetInstance();
 	 			//this.LeftContatPaneInTheMainBC.addChild(new gui_layout_accordeon_widget().getWidgetInstance());
 	 			
 	 				  
 	 		},

 	 		
 	 		
 	 		
 	 		//C O N F I G U R I N G   L E F T   R E G I O N   O F   M A I N B C
			_layoutStartingUp_Set_LeftBC_inThe_MainBC_left_region : function(){
				this.LeftBC_of_MainBC = new BorderContainer({
 	  	  			id: "LeftBC_of_MainBC",
 	  	  			region: "left",
 	  	    		style:"width:170px; height:100%"
 				});
				this.MainBC.addChild(this.LeftBC_of_MainBC);
			},

			
			
			
 	 		
 	 		// center region ContentPane, e coloca no mainBC:
 	 		_layoutStartingUp_putCenterContatPaneInTheMainBC : function(){	
 	 			console.log(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_putCenterContatPaneInTheMainBC(){...");
 	 			//this. CenterContatPaneInTheMainBC = new ContentPane({
 	 			this. CenterContatPaneInTheMainBC = new XContentPane({ 	 			
 	 				id:"centerContentPane",
 	 				region:"center",
 	 				style:"height:200px; width:200px; background-color:red",
 	 				content:"<div id='centerContentPaneNativeNode'>XContentPane</div>",
 	 				splitter:true
 	 			}).placeAt(this.MainBC);
 	 		},
 	 		

 	 		//
 	 		_layoutStartingUp_putLeftContatPaneInTheMainBC : function(){	
 	 			console.log(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_putLeftContatPaneInTheMainBC...");
// 	 			this.LeftContatPaneInTheMainBC = new ContentPane({
// 	 				id:"left0ContentPane",
// 	 				region:"left",
// 	 				style:"height:35px",
// 	 				content:"<ul><li>Adilmo</li><li>Wagner</li><li>Alessandro</li><li>Edson</li><li>Mara</li><li>Teste</li><li></li><ul>",
// 	 				splitter:true
// 	 			}).placeAt(this.MainBC);
 	 		},

 	 		
 	 		// top region ContentPane, e coloca no mainBC:
 	 		_layoutStartingUp_putTopContatPaneInTheMainBC : function(){	
 	 			console.log(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_putTopContatPaneInTheMainBC(){...");
 	 			this.TopContatPaneInTheMainBC = new ContentPane({
 	 				id:"topContentPane",
 	 				region:"top",
 	 				style:"height:35px",
 	 				content:"<div id='topContentPaneNativeNode'></div>",
 	 				splitter:true
 	 			}).placeAt(this.MainBC);
 	 		},
	 		
 	 		
 	 		//cria mainBC e coloca do body no canvas_dom_node
 	  		_layoutStartingUp_MainBC : function(){  			
 	  	  		console.debug(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_MainBC...");
 	  	  		console.debug(" _3.3.3 gui_layout_definitions.js -> _layoutStartingUp_MainBC...[> this._app_canvas_domNode="+this._app_canvas_domNode);
 	  	  		
 	  	  		this.MainBC	 = new BorderContainer({
 	  	  			id: "mainBC",
 	  	    		style:"width:100%; height:100%"
 				}).placeAt(this._app_canvas_domNode);
 	  		},

 	  		
 	  		
 	  		
 	  		_layoutStartup : function(){
 	 			console.log(" _3.3 gui_layout_definitions.js -> _layoutStartup..."); 	 			
 	 			//alert(_layout.mainBC);
 	 			this._layoutStartingUp_MainBC();
 	 			
 	 			//if we want not top...
 	 			//this._layoutStartingUp_putTopContatPaneInTheMainBC();
 	 			
 	 			//if we just a left contentpane in the MainBC and the accordeon container in there...
 	 			//this._layoutStartingUp_putLeftContatPaneInTheMainBC();
 	 			//this._layoutStartingUp_AccordeonContainer_inThe_LeftContatPane();
 	 			
 	 			
 	 			//but if we want a BC in the left of the MainBC but the accordeon containner int the LeftBC_of_MainBC...
 	 			this._layoutStartingUp_Set_LeftBC_inThe_MainBC_left_region(); 	 			     
 	 			this._layoutStartingUp_AccordeonContainer_inThe_LeftBC_inThe_MainBC_left_region();
 	 			

 	 			this.MainBC.startup();
 	 			
 	 		},

 			
 			constructor : function(args){ 				
 	 			console.debug(" _3 gui_layout_definitions.js constructor, args="+args);
 	 			console.debug(args);
 	 			lang.mixin(this, args);
 	 			console.debug(" _3 gui_layout_definitions.js this._app_canvas_domNode="+this._app_canvas_domNode);   
 				this._layoutStartup(); 				
 			},//constructor
 			
 		});
 	
 	
 });


 	       
      
//

//
//      		// cria ContentPane de rodape, e coloca no mainBC:
//      		console.log("  [:D  initWidgets.js   ->    CREATING ContantePane de rodape do mainBC...");
//      		new dijit.layout.ContentPane({
//      				id:"rodapeContentPane",
//        			region:"bottom",
//        			style:"height:9px",
//        			content:"<p>nao definido</p>",
//        			splitter:true
//  			}).placeAt(mainBC);
//      
//      
//      		// coloca um AccordionContainer no lado esquerdo do mainBC:
//      		console.log("  [:D   initWidgets.js  ->    CREATING main BC left AccordionContainer...");      
//      		var accordion = new dijit.layout.AccordionContainer({
//        					region:"left",
//        					style:"width:200px; heigth:500px",        
//        					content:"<p>Outer c dddddddd Right</p>",
//        					splitter:true
//			}).placeAt(mainBC);
//      
// 
//      		// COLOCA OS AccordionPanes no Widget AccodionContainer. (use ContentPane in 1.3)
//      		console.log("  [:D  initWidgets.js   ->    SETTING AccordionContainer AccordionPane-S");
//      		new dijit.layout.AccordionPane({ id: "accordPane_1", title:"Membros", content:"<p>Nao definido</p>" })
//      		.placeAt(accordion);
//      		new dijit.layout.AccordionPane({ id: "accordPane_2", title:"D&iacute;zimos e Ofertas", content:"<p>Nao definido</p>" })
//      		.placeAt(accordion);
//      		new dijit.layout.AccordionPane({ id: "accordPane_3", title:"Adm Patrimonial", content:"<p>Nao definido</p>" })
//      		.placeAt(accordion);
//      		new dijit.layout.AccordionPane({ id: "accordPane_4", title:"Relat&oacute;rios", content:"<p>Nao definido</p>" })
//      		.placeAt(accordion);
//      
//      		//cria um novo BorderContainer e coloca no centro do mainBC
//      		var centerBC = new dijit.layout.BorderContainer({ region:"center" }).placeAt(mainBC);
//      
//						
//			//COLOCA UM TABCONTAINER NO center do centerBC e uma tab de apresentacao
//      		var tabs = new dijit.layout.TabContainer({
//        			id : "tabs",
//        			region:"center",
//        			splitter:true,
//        			tabStrip: true
//      		}).placeAt(centerBC);
//
//
//	      	// coloca um ContentPane na regiao de baixo do centerBC
//      	  	console.log("  [:D  initWidgets.js   ->    coloca um ContentPane na regiao de baixo do mainBC");
//      		new dijit.layout.ContentPane({
//        		id:"centerBC_ContentPane_parteDeBaixo",
//        		region:"bottom",
//        		style:"width:100%",        
//        		content:"<div id='gridDomNodeId'></div>",
//        		splitter:true
//      		}).placeAt(centerBC);
//      mainBC.startup();
//    }
//
