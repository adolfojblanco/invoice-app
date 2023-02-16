package es.adbweb.services;

import java.util.List;

import es.adbweb.entity.User;

public interface IUserService {
	
	public List<User> fndAll();
	
	public User findByUsername(String username);
	

}
