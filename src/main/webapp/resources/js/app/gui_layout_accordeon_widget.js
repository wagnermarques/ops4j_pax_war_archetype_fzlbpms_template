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
						title:"TITLE 1, for this accordPane_1",
						style: "",
						content:	"change it in gui_layout_accordeon_widget.js file",
					},
					{
						id:"accordPane_2",
						title:"TITLE 2, for this accordPane_2",
						style: "",
						content:   "the path file is root/resources/js/app/re"
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