package com.projeto.rastreamento_de_gastos.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.rastreamento_de_gastos.dto.RendaDTO;
import com.projeto.rastreamento_de_gastos.entity.Renda;
import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.exceptions.ErrorResponse;
import com.projeto.rastreamento_de_gastos.services.renda.RendaService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/renda")
@RequiredArgsConstructor
@CrossOrigin("*")

public class RendaController {

    private final RendaService rendaService;

        @PostMapping
        public ResponseEntity<?> postarRenda(@RequestBody RendaDTO dto, HttpSession session){
        // Obtendo o usuário logado da sessão
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");

        if (usuarioLogado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            new ErrorResponse("Usuário não autenticado")
        );
        }

        // Atribuindo o ID do usuário autenticado ao DTO
        dto.setUsuarioId(usuarioLogado.getId());  // Usando o ID do usuário logado
    
        // Passando o ID do usuário como argumento
        Renda rendaCriada = rendaService.postarRenda(dto, usuarioLogado.getId());

        if (rendaCriada != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(rendaCriada);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }


        @GetMapping("/all")
        public ResponseEntity<?> pegarTodaRenda(HttpSession session) {
            // Obtendo o usuário logado da sessão
            Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");
        
            if (usuarioLogado == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ErrorResponse("Usuário não autenticado")
                );
            }
        
            // Passando o ID do usuário logado para o serviço
            List<Renda> rendas = rendaService.pegarTodaRenda(usuarioLogado.getId());
        
            return ResponseEntity.ok(rendas);
        }
        

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarRenda(@PathVariable Long id, @RequestBody RendaDTO rendaDTO){
        try{
            return ResponseEntity.ok(rendaService.atualizarRenda(id, rendaDTO));
        }catch (EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Algo deu errado");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> pegarRendaPeloId(@PathVariable Long id){
        try{
            return ResponseEntity.ok(rendaService.pegarRendaPeloID(id));
        }catch(EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Algo deu errado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarRenda(@PathVariable Long id){
        try{
            rendaService.deletarRenda(id);
            return ResponseEntity.ok(null);
        }catch(EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Algo deu errado");
        }
    }

}
