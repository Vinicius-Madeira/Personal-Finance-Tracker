package com.projeto.rastreamento_de_gastos.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class GastoDTO {
    private Long id;

    private String titulo;

    private String descricao;

    private String categoria;

    private LocalDate data;
    
    private Integer valor;

    private Long usuarioId;
}