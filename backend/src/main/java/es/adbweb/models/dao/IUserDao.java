package es.adbweb.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import es.adbweb.entity.User;

public interface IUserDao extends JpaRepository<User, Long> {
	
	public User findByUsername(String username);
	
	

}
