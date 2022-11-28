/**
 * 
 */
package es.adbweb.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	@GetMapping("/invoices/{id}")
	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@ResponseStatus(HttpStatus.OK)
	public Invoice show(@PathVariable Long id) {
		return invoiceService.findById(id);
	}

}
