package com.projeto.rastreamento_de_gastos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.rastreamento_de_gastos.dto.GraficoDTO;
import com.projeto.rastreamento_de_gastos.services.estatistica.EstatisticaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/estatistica")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EstatisticaController {

    private final EstatisticaService estatisticaService;

    @GetMapping("/chart")
    public ResponseEntity<GraficoDTO> getChartDetails(){
        return ResponseEntity.ok(estatisticaService.pegarChartData());
    }

    @GetMapping
    public ResponseEntity<?> pegarEstatistica(){
        return ResponseEntity.ok(estatisticaService.pegarEstatistica());
    }
}
