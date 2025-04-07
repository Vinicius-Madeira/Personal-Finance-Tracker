package com.projeto.rastreamento_de_gastos.services.renda;

import java.util.List;

import com.projeto.rastreamento_de_gastos.dto.RendaDTO;
import com.projeto.rastreamento_de_gastos.entity.Renda;

public interface RendaService {

    public Renda postarRenda(RendaDTO rendaDTO, Long usuarioId);

    List<Renda> pegarTodaRenda(Long usuarioId);

    Renda atualizarRenda(Long id, RendaDTO rendaDTO);

    Renda pegarRendaPeloID(Long id);

    void deletarRenda(Long id);

}
