package com.projeto.rastreamento_de_gastos.dto;

public class GastoPorCategoria {
    private String categoria;
    private double valor;

    // Construtores, getters e setters
    public GastoPorCategoria(String categoria, double valor) {
        this.categoria = categoria;
        this.valor = valor;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
