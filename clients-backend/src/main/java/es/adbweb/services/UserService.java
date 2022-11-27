package es.adbweb.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.adbweb.models.dao.IUserDao;

@Service
public class UserService implements UserDetailsService {
	private Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private IUserDao userDao;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		es.adbweb.entity.User user = userDao.findByUsername(username);
		if (user == null) {
			logger.error("No existe el usuario");
			throw new UsernameNotFoundException("Error en el login: usuario no registrado");
		}

		/**
		 * Convertimos los roles a SimpleGrantedAuthority y se lo pasamos al objeto de usuario de spring
		 */
		List<GrantedAuthority> authorities = user.getRoles()
				.stream()
				.map(role -> new SimpleGrantedAuthority(role.getName()))
				.collect(Collectors.toList());

		return new User(user.getUsername(), user.getPassword(), user.getEnabled(), true, true, true, authorities);
	}

}
