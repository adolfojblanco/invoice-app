package es.adbweb.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.adbweb.entity.Client;
import es.adbweb.models.dao.IClientDao;

@Service
public class IClientServiceImpl implements IClientService {

	@Autowired
	private IClientDao clientDao;

	/**
	 * Devueve todos los elementos de la bd
	 */
	@Override
	@Transactional(readOnly = true)
	public List<Client> findAll() {
		return clientDao.findAll();
	}

	/**
	 * Devuelve un cliente por su id
	 */

	@Override
	@Transactional(readOnly = true)
	public Client findById(Long id) {
		return clientDao.findById(id).orElse(null);
	}

	/**
	 * Guarda un cliente en la base de datos
	 */
	@Override
	@Transactional
	public Client save(Client client) {
		return clientDao.save(client);
	}

	/**
	 * Elimina un cliente
	 */
	@Override
	@Transactional
	public void delete(Long id) {
		clientDao.deleteById(id);
	}

}
