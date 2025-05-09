package com.projeto.rastreamento_de_gastos.controller;

import com.projeto.rastreamento_de_gastos.dto.EstatisticaDTO;
import com.projeto.rastreamento_de_gastos.dto.GraficoDTO;
import com.projeto.rastreamento_de_gastos.services.relatorio.RelatorioService;
import com.projeto.rastreamento_de_gastos.services.estatistica.EstatisticaService;
import com.projeto.rastreamento_de_gastos.entity.Usuario;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class RelatorioController {

    private final RelatorioService relatorioService;
    private final EstatisticaService estatisticaService;

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> gerarRelatorioEstatisticasPdf(HttpSession session) {
        System.out.println("Gerar relatório controller iniciado");
        // Recupera o usuarioId da sessão
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");

        if (usuarioLogado == null) {
            System.out.println("Gerar relatório: usuário não logado");
            return ResponseEntity.status(401).body(null);  // Caso não tenha usuário na sessão
        }

        // Chama o serviço para pegar as estatísticas e o gráfico
        EstatisticaDTO estatisticaDTO = estatisticaService.pegarEstatistica(usuarioLogado.getId());
        GraficoDTO graficoDTO = estatisticaService.pegarChartData(usuarioLogado.getId());

        // Gera o PDF com base nas estatísticas e no gráfico
        byte[] pdfBytes = relatorioService.gerarPdfRelatorioEstatistica(estatisticaDTO, graficoDTO);

        // Retorna o arquivo PDF como resposta
        System.out.println("Gerar relatório: sucesso");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=relatorio_estatisticas.pdf")
                .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
                .body(pdfBytes);
    }
}
