package com.projeto.rastreamento_de_gastos.services.renda;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projeto.rastreamento_de_gastos.dto.RendaDTO;
import com.projeto.rastreamento_de_gastos.entity.Renda;
import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.repository.RendaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RendaServiceImpl implements RendaService{
    private final RendaRepository rendaRepository;

    public Renda postarRenda(RendaDTO rendaDTO, Long usuarioId) {
        // Adicionando o usuarioId ao DTO antes de salvar
        rendaDTO.setUsuarioId(usuarioId);
        
        // Agora a renda será criado com o usuarioId
        return salvarOuAtualizarRenda(new  Renda(), rendaDTO);
    }

    private Renda salvarOuAtualizarRenda(Renda renda, RendaDTO rendaDTO) {
        // Associando o usuário ao gasto
        Usuario usuario = new Usuario();
        usuario.setId(rendaDTO.getUsuarioId());
        renda.setUsuario(usuario);
        renda.setTitulo(rendaDTO.getTitulo());
        renda.setData(rendaDTO.getData());
        renda.setValor(rendaDTO.getValor());
        renda.setCategoria(rendaDTO.getCategoria());
        renda.setDescricao(rendaDTO.getDescricao());
        
        return rendaRepository.save(renda);
    }

    public List<Renda> pegarTodaRenda(Long usuarioId) {
        return rendaRepository.findByUsuarioId(usuarioId); // Filtra pelas rendas do usuário
    }

    public Renda atualizarRenda(Long id, RendaDTO rendaDTO) {
        Optional<Renda> rendaOpcional = rendaRepository.findById(id);
        if (rendaOpcional.isPresent()) {
            Renda renda = rendaOpcional.get();
            // Atualizando os dados da renda
            renda.setTitulo(rendaDTO.getTitulo());
            renda.setDescricao(rendaDTO.getDescricao());
            renda.setCategoria(rendaDTO.getCategoria());
            renda.setData(rendaDTO.getData());
            renda.setValor(rendaDTO.getValor());
            return rendaRepository.save(renda);
        } else {
            throw new EntityNotFoundException("Renda não encontrada pelo id " + id);
        }
    }

    public Renda pegarRendaPeloID(Long id){
        Optional<Renda> rendaOpcional = rendaRepository.findById(id);
        if(rendaOpcional.isPresent()){
            return rendaOpcional.get();
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
