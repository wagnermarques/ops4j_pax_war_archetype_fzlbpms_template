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
	
		console.debug(" _4X][ gui_layout_accordeon_widget.js ->  module initialization fn running now....");
	
		
			return declare(null, {
				
				
				_accordeonPanes : [
					{
						id: "accordPane_1",
						title:"CADASTRO DE PACIENTES",
						style: "",
						content:	"<a id='accord1_lnk1' href='#' class='accord_lnk'>Listar/Pesquisar</a><p></p>"// +
									//"<a id='accord1_lnk2' href='#' class='accord_lnk'>Inserir Novo</a><p></p>" +
									//"<a id='accord1_lnk3' href='#' class='accord_lnk'>Excluir</a><p></p>",
					},
					{
						id:"accordPane_2",
						title:"Rede Prote&ccedil;&atilde;o",
						style: "",
						content:   "<a  id='accord2_lnk1' href='#' class='accord_lnk'>Listar/Pesquisar</a><p></p>"// +	
						           //"<a  id='accord2_lnk2' href='#' class='accord_lnk'>Inserir equipamento</a><p></p>" +
 					               //"<a  id='accord2_lnk2' href='#' class='accord_lnk'>Excluir</a><p></p>"
					}
				],
					
				
				widgetInstance : null, //mesmo que haja mais instancias dessa classe, esse attr he estatico, todas compartilham dele
				getInstance : function(){
					return this.widgetInstance;
				},
				
				
				_getWidgetInstanceAttr:  function(){
				 	if(this.widgetInstance) {
					 		return this.widgetInstance; 
			 		}else{
				 			throw new Error("gui_layout_accordeon_widget.js -> _getWidgetInstanceAttr:  function(/*Object*/ constraints){ (nao havia instancia pra retornar)");
				 	}  
				 },


				constructor : function(){					 
			  		console.debug(" _4X][ gui_layout_accordeon_widget.js -> contructor : function(){...");			  		 
			  		
			  		var accExistent = registry.byId("accordeon");
			  		
			  		var newAcc = null;
					if(accExistent) {
						return  accExistent; 
					} else {
						newAcc = new AccordionContainer({id:"accordeon", region:"top", style:"background-color:yellow"});						
					}
							  			
					//console.log(this.widgetInstance);		  			
					this._accordeonPanes.forEach(function(ap){
						console.debug(" _4X][ gui_layout_accordeon_widget.js -> this._accordeonPanes.forEach(function(ap){... ap="+ap);																		
						var cp = new ContentPane(ap);
						newAcc.addChild(cp);						
					});
					
					this.widgetInstance = newAcc;					
		  		}//constructor : function(){
		  			
			})		 		

});