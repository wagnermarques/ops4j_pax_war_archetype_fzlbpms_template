/**
 * 
 * @author wagnermarques
 * 
 * dependency dwr avaible in the page
 * Purpose of this module: show a login dialog, but this requisit have some logical issues
 * 
 * 
	
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
 	["dojo/_base/lang",
 	 "dojo/dom",
 	 "dojo/dom-style",
 	 "dojo/on",
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
 	 
 	 function(lang, dom, domStyle, on, domConstruct, Dialog, Button,TextBox,ValidationTextBox, win, lang, registry, connect) {
	 		
 
 		//privide the user a onClick event to the logoff link 
 		//and to login link too
	
		var logoffButton = new Button({
			id :"logoffButton",
			label: "Logoff",
			style: "display:none",
			onClick : function(){
				LoginControllerFacade.logoff(function(){
					dom.byId("fzlbmps_template_logged_user").innerHTML = "Usuario Fez Loggoff";
					registry.byId("logoffButton").domNode.style.display ="none";
					registry.byId("loginButton").domNode.style.display="inline";
				});
			}
		}, dom.byId("fzlbmps_template_logoff_link"));
		
		
		var loginButton = new Button({
			id :"loginButton",
			label: "Login",
			style: "display:none",
			//TODO: Change this way to login again.
			//this is here because my tecnical limitations to deal with javascript contexts
			onClick : function(){
				window.location = "http://localhost:8080/ops4j_pax_war_archetype_fzlbpms_template/";
			}
		},dom.byId("fzlbmps_template_login_link"));
		
 		
 		
 		//
 		//
 		//LoginDialog interface  implemented with dwr
 		//
 		//
 		//LoginControllerFacade.getLoggedUser
 		//LoginControllerFacade.logoff
 		//LoginControllerFacade.getLoggedUser
 		//
 		var _login_DwrImpl = function(){
 			LoginControllerFacade.getLoggedUser(DWRCallBack_for_LoginControllerFacade_getLoggedUser);		
		};
				
		var _logoff_DwrImpl = function (){		
			LoginControllerFacade.logoff(
				function(DwrResponse){
 					document.getElementById("fzlbmps_template_logged_user").innerHTML = "[ user logged off ]"; 					
					_showLoginDialog(); //esse if he pra preveir criar uma coisa que ja existe					
			});
		};

		var _getCurrentUser_DwrImpl = function(){
			LoginControllerFacade.getLoggedUser(DWRCallBack_for_LoginControllerFacade_getLoggedUser);
		};
		

 		//
 		//
 		//LoginDialog interface implemented with dwr (THE CALLBACKS FUNCTIONS)
 		//
		
		var DWRCallBack_for_LoginControllerFacade_getLoggedUser = function(dwrResponse){
	 		
 			if(dwrResponse == null || dwrResponse == "undefined"){
 				registry.byId("loginDlg").show(); 			
 			}else{
 				registry.byId("loginDlg").destroyRecursive();
 				_updateLoginWidget_ON_SUCCESS_LOGIN_CASE(dwrResponse);	
 			}
 			
 		};
  		
 		
 		
 		var DWRCallBack_ErrorHandler_for__LoginControllerFacade_getLoggedUser = function(){
 			registry.byId("loginDlg").show();
 		};
 		
 		 		
 		
 		var _updateLoginWidget_ON_SUCCESS_LOGIN_CASE = function(userNameLoggedIn){
 			console.log("var _updateLoginWidget_ON_SUCCESS_LOGIN_CASE = function("+userNameLoggedIn+"){...")

 			var fzlbmps_template_logged_userNODE = dom.byId("fzlbmps_template_logged_user");
 			fzlbmps_template_logged_userNODE.innerHTML = userNameLoggedIn;
 			
			domStyle.set( registry.byId("logoffButton").domNode  , "display", "inline");										 
			domStyle.set( registry.byId("loginButton").domNode   , "display", "none");
					 
 		};
 		

 		
 		
		//
 		//
 		//
		var _showLoginDialog = function() {

			var txtFd_UserName = new ValidationTextBox({
				id : "txtFd_UserName",
				required : true,
				lowercase : true,
				onChange : function() {
				},
				class : "medium",
				//promptMessage:"Digite seu nome de usuario"
				trim : "true"
			});

			var txtFd_Password = new TextBox({
				id : "txtFd_Password",
				type : "password"
			});
			
			var btnOk = new Button({
				label : "OK",
				onClick : onClik_Function_for_btnOK
			});
			
			var loginDlg = new Dialog({
				id : 'loginDlg',
				title : 'Login',
				content : "",
				//this implements a design decision: no hide without a success login. 
				//don't implement this if you don't want this LoginDialog behavior
				onHide : function() {
					console.debug("LoginDialog.js -> onHide event callback!!!");
					
					//close LoginDialog is ok if the user is already logged in
					//by design theory, if the user is logged in, he(she) should not be vewing this LoginDiaglog
					//but, if it ocurr without a previous prevision the LoginDialog Behaviour shoud be ok
					//lettin the user close the dialog.
					LoginControllerFacade.getLoggedUser({
							callback: DWRCallBack_for_LoginControllerFacade_getLoggedUser,
							errorHandler: DWRCallBack_ErrorHandler_for__LoginControllerFacade_getLoggedUser
					});

					registry.byId("loginDlg").show();
				}
			});

			var br = domConstruct.create("div", {
				innerHTML : "<br></br>"
			});

			var lbUserName = domConstruct.create("div", {
				innerHTML : "Usuario:"
			});
			loginDlg.containerNode.appendChild(lbUserName);
			loginDlg.containerNode.appendChild(txtFd_UserName.domNode);
			loginDlg.containerNode.appendChild(br);

			var lbPassword = domConstruct.create("div", {
				innerHTML : "Senha:"
			});
			loginDlg.containerNode.appendChild(lbPassword);
			loginDlg.containerNode.appendChild(txtFd_Password.domNode);
			loginDlg.containerNode.appendChild(br);

			loginDlg.containerNode.appendChild(btnOk.domNode);
			loginDlg.startup();
			loginDlg.show();
		};

 

		var onClik_Function_for_btnOK = function() {
			var username = registry.byId("txtFd_UserName").get("value");
			var password = registry.byId("txtFd_Password").get("value");
			LoginControllerFacade.login(username, password, onClik_Function_for_btnOK____DWRActionCallBack);
		};

		

		var onClik_Function_for_btnOK____DWRActionCallBack = function(dwrResponse) {

			var loginDlg = registry.byId("loginDlg");

			if(dwrResponse){
				console.debug("login was sucessfull");
				console.debug("so, destroing loginDlg and update page to indicate it");
				var username_loggedin = registry.byId("txtFd_UserName").get("value");							   				
				_destroyLoginDialog();				
				_updateLoginWidget_ON_SUCCESS_LOGIN_CASE(username_loggedin);
			}else{
				console.debug("login fail");
				console.debug("sayin it to the user");
				//TODO i18n message 
				//TODO this message shoud be in the own LoginDialog in red, for example
				alert("usuario ou senha incorretos!");
			}
			
			//TODO:TAKE IT OFF IN PRODUCTION: user privileges:
			console.debug("TAKE IT OFF IN PRODUCTION: user privileges:");
			LoginControllerFacade.getPrivilegies(function(userPrivilegies){
				console.log("userPrivilegies = "+userPrivilegies)
			})
			
			

		};

 		
		
		var _destroyLoginDialog = function() {
			registry.byId("loginDlg").destroyRecursive();
		};
		
		
 		
 		return {
 			showLoginDialog : function(){
 				_showLoginDialog();
 			}, 			
 			login : function(userName, passworkd) { 				
 				_login_DwrImpl(userName, passworkd);
 			},
 			logoff : function() {
				_logoff_DwrImpl();
 			},
			getCurrentUser : function() {
				return _getCurrentUser_DwrImpl();
			}
 			
 		}//return
});
