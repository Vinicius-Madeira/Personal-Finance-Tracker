package com.projeto.rastreamento_de_gastos.services.estatistica;

import com.projeto.rastreamento_de_gastos.dto.EstatisticaDTO;
import com.projeto.rastreamento_de_gastos.dto.GraficoDTO;

public interface EstatisticaService {
    GraficoDTO pegarChartData(Long usuarioId);
    EstatisticaDTO pegarEstatistica(Long usuarioId);
}
