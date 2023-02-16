/**
 * 
 */
package es.adbweb.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import es.adbweb.entity.Invoice;

/**
 * Dao for invoice
 * @author adolfob
 */

public interface IInvoiceDao extends JpaRepository<Invoice, Long> {

}
