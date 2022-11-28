package es.adbweb.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import es.adbweb.entity.Invoice;

public interface IInvoiceService {
	
	public List<Invoice> findAll();
	
	public Page<Invoice> findAll(Pageable pageable);
	
	public Invoice findById(Long id);
	
	public Invoice save(Invoice invoice);
	
	public void delete(Long id);

}
