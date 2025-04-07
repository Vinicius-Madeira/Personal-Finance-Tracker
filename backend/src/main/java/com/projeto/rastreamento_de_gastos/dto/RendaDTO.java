package com.projeto.rastreamento_de_gastos.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class RendaDTO {
    private Long id;

    private String titulo;

    private Integer valor;

    private LocalDate data;

    private String categoria;

    private String descricao;

    private Long usuarioId;
}
