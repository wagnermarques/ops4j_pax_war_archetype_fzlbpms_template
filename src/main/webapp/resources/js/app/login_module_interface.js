/**
 * @author administrador
	
	1) ao entrar na aplicacao 
		1.1 verifica se ja tem um usuario corrente (na sessao)
		se sim
		1.1.1 atualiza pagina mostrando usuario logado e nao mostra o dialogo de login
		se nao
		1.1.2 mostra dialogo de login
	 2) ao tentar fechar a janela de login sem logar
	 	2.1 simplesmente mostra a janela de novo
	 	    somente um login de sucesso fecha essa cxa de dlg
	 	
	 3) ao logar sem sucess
	 	3.1 mostra a janela de novo
	 
	 4) ao logar com sucesso
	 	4.1 atualiza pagina mostrando usuario logado
	
	 5) ao fazer logoff
	 	5.1 simplesmente vai e tira o usuario da sessao 
	 	5.2 e atualiza a pagina
	 	
	
	
 */
define(
 	["dojo/dom",
 	 "dojo/dom-construct",
	 "dijit/Dialog", 	 
	 "dijit/form/Button",
	 "dijit/form/TextBox",
	 "dijit/form/ValidationTextBox",
	 "dojo/_base/window",
	 "dojo/_base/lang",//lang.hitch
	 "dijit/registry",
 	 "dojo/_base/connect", 
 	 "exports",
 	 "dojo/domReady!"], 
 	 
 	 function(dom,domConstruct, Dialog, Button,TextBox,ValidationTextBox, win, lang, registry, connect) {
	 		
 		var _privMember = null;
 			
 		var LoginControllerProxy_getUsuarioLogado_CallBack_ON_RIDE_DLG = function(dwrResponse){
 			console.debug("login_module_interface.js -> var LoginControllerProxy_getUsuarioLogado_CallBack_ON_RIDE_DLG = function(dwrResponse){... dwrResponse="+dwrResponse);
 			console.debug("login_module_interface.js -> dwrResponse = "+dwrResponse);
 		
 			if(dwrResponse == null || dwrResponse == "undefined"){
 				registry.byId("loginDlg").show(); 			
 			}else{
 				registry.byId("loginDlg").destroyRecursive();
 				_atualizaLoginWidget(dwrResponse);	
 			}
 			
 		};
 		
 		var LoginControllerProxy_getUsuarioLogado_ErrorHandler_ON_RIDE_DLG = function(){
 			registry.byId("loginDlg").show();
 		};
 		
 		/*
 		 * tem que lembrar que aqui he qdo entra na app,
 		 * nao tem dlg criado ainda que tenha sido mostrado antes
 		 */
 		var LoginControllerProxy_getUsuarioLogado_CallBack_AOENTRAR_NA_APP = function(dwrResponse){
 			console.debug("login_module_interface.js -> var LoginControllerProxy_getUsuarioLogado_CallBack_AOENTRAR_NA_APP = function(dwrResponse){... dwrResponse="+dwrResponse);
 			console.debug("login_module_interface.js -> var LoginControllerProxy_getUsuarioLogado_CallBack_AOENTRAR_NA_APP -> dwrResponse = "+dwrResponse);
 		
 			if(dwrResponse == null || dwrResponse == "undefined"){
 				//registry.byId("loginDlg").show();
 				_showLoginDialog();
 			}else{
 				//registry.byId("loginDlg").destroyRecursive();
 				_atualizaLoginWidget(dwrResponse);	
 			}
 			
 		};

 		var _atualizaLoginWidget = function(nomeDoUsuarioLogado){
 			console.debug("login_module_interface.js -> var _atualizaLoginWidget = funcrion(dwrResponse){..."); 			

 			var usuarioLogadoNode = document.getElementById("usuarioLogado");
			var link_logoffNode = document.getElementById("link_logoff");
			console.log("usuarioLogadoNode = " + usuarioLogadoNode);
			console.log("link_logoffNode = "+ link_logoffNode);
 			
			usuarioLogadoNode.innerHTML = nomeDoUsuarioLogado;
			link_logoffNode.innerHTML = "logoff"; 			
 		};
 		
		var _CallBackFor_LoginControllerProxy_getUsuarioLogado = function(dwrResponse) {
			console.debug("\n one_page_app_index_setup -> __CallBackFor_LoginControllerProxy_getUsuarioLogado -> ...");
			console.log("LoginControllerProxy_getUsuarioLogado_CallBack response=" + dwrResponse);
			console.log("response = " + dwrResponse);
	
			var usuarioLogadoNode = document.getElementById("usuarioLogado");
			var link_logoffNode = document.getElementById("link_logoff");
			console.log("usuarioLogadoNode = " + usuarioLogadoNode);
			console.log("link_logoffNode = +link_logoffNode");
	
			if( typeof response == "string") {
				registry.byId("loginDlg").destroyRecursive();
				usuarioLogadoNode.innerHTML = response;
				link_logoffNode.innerHTML = "logoff";
			} else {
				usuarioLogadoNode.innerHTML = "NENHUM";
				link_logoffNode.innerHTML = "logoff";
				registry.byId("loginDlg").show();
				console.log("response typeof String = false");
			}	
	
		};
 		
		var btnOK_of_LoginDlg_Action_CallBack = function(dwrResponse) {
			console.debug("var btnOK_of_LoginDlg_Action_CallBack = function(dwrResponse) {...  dwrResponse = "+dwrResponse);

			var loginDlg = registry.byId("loginDlg");
			console.debug(loginDlg);
			//usuario pode ter logado com sucesso ou nao...
			if(dwrResponse){
				console.debug("logou com sucesso");
				console.debug("destruindo loginDlg atualizando a pagina");
				_destroyLoginDialog();
				_atualizaLoginWidget(dwrResponse[0]);
			}else{
				console.debug("nao logou com sucesso");
				console.debug("mostrando login dlg de novo");
				alert("login nao realizado!");
			}
			

		};
		
		var btnOK_of_LoginDlg_Action = function() {
			nomeDoUsuario = registry.byId("txtFd_Usuario").get("value");
			senha = registry.byId("txtFd_Senha").get("value");
			//login pode ter logado com sucesso ou nao, essa logica ta no
			//btnOK_of_LoginDlg_Action_CallBack
			LoginControllerProxy.login(nomeDoUsuario, senha, btnOK_of_LoginDlg_Action_CallBack);
		};
		
		
		var _destroyLoginDialog = function() {
			registry.byId("loginDlg").destroyRecursive();
		};
		
		var _showLoginDialog = function() {
			console.debug("one_page_app_index_setup ->  _showLoginDialog = function(){...");		
			console.debug("login_module_interface.js -> _showLoginDialog : console.debug(win.body());");
			console.debug(win.body());

//			var loginDlgExist = registry.byId("loginDlg");
//			console.log("console.log(loginDlgExist);...");
//			console.log(loginDlgExist);
			//if(loginDlgExist) loginDlgExist.destroy();

			var txtFd_Usuario = new ValidationTextBox({
				id : "txtFd_Usuario",
				required : true,
				lowercase : true,
				onChange : function() {
				},
				class : "medium",
				//promptMessage:"Digite seu nome de usuario"
				trim : "true"
			});

			var txtFd_Senha = new TextBox({
				id : "txtFd_Senha",
				type : "password"
			});
			
			var btnOk = new Button({
				label : "OK",
				onClick : btnOK_of_LoginDlg_Action
			});
			
			var loginDlg = new Dialog({
				id : 'loginDlg',
				title : 'Login',
				content : "",
				//onHide: LoginControllerProxy.getUsuarioLogado(function(){console.log("onHide!!!")})
				onHide : function() {
					console.debug("login_module_interface.js -> loginDlg Widget onHide event callback!!!");
					//se o usuario quer fechar, ele simplesmente nao consegue
					//ele tem que logar com sucesso pra isso acontecer
					
					//a melhor forma de saber se o usuario 
					//he verificar se tem um usuario logado
					
					//bom, pela logica entao, se tiver um usario logado,
					//deixa fechar ajanela se nao, mostra ela de novo
					//essa logica fica na fc
					//LoginControllerProxy_getUsuarioLogado_CallBack_ON_RIDE_DLG
					LoginControllerProxy.getUsuarioLogado({
							callback: LoginControllerProxy_getUsuarioLogado_CallBack_ON_RIDE_DLG,
							errorHandler: LoginControllerProxy_getUsuarioLogado_ErrorHandler_ON_RIDE_DLG
							});
					
					//just a hack when get the error:
					//engine.js (linha 1081)					
					//No data received from server

					//quando o erro nao ocorre, os callback do dwr rodam e esse metodo onHide nao chega ate aqui
					//mas quando erro o corre os callback do dwr nao rodam e esse pedaco de codigo roda
					console.debug("onHide, pos tratamento do dwr");
					registry.byId("loginDlg").show();
					console.debug("hackzinho rodou:login_module_interface.js -> loginDlg Widget onHide event callback!!!");
				}
			});

			var br = domConstruct.create("div", {
				innerHTML : "<br></br>"
			});

			var lbUsuario = domConstruct.create("div", {
				innerHTML : "Usuario:"
			});
			loginDlg.containerNode.appendChild(lbUsuario);
			loginDlg.containerNode.appendChild(txtFd_Usuario.domNode);
			loginDlg.containerNode.appendChild(br);

			var lbSenha = domConstruct.create("div", {
				innerHTML : "Senha:"
			});
			loginDlg.containerNode.appendChild(lbSenha);
			loginDlg.containerNode.appendChild(txtFd_Senha.domNode);
			loginDlg.containerNode.appendChild(br);

			loginDlg.containerNode.appendChild(btnOk.domNode);
			loginDlg.startup();
			loginDlg.show();
		};
		
 		
 		var _login_DwrImpl = function(){
 			//se tiver um usuario logado, nao precisa mostrar a 
 			//dlg login, he so atualizar a pagina
 			
 			//entoa precisa ver se tem ou nao, fica o restante dessa logina em
 			//LoginControllerProxy_getUsuarioLogado_CallBack_AOENTRAR_NA_APP
 			LoginControllerProxy.getUsuarioLogado(LoginControllerProxy_getUsuarioLogado_CallBack_AOENTRAR_NA_APP);		
		};
				
		var _logoff_DwrImpl = function (){		
			LoginControllerProxy.logoff(
				function(DwrResponse){
					console.debug("\n one_page_app_index_setup -> _logoff_DwrImpl -> LoginControllerProxy.logoff(... -> callbackFn -> ...");
					console.debug("\n one_page_app_index_setup -> _logoff_DwrImpl -> LoginControllerProxy.logoff(... -> callbackFn -> ... DwrResponse="+DwrResponse);
 					document.getElementById("usuarioLogado").innerHTML = "[ usuario fez logoff ]";
 					var loginDlg = registry.byId("loginDlg"); 					
					if(DwrResponse == null) {						
						if(!loginDlg) {
							_showLoginDialog(); //esse if he pra preveir criar uma coisa que ja existe
						}
					}
			});
		};

		var _getCurrentUser_DwrImpl = function(){
			LoginControllerProxy.getUsuarioLogado(function(response) {
				if(!response) {
					showLoginDialog();
				} else {
					document.getElementById("usuarioLogado").innerHTML = response;					
				}
			});
		};
//
//		//INFRASTRUCTURE METHODS FOR DWR METHODS IMPLEMENTATIONS		
//		
//
//		
//
//	

//	exports.login_interface.login;
//	exports.login_interface.logoff;
//	exports.login_interface.getCurrentUser;
//	
//	return exports;
 		
 		return { 			
 			login : function(usuario, senha) { 				
 				console.debug("login_module_interface.js -> login : function(usuario, senha) {...");
 				console.debug("login_module_interface.js -> login : console.debug(win.body());");
 				console.debug(win.body());
 				_login_DwrImpl(usuario, senha);
 			},
 			logoff : function() {
				console.debug("login_module_interface.js -> logoff : function() {");
 				console.debug("login_module_interface.js -> logoff : console.debug(win.body());");
 				console.debug(win.body());
				
				_logoff_DwrImpl();
 			},
			getCurrentUser : function() {
				console.debug("login_module_interface.js -> getCurrentUser : function(){...");
				return _getCurrentUser_DwrImpl();
			},
			getPrivMember : function(){
				return _privMember;
			},
			setPrivMember : function(aInt){
				_privMember = aInt;
			}
 			
 		}//return
});

	//var _showLoginDialog = function(){
	//}//return function(){
	//export login_interface;

			//SOME VALIDATIONS METHODS, FOR REFERENCE
      				    	//min:-20000, max:+20000,
      				    	//places:0,
      				    	//regExpGen: dojo.regexp.integer,
      				    	//regExpGen="dojo.regexp.realNumber"
      				    	
      						//regExpGen="dojo.regexp.realNumber"
							//trim="true"
							//required="true"
							//constraints="{exponent:true}"
							//invalidMessage="Number must be in exponential notation. Example +5E-28" />
					
							//regExp:"[\\w]+", 
							//invalidMessage:"Espa&ccedil;os entre caracteres n&atilde;o s&atilde;o permitidos!	",
					
      				    	//required regExp="^[A-Za-z0-9]{4,}$"
            				//promptMessage="Username must be letters and numbers
                			//only, and at least 4 characters long">
      				    	
      				    	//editOptions:{pattern:'#,##0'},
							//invalidMessage: "Invalid elevation.",
