/**
 * 
 */
package es.adbweb.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.adbweb.entity.Invoice;
import es.adbweb.models.dao.IInvoiceDao;
import es.adbweb.services.IInvoiceService;

/**
 * Implementacion de la factura
 * 
 * @author adolfob
 *
 */

@Service
public class IInvoiceServiceImpl implements IInvoiceService {

	@Autowired
	private IInvoiceDao invoiceDao;

	@Override
	@Transactional(readOnly = true)
	public List<Invoice> findAll() {
		return invoiceDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Invoice findById(Long id) {
		return invoiceDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Invoice save(Invoice invoice) {
		return invoiceDao.save(invoice);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		invoiceDao.deleteById(id);

	}

	@Override
	@Transactional(readOnly = true)
	public Page<Invoice> findAll(Pageable pageable) {
		return invoiceDao.findAll(pageable);
	}

}
