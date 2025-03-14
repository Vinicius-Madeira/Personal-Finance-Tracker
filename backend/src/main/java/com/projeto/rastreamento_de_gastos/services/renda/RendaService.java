package com.projeto.rastreamento_de_gastos.services.renda;

import java.util.List;

import com.projeto.rastreamento_de_gastos.dto.RendaDTO;
import com.projeto.rastreamento_de_gastos.entity.Renda;

public interface RendaService {

    Renda postarRenda(RendaDTO rendaDTO);

    List<RendaDTO> pegarTodaRenda();

    Renda atualizarRenda(Long id, RendaDTO rendaDTO);

    RendaDTO pegarRendaPeloID(Long id);

    void deletarRenda(Long id);

}
