package br.edu.fzlbpms.template.security.login;

import java.util.List;

public class LoginControllerProxy {
	
	
	
	//change this controller for yours
	private LoginController logginController = new LoginController();
			
	
	
	//this List of string is for receive user privileges
	public boolean login(String usuario, String senha) {
		return logginController.login(usuario, senha);
	}

	public String getLoggedUser() {		
		return logginController.getLoggedUser();
	}

	public void logoff() {		
		logginController.logoff();
	}
	
	public List<String> getPrivileges(){
		return this.logginController.getPrivileges();
	}
	
}//class
