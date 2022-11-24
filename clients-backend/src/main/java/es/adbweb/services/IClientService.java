package es.adbweb.services;

import java.util.List;

import es.adbweb.entity.Client;

public interface IClientService {
	
	public List<Client> findAll();
	
	public Client findById(Long id);
	
	public Client save(Client client);
	
	public void delete(Long id);

}
