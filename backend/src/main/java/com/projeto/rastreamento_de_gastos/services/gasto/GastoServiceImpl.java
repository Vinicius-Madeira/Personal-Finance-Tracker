package com.projeto.rastreamento_de_gastos.services.gasto;

import java.util.List;

import java.util.Optional;
import org.springframework.stereotype.Service;
import com.projeto.rastreamento_de_gastos.entity.Gasto;
import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.repository.GastoRepository;

import jakarta.persistence.EntityNotFoundException;

import com.projeto.rastreamento_de_gastos.dto.GastoDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GastoServiceImpl implements GastoService {

    private final GastoRepository gastoRepository;

    public Gasto postarGasto(GastoDTO gastoDTO, Long usuarioId) {
        // Adicionando o usuarioId ao DTO antes de salvar
        gastoDTO.setUsuarioId(usuarioId);
        
        // Agora o Gasto será criado com o usuarioId
        return salvarOuAtualizarGasto(new Gasto(), gastoDTO);
    }

    private Gasto salvarOuAtualizarGasto(Gasto gasto, GastoDTO gastoDTO) {
        // Associando o usuário ao gasto
        Usuario usuario = new Usuario();
        usuario.setId(gastoDTO.getUsuarioId());
        gasto.setUsuario(usuario);

        gasto.setTitulo(gastoDTO.getTitulo());
        gasto.setData(gastoDTO.getData());
        gasto.setValor(gastoDTO.getValor());
        gasto.setCategoria(gastoDTO.getCategoria());
        gasto.setDescricao(gastoDTO.getDescricao());
        
        
        return gastoRepository.save(gasto);
    }


    public Gasto atualizarGasto(Long id, GastoDTO gastoDTO) {
        Optional<Gasto> gastoOpcional = gastoRepository.findById(id);
        if (gastoOpcional.isPresent()) {
            Gasto gasto = gastoOpcional.get();
            // Atualizando os dados do gasto
            gasto.setTitulo(gastoDTO.getTitulo());
            gasto.setDescricao(gastoDTO.getDescricao());
            gasto.setCategoria(gastoDTO.getCategoria());
            gasto.setData(gastoDTO.getData());
            gasto.setValor(gastoDTO.getValor());
            return gastoRepository.save(gasto);
        } else {
            throw new EntityNotFoundException("Gasto não encontrado pelo id " + id);
        }
    }
    
    public List<Gasto> pegarTodosOsGastos(Long usuarioId) {
        return gastoRepository.findByUsuarioId(usuarioId); // Busca os gastos pelo ID do usuário
    }

    public Gasto pegarGastopeloID(Long id){
        Optional<Gasto> gastoOpcional = gastoRepository.findById(id);
        if(gastoOpcional.isPresent()){
            return gastoOpcional.get();
        }else{
            throw new EntityNotFoundException("Não extiste gasto com esse id " + id);
        }
    }
    public void deletarGasto(Long id){
        Optional<Gasto> gastoOpcional = gastoRepository.findById(id);
        if(gastoOpcional.isPresent()){
            gastoRepository.deleteById(id);
        }else{
            throw new EntityNotFoundException("Não há gasto com esse id " + id);
        }
        }
    
    

}