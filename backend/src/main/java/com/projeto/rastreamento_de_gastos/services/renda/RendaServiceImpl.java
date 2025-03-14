package com.projeto.rastreamento_de_gastos.services.renda;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.projeto.rastreamento_de_gastos.dto.RendaDTO;
import com.projeto.rastreamento_de_gastos.entity.Renda;
import com.projeto.rastreamento_de_gastos.repository.RendaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RendaServiceImpl implements RendaService{
    private RendaRepository rendaRepository;

    public Renda postarRenda(RendaDTO rendaDTO){
        return salvarOuAtualizarRenda(new Renda(), rendaDTO);
    }

    private Renda salvarOuAtualizarRenda(Renda renda, RendaDTO rendaDTO){
        renda.setTitulo(rendaDTO.getTitulo());
        renda.setData(rendaDTO.getData());
        renda.setValor(rendaDTO.getValor());
        renda.setCategoria(rendaDTO.getCategoria());
        renda.setDescricao(rendaDTO.getDescricao());

        return rendaRepository.save(renda);
    }
    public List<RendaDTO> pegarTodaRenda(){
        return rendaRepository.findAll().stream().sorted(Comparator.comparing(Renda::getData).reversed()).map(Renda::pegarRendaPeloID).collect(Collectors.toList());
    }

    public Renda atualizarRenda(Long id, RendaDTO rendaDTO){
        Optional<Renda> rendaOpcional = rendaRepository.findById(id);
        if(rendaOpcional.isPresent()){
            return salvarOuAtualizarRenda(rendaOpcional.get(), rendaDTO);
        }else{
            throw new EntityNotFoundException("Não existe renda com o id " + id);
        }
    }

    public RendaDTO pegarRendaPeloID(Long id){
        Optional<Renda> rendaOpcional = rendaRepository.findById(id);
        if(rendaOpcional.isPresent()){
            return rendaOpcional.get().pegarRendaPeloID();
        }else{
            throw new EntityNotFoundException("Não existe renda com o id "+ id);
        }
    }

    public void deletarRenda(Long id){
        Optional<Renda> rendaOpcional = rendaRepository.findById(id);
        if(rendaOpcional.isPresent()){
            rendaRepository.deleteById(id);
        }else{
            throw new EntityNotFoundException("Não existe renda com esse id " + id);
        }
    }

}
