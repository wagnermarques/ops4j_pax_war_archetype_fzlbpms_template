package br.edu.fzlbpms.template.model;

import java.util.Collection;

public class User {

	private String name;
	private Collection<String> privileges;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Collection<String> getPrivileges() {
		return privileges;
	}
	public void setPrivileges(Collection<String> privileges) {
		this.privileges = privileges;
	}
	
	
}
