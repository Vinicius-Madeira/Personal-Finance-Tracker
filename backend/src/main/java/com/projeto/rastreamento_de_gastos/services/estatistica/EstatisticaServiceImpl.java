package com.projeto.rastreamento_de_gastos.services.estatistica;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.projeto.rastreamento_de_gastos.dto.EstatisticaDTO;
import com.projeto.rastreamento_de_gastos.dto.GastoPorCategoria;
import com.projeto.rastreamento_de_gastos.dto.GraficoDTO;
import com.projeto.rastreamento_de_gastos.entity.Gasto;
import com.projeto.rastreamento_de_gastos.entity.Renda;
import com.projeto.rastreamento_de_gastos.repository.GastoRepository;
import com.projeto.rastreamento_de_gastos.repository.RendaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstatisticaServiceImpl implements EstatisticaService{
    private final RendaRepository rendaRepository;

    private final GastoRepository gastoRepository;

    public GraficoDTO pegarChartData(Long usuarioId) {
    // Verificando se o ID do usuário está correto
    System.out.println("ID do usuário logado: " + usuarioId);

        LocalDate dataFinal = LocalDate.now();
        LocalDate dataInicial = dataFinal.minusDays(365);

        // Filtra os dados pelo usuarioId
        List<Gasto> listaGasto = gastoRepository.findByUsuarioIdAndDataBetween(usuarioId, dataInicial, dataFinal);
        List<Renda> listaRenda = rendaRepository.findByUsuarioIdAndDataBetween(usuarioId, dataInicial, dataFinal);

        System.out.println("Lista de Gastos: " + listaGasto);

        List<GastoPorCategoria> gastosPorCategoria = listaGasto.stream()
            .collect(Collectors.groupingBy(Gasto::getCategoria, Collectors.summingDouble(Gasto::getValor)))
            .entrySet().stream()
            .map(entry -> new GastoPorCategoria(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

        System.out.println("Gastos por Categoria: " + gastosPorCategoria);

        GraficoDTO graficoDTO = new GraficoDTO();
        graficoDTO.setListaGasto(listaGasto);
        graficoDTO.setListaRenda(listaRenda);
        graficoDTO.setGastosPorCategoria(gastosPorCategoria);

        return graficoDTO;
    }

    public EstatisticaDTO pegarEstatistica(Long usuarioId) {
        Double rendaTotal = rendaRepository.somarValorTotalPorUsuario(usuarioId);
        Double gastoTotal = gastoRepository.somarValorTotalPorUsuario(usuarioId);

        Optional<Renda> rendaOpcional = rendaRepository.findFirstByUsuarioIdOrderByDataDesc(usuarioId);
        Optional<Gasto> gastoOptional = gastoRepository.findFirstByUsuarioIdOrderByDataDesc(usuarioId);

        EstatisticaDTO estatisticaDTO = new EstatisticaDTO();
        estatisticaDTO.setGasto(gastoTotal);
        estatisticaDTO.setRenda(rendaTotal);

        rendaOpcional.ifPresent(estatisticaDTO::setUltimaRenda);
        gastoOptional.ifPresent(estatisticaDTO::setUltimoGasto);

        estatisticaDTO.setBalanço(rendaTotal - gastoTotal);

        List<Renda> listaRenda = rendaRepository.findByUsuarioId(usuarioId);
        List<Gasto> listaGasto = gastoRepository.findByUsuarioId(usuarioId);

        OptionalDouble minRenda = listaRenda.stream().mapToDouble(Renda::getValor).min();
        OptionalDouble maxRenda = listaRenda.stream().mapToDouble(Renda::getValor).max();

        OptionalDouble minGasto = listaGasto.stream().mapToDouble(Gasto::getValor).min();
        OptionalDouble maxGasto = listaGasto.stream().mapToDouble(Gasto::getValor).max();

        estatisticaDTO.setMaxGasto(maxGasto.isPresent() ? maxGasto.getAsDouble() : null);
        estatisticaDTO.setMinGasto(minGasto.isPresent() ? minGasto.getAsDouble() : null); 
        
        estatisticaDTO.setMaxRenda(maxRenda.isPresent() ? maxRenda.getAsDouble() : null);
        estatisticaDTO.setMinRenda(minRenda.isPresent() ? minRenda.getAsDouble() : null); 

        return estatisticaDTO;
    }
}
