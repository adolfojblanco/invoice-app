package es.adbweb.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import es.adbweb.entity.Product;
import es.adbweb.services.IProductService;

import javax.validation.Valid;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class ProducRestController {

	@Autowired
	private IProductService productService;
	private final Logger log = LoggerFactory.getLogger(ProducRestController.class);

	/**
	 * Devuelve todos los productos de la bd
	 */
	@GetMapping("/products")
	@ResponseStatus(HttpStatus.OK)
	public List<Product> index() {
		return productService.findAll();
	}

	/**
	 * Resgistra un producto en la bd
	 * 
	 * @param product
	 * @param result
	 * @return product
	 */
	@PostMapping("/products")
	@Secured({ "ROLE_ADMIN" })
	public ResponseEntity<?> create(@Valid @RequestBody Product product, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		Product newProduct = null;

		/**
		 * Si tenemos algun error
		 */
		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo " + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			newProduct = productService.save(product);
		} catch (DataAccessException e) {
			response.put("message", "Se produjo un error al crear el producto");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("message", "Producto registrado correctamente");
		// response.put("product", newProduct);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@GetMapping("/products/filter/{term}")
	public List<Product> filterProducts(@PathVariable String term) {
		return productService.findByName(term);
	}

	/**
	 * Elimina un producto de la BD.
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping("/products/{id}")
	@Secured({ "ROLE_ADMIN" })
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			productService.delete(id);
		} catch (DataAccessException e) {
			response.put("message", "Se produjo un error al eliminar el producto");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Producto eliminado correctamente");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	/**
	 * Busca un producto por su id en la bd
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/products/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		Product product = null;
		try {
			product = productService.findById(id);
		} catch (DataAccessException e) {
			response.put("message", "Se produjo un error al consultar en la bd");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (product == null) {
			response.put("message",
					"El producto con el id: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		response.put("product", product);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	/**
	 * Busca un producto en la BD por el nombre
	 * 
	 * @return
	 */

	@GetMapping("/products/search/{term}")
	public List<Product> searchProduts(@PathVariable String term) {
		return productService.findByName(term);
	}

}
