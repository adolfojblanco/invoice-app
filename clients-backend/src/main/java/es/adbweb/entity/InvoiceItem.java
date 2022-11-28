/**
 * 
 */
package es.adbweb.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author adolfob
 *
 */
@Entity
@Table(name = "invoice_items")
public class InvoiceItem implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Integer quantity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private Product product;

	/**
	 * Obtener el total del producto
	 * @return
	 */
	public Double getTotal() {
		return quantity.doubleValue() * this.product.getPrice();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	private static final long serialVersionUID = 1L;

}
