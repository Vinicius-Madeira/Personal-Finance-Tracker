package com.projeto.rastreamento_de_gastos.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projeto.rastreamento_de_gastos.entity.Usuario;

@Repository
public interface UsuarioDao extends JpaRepository<Usuario, Long> {

    @Query("select i from Usuario i where i.email = :email")
    public Usuario findByEmail(String email);

    @Query("select j from Usuario j where j.user = :user and j.senha = :senha")
    public Usuario buscarLogin(String user, String senha);

    @Query("select u from Usuario u where u.user = :user")
    public Usuario findByUser(String user);


}
