package com.projeto.rastreamento_de_gastos.dto;

import java.util.List;

import com.projeto.rastreamento_de_gastos.entity.Gasto;
import com.projeto.rastreamento_de_gastos.entity.Renda;

import lombok.Data;

@Data
public class GraficoDTO {

    private List<Gasto> listaGasto;

    private List<Renda> listaRenda;
}
