/**
 * 
 */
package es.adbweb.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.adbweb.entity.User;
import es.adbweb.models.dao.IUserDao;
import es.adbweb.services.IUserService;

/**
 * Implementacion del UserService
 * @author adolfob
 *
 */
@Service
public class IUserServiceImpl implements IUserService {
	
	
	@Autowired
	private IUserDao userDao;

	@Override
	@Transactional(readOnly = true)
	public List<User> fndAll() {
		return userDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public User findByUsername(String username) {
		return userDao.findByUsername(username);
	}

}
