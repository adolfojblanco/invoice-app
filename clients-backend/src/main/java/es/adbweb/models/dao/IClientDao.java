package es.adbweb.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import es.adbweb.entity.Client;

public interface IClientDao extends JpaRepository<Client, Long> {

}
