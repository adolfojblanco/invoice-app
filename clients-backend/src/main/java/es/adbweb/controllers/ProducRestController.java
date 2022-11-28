package es.adbweb.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.adbweb.entity.Product;
import es.adbweb.services.IProductService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class ProducRestController {
	
	@Autowired
	private IProductService productService;
	
	
	/**
	 * Devuelve todos los productos de la bd
	 */
	@GetMapping("/products")
	@ResponseStatus(HttpStatus.OK)
	public List<Product> index(){
		return productService.findAll();
	}
	
	

}
