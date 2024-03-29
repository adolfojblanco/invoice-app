package es.adbweb.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import es.adbweb.entity.Client;
import es.adbweb.services.IClientService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class ClientRestController {

	@Autowired
	private IClientService clientService;
	private final Logger log = LoggerFactory.getLogger(ClientRestController.class);

	/**
	 * Muestra todos los clientes en la bd
	 * 
	 * @return
	 */
	@GetMapping("/clients")
	@ResponseStatus(HttpStatus.OK)
	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	public List<Client> index() {
		return clientService.findAll();
	}

	/**
	 * Muestra todos los clientes paginados de 10 en 10 desde la bd
	 * 
	 * @return
	 */
	@GetMapping("/clients/page/{page}")
	@ResponseStatus(HttpStatus.OK)
	@Secured({ "ADMIN", "ROLE_USER" })
	public Page<Client> index(@PathVariable Integer page) {
		return clientService.findAll(PageRequest.of(page, 10));
	}

	/**
	 * Muestra un cliente por su id
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/clients/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		Client client = null;
		try {
			client = clientService.findById(id);
		} catch (DataAccessException e) {
			/* Sihubo un error en la base de datos */
			response.put("message", "Se produjo error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		/* Si el cliente no existe */
		if (client == null) {
			response.put("message",
					"El cliente con el id: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Client>(client, HttpStatus.OK);
	}

	/**
	 * Crea un nuevo cliente desde la base de datos
	 * 
	 * @param client
	 * @return client
	 */
	@PostMapping("/clients")
	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	public ResponseEntity<?> create(@Valid @RequestBody Client client, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		Client newClient = null;

		if (result.hasErrors()) {
//			List<String> errors = new ArrayList<>();
//			
//			for (FieldError err : result.getFieldErrors()) {
//				errors.add("El campo " + err.getField() + "' "+ err.getDefaultMessage());
//			}
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo " + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			newClient = clientService.save(client);
		} catch (DataAccessException e) {
			response.put("message", "Se produjo error al insertar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Se registro correctamente el cliente");
		response.put("client", newClient);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	/**
	 * Actualiza un  c l i e n t e  por su id en la bd
	 * 
	 * @param id
	 * @param client
	 * @return
	 */
	@PutMapping("/clients/{id}")
	@Secured({ "ROLE_ADMIN" })
	public ResponseEntity<?> update(@Valid @PathVariable Long id, @RequestBody Client client, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		Client oldClient = clientService.findById(id);
		Client updateClient = null;

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo " + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		if (oldClient == null) {
			response.put("message", "El cliente con el id: ".concat(id.toString().concat(" no existe")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			oldClient.setName(client.getName());
			oldClient.setSurname1(client.getSurname1());
			oldClient.setSurname2(client.getSurname2());
			oldClient.setEmail(client.getEmail());
			oldClient.setCreatedAt(oldClient.getCreatedAt());
			updateClient = clientService.save(oldClient);
		} catch (DataAccessException e) {
			response.put("message", "Se produjo error al insertar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Se actualizo correctamente el cliente");
		response.put("client", updateClient);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	/**
	 * Elimina un cliente de la base de datos
	 * 
	 * @param id
	 */
	@DeleteMapping("/clients/{id}")
	@Secured({ "ROLE_ADMIN" })
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Client client = clientService.findById(id);
			String lastImage = client.getImage();

			/** Si tiene imagen la eliminamos **/

			if (lastImage != null && lastImage.length() > 0) {
				Path fileRouteLastImage = Paths.get("uploads/clients").resolve(lastImage).toAbsolutePath();
				File fileLastImage = fileRouteLastImage.toFile();
				if (fileLastImage.exists() && fileLastImage.canRead()) {
					fileLastImage.delete();
				}
			}
			clientService.delete(id);
		} catch (DataAccessException e) {
			response.put("message", "Se produjo error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Se elimino correctamente el cliente");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	/**
	 * Subida de imagen del cliente
	 * 
	 * @param file
	 * @param id
	 * @return
	 */
	@PostMapping("clients/upload")
	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @RequestParam Long id) {
		Map<String, Object> response = new HashMap<>();
		Client client = clientService.findById(id);
		log.info("Iniciando subida de imagen...");
		if (client == null) {
			response.put("message", "El cliente con el id: ".concat(id.toString().concat(" no existe")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		if (!file.isEmpty()) {
			String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename(); // Obtiene el nombre del
																								// archivo.
			Path fileRoute = Paths.get("uploads/clients").resolve(fileName).toAbsolutePath(); // Ruta donde se guarda la
																								// imagen.
			try {
				Files.copy(file.getInputStream(), fileRoute); // Mueve el archivo del servidor a la ruta escogida
			} catch (IOException e) {
				e.printStackTrace();
				response.put("message", "Se produjo error al subir la imagen");
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			String lastImage = client.getImage();
			if (lastImage != null && lastImage.length() > 0) {
				Path fileRouteLastImage = Paths.get("uploads/clients").resolve(lastImage).toAbsolutePath();
				File fileLastImage = fileRouteLastImage.toFile();
				if (fileLastImage.exists() && fileLastImage.canRead()) {
					fileLastImage.delete();
				}
			}
			/* Se guargda la foto */
			client.setImage(fileName.toLowerCase());
			clientService.save(client);
			response.put("message", "Se agrego correctamente");
			response.put("client", client);
			log.info("Finalizando subida de imagen...");
		}
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	/**
	 * Mostrar la imagen del cliente
	 */
	@GetMapping("clients/image/{image:.+}")
	public ResponseEntity<Resource> showImage(@PathVariable String image) {
		Path fileRoute = Paths.get("uploads/clients").resolve(image).toAbsolutePath();
		Resource resource = null;
		try {
			resource = new UrlResource(fileRoute.toUri());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}

		if (!resource.exists() && !resource.isReadable()) {
			//throw new RuntimeException("Error no se pudo cargar la imagen: " + image);
		}

		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename:\"" + resource.getFilename() + "\"");

		return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
	}

}
