package es.adbweb.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.adbweb.entity.Client;
import es.adbweb.services.IClientService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class ClientRestController {

	@Autowired
	private IClientService clientService;

	/**
	 * Muestra todos los clientes en la bd
	 * @return
	 */
	@GetMapping("/clients")
	@ResponseStatus(HttpStatus.OK)
	public List<Client> index() {
		return clientService.findAll();

	}

	/**
	 * Muestra un cliente por su id
	 * @param id
	 * @return
	 */
	@GetMapping("/clients/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Client show(@PathVariable Long id) {
		return clientService.findById(id);
	}

	/**
	 * Crea un nuevo cliente desde la base de datos
	 * @param client
	 * @return
	 */
	@PostMapping("/clients")
	@ResponseStatus(HttpStatus.CREATED) // Si no se pone un estado devuelve OKI con el 200
	public Client create(@RequestBody Client client) {
		return clientService.save(client);
	}
	
	/**
	 * Actualiza un  c l i e n t e  por su id en la bd
	 * @param id
	 * @param client
	 * @return
	 */
	@PutMapping("/clients/{id}")
	public Client update(@PathVariable Long id, @RequestBody Client client) {
		Client oldClient =  clientService.findById(id);
		oldClient.setName(client.getName());
		oldClient.setSurname1(client.getSurname1());
		oldClient.setSurname2(client.getSurname2());
		oldClient.setEmail(client.getEmail());
		return clientService.save(oldClient);
	}
	
	/**
	 * Elimina un cliente de la base de datos
	 * @param id
	 */
	@DeleteMapping("/clients/{id}")
	public void delete(Long id) {
		clientService.delete(id);
	}

}
