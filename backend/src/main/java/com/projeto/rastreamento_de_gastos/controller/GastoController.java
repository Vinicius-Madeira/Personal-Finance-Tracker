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

import com.projeto.rastreamento_de_gastos.dto.GastoDTO;
import com.projeto.rastreamento_de_gastos.entity.Gasto;
import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.exceptions.ErrorResponse;
import com.projeto.rastreamento_de_gastos.services.gasto.GastoService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gasto")
@RequiredArgsConstructor
@CrossOrigin("*")
public class GastoController {

    private final GastoService gastoService;

        @PostMapping
        public ResponseEntity<?> postarGasto(@RequestBody GastoDTO dto, HttpSession session){
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
        Gasto gastoCriado = gastoService.postarGasto(dto, usuarioLogado.getId());

        if (gastoCriado != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(gastoCriado);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }


        @GetMapping("/all")
        public ResponseEntity<?> pegarTodosOsGastos(HttpSession session) {
        // Obtendo o usuário logado da sessão
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");

        if (usuarioLogado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ErrorResponse("Usuário não autenticado")
            );
        }

        // Buscando os gastos do usuário logado
            return ResponseEntity.ok(gastoService.pegarTodosOsGastos(usuarioLogado.getId()));
        }


        @GetMapping("/{id}")
        public ResponseEntity<?> pegarGastoPeloId(@PathVariable long id){
            try{
                return ResponseEntity.ok(gastoService.pegarGastopeloID(id));
            }catch (EntityNotFoundException ex){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro");
            }
        }


        @PutMapping("/{id}")
        public ResponseEntity<?>atualizarGasto(@PathVariable Long id, @RequestBody GastoDTO dto){
            try{
                return ResponseEntity.ok(gastoService.atualizarGasto(id, dto));
            }catch(EntityNotFoundException ex){
                return ResponseEntity.status((HttpStatus.NOT_FOUND)).body(ex.getMessage());
            }catch(Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Algo deu errado");
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<?>deletarGasto(@PathVariable Long id){
            try{
                gastoService.deletarGasto(id);
                return ResponseEntity.ok(null);
            }catch(EntityNotFoundException ex){
                return ResponseEntity.status((HttpStatus.NOT_FOUND)).body(ex.getMessage());
            }catch(Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Algo deu errado");
            }
        }

}
