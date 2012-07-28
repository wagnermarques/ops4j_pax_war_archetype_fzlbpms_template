package br.edu.fzlbpms.template.security.login;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import br.edu.fzlbpms.template.model.User;


/**
 * This is in a template project.
 * The real controller must be provided.
 * The spring framework is recomended to inject one.
 * @author wagner
 *
 */
public class LoginController {
	Logger logger = Logger.getLogger("br.edu.fzlbpms.template.security.login.LoginController");
	
	private User loggedUser;
	
	private Map<String, String> userDatabase = new HashMap<String, String>();
	private Map<String, List<String>> userPrivilegesDatabase = new HashMap<String, List<String>>();
	
	{
		
		this.userDatabase.put("admin", "admin123");
		
		ArrayList<String> adminPrivileges = new ArrayList<String>();
		adminPrivileges.add("admin");
		adminPrivileges.add("developer");
		adminPrivileges.add("another_priv");		
		this.userPrivilegesDatabase.put("admin", adminPrivileges );		
				
	}
	
	
	
	public void logoff() {
		this.loggedUser = null;
	}

	public String getLoggedUser() {		
		return (null != this.loggedUser)? this.loggedUser.getName() : null;
	}

	//NO PRIVILEGES MUST MEAN (IN THE CLIEND) A FAILURE LOGIN
	public Boolean login(String usuario, String senha){
		logger.info("LoginController: public Boolean login("+ usuario +", "+ senha +"){...");		
		
		if (userDatabase.containsKey(usuario) && userDatabase.get(usuario).equals(senha)){
			User u = new User();
			u.setName(usuario);
			this.loggedUser = u;
			u.setPrivileges(this.userPrivilegesDatabase.get(usuario));
			return true;
		}else{
			return false;
		}
	}
		
	public List<String> getPrivileges(){
		if(null != this.loggedUser) {
			return (List<String>) this.loggedUser.getPrivileges();
		}else{
			return null;
		}
	}
	
}//class


