/**
 * 
 */
package es.adbweb.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Invoice Entity
 * 
 * @author adolfob
 *
 */
@Entity
@Table(name = "invoices")
public class Invoice implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "invoice", "hibernateLazyInitializer", "handler" })
	private Client client;

	private String description;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "invoice_id")
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private List<InvoiceItem> items;

	@Column(name = "created_at")
	@Temporal(TemporalType.DATE)
	private Date createdAt;

	@PrePersist
	public void prePersist() {
		createdAt = new Date();
	}

	public Invoice() {
		this.items = new ArrayList<>();
	}

	/**
	 * Obtiene el total de la factura
	 * 
	 * @return
	 */
	public Double grandTotal() {
		Double total = 0.00;
		for (InvoiceItem item : items) {
			total += item.getTotal();
		}
		return total;
	}

	/**
	 * Getters & Setters
	 */

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public List<InvoiceItem> getItems() {
		return items;
	}

	public void setItems(List<InvoiceItem> items) {
		this.items = items;
	}

	private static final long serialVersionUID = 1L;

}
