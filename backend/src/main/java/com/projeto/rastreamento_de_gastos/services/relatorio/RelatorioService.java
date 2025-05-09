package com.projeto.rastreamento_de_gastos.services.relatorio;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import com.projeto.rastreamento_de_gastos.dto.EstatisticaDTO;
import com.projeto.rastreamento_de_gastos.dto.GraficoDTO;
import com.projeto.rastreamento_de_gastos.entity.Gasto;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.data.general.DefaultPieDataset;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class RelatorioService {

    public byte[] gerarPdfRelatorioEstatistica(EstatisticaDTO estatisticaDTO, GraficoDTO graficoDTO) {
        Document document = new Document();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            Font tituloFonte = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph titulo = new Paragraph("Relatório de Estatísticas de Gastos e Rendas", tituloFonte);
            titulo.setAlignment(Element.ALIGN_CENTER);
            document.add(titulo);
            document.add(new Paragraph(" "));

            Font subtituloFonte = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);

            // Renda
            document.add(new Paragraph("Seção de Renda", subtituloFonte));
            document.add(new Paragraph("Renda Total: " + estatisticaDTO.getRenda()));
            document.add(new Paragraph("Mínima Renda: " + estatisticaDTO.getMinRenda()));
            document.add(new Paragraph("Máxima Renda: " + estatisticaDTO.getMaxRenda()));
            document.add(new Paragraph("Última Renda: " + (estatisticaDTO.getUltimaRenda() != null ? estatisticaDTO.getUltimaRenda().getValor() : "N/A")));
            document.add(new Paragraph(" "));

            // Gasto
            document.add(new Paragraph("Seção de Gastos", subtituloFonte));
            document.add(new Paragraph("Gasto Total: " + estatisticaDTO.getGasto()));
            document.add(new Paragraph("Mínimo Gasto: " + estatisticaDTO.getMinGasto()));
            document.add(new Paragraph("Máximo Gasto: " + estatisticaDTO.getMaxGasto()));
            document.add(new Paragraph("Último Gasto: " + (estatisticaDTO.getUltimoGasto() != null ? estatisticaDTO.getUltimoGasto().getValor() : "N/A")));
            document.add(new Paragraph(" "));

            // Balanço
            document.add(new Paragraph("Balanço: " + estatisticaDTO.getBalanço()));
            document.add(new Paragraph(" "));

            // Gastos por categoria (lista)
            document.add(new Paragraph("Gastos por Categoria (Lista):", subtituloFonte));
            for (Gasto gasto : graficoDTO.getListaGasto()) {
                document.add(new Paragraph("Categoria: " + gasto.getCategoria() + " - Valor: " + gasto.getValor()));
            }
            document.add(new Paragraph(" "));

            // Gráfico
            Image imagemGrafico = gerarGraficoPizza(graficoDTO.getListaGasto());
            document.add(new Paragraph("Gráfico de Gastos por Categoria:", subtituloFonte));
            imagemGrafico.scaleToFit(400, 300);
            imagemGrafico.setAlignment(Image.ALIGN_CENTER);
            document.add(imagemGrafico);

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return byteArrayOutputStream.toByteArray();
    }

    private Image gerarGraficoPizza(List<Gasto> listaGasto) throws Exception {
        DefaultPieDataset<String> dataset = new DefaultPieDataset<>();
    
        for (Gasto gasto : listaGasto) {
            dataset.setValue(gasto.getCategoria(), gasto.getValor());
        }
    
        JFreeChart chart = ChartFactory.createPieChart(
                "Distribuição de Gastos por Categoria",
                dataset,
                true,
                true,
                false
        );
    
        BufferedImage chartImage = chart.createBufferedImage(500, 300);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(chartImage, "png", baos);
        return Image.getInstance(baos.toByteArray());
    }
    
}
