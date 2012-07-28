package br.edu.fzlbpms.template.security.login;

import java.io.Serializable;

import java.util.List;
import java.util.logging.Logger;

public class LoginControllerFacade implements Serializable{
	Logger logger = Logger.getLogger("br.edu.fzlbpms.template.security.login.LoginControllerFacade");

	/**
	 * 
	 */
	private static final long serialVersionUID = -6034322443719915272L;
	
	
	private LoginControllerProxy loginControllerProxy = new LoginControllerProxy();
	
	
	
	//private LoginController loginController;
	public Boolean login(String usuario, String senha){
		logger.info("public boolean login("+ usuario +", "+ senha +"){... ");
		return this.loginControllerProxy.login(usuario, senha);	
	}
	
	public String getLoggedUser(){
		logger.info("public String getLoggedUser(){...");
		return this.loginControllerProxy.getLoggedUser();		
	}

	public void logoff(){
		logger.info("public void logoff(){...");
		this.loginControllerProxy.logoff();
	}
	
	public List<String> getPrivilegies(){
		logger.info("public List<String> getPrivilegies(){...");
		return this.loginControllerProxy.getPrivileges();
	}
	
}//class
