package com.projeto.rastreamento_de_gastos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.rastreamento_de_gastos.dto.GraficoDTO;
import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.services.estatistica.EstatisticaService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/estatistica")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EstatisticaController {

    private final EstatisticaService estatisticaService;

    @GetMapping("/chart")
    public ResponseEntity<GraficoDTO> getChartDetails(HttpSession session) {
        // Verificando se a requisição está chegando aqui
        System.out.println("Chamando o método pegarChartData");
        
        // Recupera o usuarioId da sessão
            Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");
    
        if (usuarioLogado == null) {
            return ResponseEntity.status(401).body(null);  // Caso não tenha usuário na sessão
        }
    
        try {
            
            // Passa o usuarioId para o serviço para filtrar os dados
            return ResponseEntity.ok(estatisticaService.pegarChartData(usuarioLogado.getId()));
        } catch (NumberFormatException e) {
            // Retorna erro caso a conversão falhe
            return ResponseEntity.status(400).body(null);
        }
    }
    
    @GetMapping
    public ResponseEntity<?> pegarEstatistica(HttpSession session) {
        // Recupera o usuarioId da sessão
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");
    
        if (usuarioLogado == null) {
            return ResponseEntity.status(401).body(null);  // Caso não tenha usuário na sessão
        }
    
        try {            
            // Passa o usuarioId para o serviço para filtrar os dados
            return ResponseEntity.ok(estatisticaService.pegarEstatistica(usuarioLogado.getId()));
        } catch (NumberFormatException e) {
            // Retorna erro caso a conversão falhe
            return ResponseEntity.status(400).body(null);
        }
    }
}
