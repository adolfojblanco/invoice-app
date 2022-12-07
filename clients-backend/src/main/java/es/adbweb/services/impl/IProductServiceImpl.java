package es.adbweb.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.adbweb.entity.Product;
import es.adbweb.models.dao.IProductDao;
import es.adbweb.services.IProductService;

@Service
public class IProductServiceImpl implements IProductService {

	@Autowired
	private IProductDao productDao;

	@Override
	@Transactional(readOnly = true)
	public List<Product> findAll() {
		return productDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Product findById(Long id) {
		return productDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Product save(Product product) {
		return productDao.save(product);
	}
	
	/**
	 * Elimina un cliente
	 */
	@Override
	@Transactional
	public void delete(Long id) {
		productDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Product> findByName(String term) {
		return productDao.findByNameContainingIgnoreCase(term);
	}

}
