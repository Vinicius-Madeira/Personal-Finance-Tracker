package com.projeto.rastreamento_de_gastos.dto;

import com.projeto.rastreamento_de_gastos.entity.Gasto;
import com.projeto.rastreamento_de_gastos.entity.Renda;

import lombok.Data;

@Data
public class EstatisticaDTO {

    private Double renda;

    private Double gasto;

    private Renda ultimaRenda;

    private Gasto ultimoGasto;

    private Double balanço;

    private Double minRenda;

    private Double minGasto;

    private Double maxRenda;

    private Double maxGasto;
}
