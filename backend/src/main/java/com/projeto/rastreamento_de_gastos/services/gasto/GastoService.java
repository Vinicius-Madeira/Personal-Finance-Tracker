package com.projeto.rastreamento_de_gastos.services.gasto;

import java.util.List;

import com.projeto.rastreamento_de_gastos.dto.GastoDTO;
import com.projeto.rastreamento_de_gastos.entity.Gasto;

public interface GastoService{
    Gasto postarGasto(GastoDTO gastoDTO);

    List<Gasto> pegarTodosOsGastos();

    Gasto pegarGastopeloID(Long id);

    Gasto atualizarGasto(Long id, GastoDTO gastoDTO);
    
    void deletarGasto(Long id);
}
