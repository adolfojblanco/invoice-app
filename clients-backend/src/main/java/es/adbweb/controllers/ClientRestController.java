package es.adbweb.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.adbweb.entity.Client;
import es.adbweb.services.IClientService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/clients/")
public class ClientRestController {

	@Autowired
	private IClientService clientService;

	@GetMapping("")
	public List<Client> index() {
		return clientService.findAll();

	}

	@GetMapping("{id}")
	public Client show(@PathVariable Long id) {
		return clientService.findById(id);
	}

	@PostMapping("")
	public Client create(@RequestBody Client client) {
		return clientService.save(client);
	}

}
