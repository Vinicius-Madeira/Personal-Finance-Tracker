package com.projeto.rastreamento_de_gastos.controller;

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
import com.projeto.rastreamento_de_gastos.services.renda.RendaService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/renda")
@RequiredArgsConstructor
@CrossOrigin("*")

public class RendaController {

    private final RendaService rendaService;

    @PostMapping
    public ResponseEntity<?> postarRenda(@RequestBody RendaDTO rendaDTO){
        Renda criarRenda = rendaService.postarRenda(rendaDTO);
        if(criarRenda != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(criarRenda);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> pegarTodaRenda(){
        return ResponseEntity.ok(rendaService.pegarTodaRenda());
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
