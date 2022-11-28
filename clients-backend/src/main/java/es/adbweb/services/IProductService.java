package es.adbweb.services;

import java.util.List;

import es.adbweb.entity.Product;

public interface IProductService {

	public List<Product> findAll();

	public Product findById(Long id);

	public Product save(Product product);

	public void delete(Long id);

}
