package es.adbweb.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import es.adbweb.entity.Product;

public interface IProductDao extends JpaRepository<Product, Long>{

}
