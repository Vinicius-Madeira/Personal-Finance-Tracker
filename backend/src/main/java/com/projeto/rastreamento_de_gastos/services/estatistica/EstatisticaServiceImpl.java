package com.projeto.rastreamento_de_gastos.services.estatistica;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

import org.springframework.stereotype.Service;

import com.projeto.rastreamento_de_gastos.dto.EstatisticaDTO;
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

    public GraficoDTO pegarChartData(){
        LocalDate dataFinal = LocalDate.now();
        LocalDate dataInicial = dataFinal.minusDays(27);

        GraficoDTO graficoDTO = new GraficoDTO();
        graficoDTO.setListaGasto(gastoRepository.findByDataBetween(dataInicial, dataFinal));
        graficoDTO.setListaRenda(rendaRepository.findByDataBetween(dataInicial, dataFinal));

        return graficoDTO;
    }

    public EstatisticaDTO pegarEstatistica(){
        Double rendaTotal = rendaRepository.somarValorTotal();
        Double gastoTotal = gastoRepository.somarValorTotal();

        Optional<Renda> rendaOpcional = rendaRepository.findFirstByOrderByDataDesc();
        Optional<Gasto> gastoOptional = gastoRepository.findFirstByOrderByDataDesc();

        EstatisticaDTO estatisticaDTO = new EstatisticaDTO();
        estatisticaDTO.setGasto(gastoTotal);
        estatisticaDTO.setRenda(rendaTotal);

        rendaOpcional.ifPresent(estatisticaDTO::setUltimaRenda);

        gastoOptional.ifPresent(estatisticaDTO::setUltimoGasto);

        estatisticaDTO.setBalanço(rendaTotal-gastoTotal);

        List<Renda> listaRenda = rendaRepository.findAll();
        List<Gasto> listaGasto = gastoRepository.findAll();

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
