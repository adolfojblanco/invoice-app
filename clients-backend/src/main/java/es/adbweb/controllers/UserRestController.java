package es.adbweb.controllers;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.adbweb.entity.User;
import es.adbweb.services.IUserService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class UserRestController {
	
	@Autowired
	private IUserService userService;
	
	
	/**
	 * Show all users 
	 * @return List<User>
	 */
	@GetMapping("/users")
	@RolesAllowed("ROLE_ADMIN")
	public List<User> index() {
		return userService.fndAll();
	}
	
	
	

}
