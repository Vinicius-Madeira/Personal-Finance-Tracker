package com.projeto.rastreamento_de_gastos.entity;

import java.time.LocalDate;

import com.projeto.rastreamento_de_gastos.dto.RendaDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Renda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private Integer valor;

    private LocalDate data;

    private String categoria;

    private String descricao;

    public RendaDTO pegarRendaPeloID(){
        RendaDTO rendaDTO = new RendaDTO();

        rendaDTO.setId(id);
        rendaDTO.setTitulo(titulo);
        rendaDTO.setValor(valor);
        rendaDTO.setCategoria(categoria);
        rendaDTO.setDescricao(descricao);
        rendaDTO.setData(data);

        return rendaDTO;
    }

}
