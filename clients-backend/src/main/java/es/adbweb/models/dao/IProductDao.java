package es.adbweb.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import es.adbweb.entity.Product;

public interface IProductDao extends JpaRepository<Product, Long>{
	
	@Query("select p from Product p where p.name like %?1%")
	public List<Product> findByName(String term);
	
	
	public List<Product> findByNameContainingIgnoreCase(String term);
	
	public List<Product> findByNameStartingWithIgnoreCase(String term);
	

}
