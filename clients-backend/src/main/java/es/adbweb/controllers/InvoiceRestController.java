/**
 *
 */
package es.adbweb.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.adbweb.entity.Invoice;
import es.adbweb.services.IInvoiceService;

/**
 * Invoice Controller
 *
 * @author adolfob
 *
 */
@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class InvoiceRestController {
	private final Logger log = LoggerFactory.getLogger(InvoiceRestController.class);

	@Autowired
	private IInvoiceService invoiceService;

	/**
	 * Devuelve todas las facturas de la bd
	 */
	@GetMapping("/invoices")
	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@ResponseStatus(HttpStatus.OK)
	public List<Invoice> index() {
		log.info("Mostrando facturas");
		return invoiceService.findAll();
	}

	/**
	 * Return invoice from id
	 * 
	 * @param id
	 * @return invoice
	 */
	@GetMapping("/invoices/{id}")
	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> show(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		Invoice invoice = null;

		try {
			invoice = invoiceService.findById(id);
		} catch (DataAccessException e) {
			response.put("message", "Se produjo un error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		if (invoice == null) {
			response.put("message", "No existe una factura con ese id");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Invoice>(invoice, HttpStatus.OK);
	}

	/**
	 * Eliminar un factura
	 * 
	 * @param id
	 */
	@DeleteMapping("/invoices/{id}")
	@Secured({ "ROLE_ADMIN" })
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			invoiceService.delete(id);
		} catch (DataAccessException e) {
			response.put("message", "Hubo un error al eliminar la factura");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Se elimino correctaente");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

	}

}
