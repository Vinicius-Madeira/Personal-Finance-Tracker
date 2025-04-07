package com.projeto.rastreamento_de_gastos.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity 
@Table(name = "usuario")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    private String email;

    @Size(min = 3, max = 20, message = "Usuário deve conter entre 3 a 20 caracteres")
    private String user;

    private String name;
    private String senha;

    public Usuario() {
    }
}

