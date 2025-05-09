package com.projeto.rastreamento_de_gastos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.exceptions.CriptoExistsException;
import com.projeto.rastreamento_de_gastos.exceptions.EmailExistsException;
import com.projeto.rastreamento_de_gastos.services.usuario.ServiceUsuario;
import com.projeto.rastreamento_de_gastos.util.Util;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UsuarioController {

    @Autowired
    private ServiceUsuario serviceUsuario;

    @PostMapping("/signup")
    public ResponseEntity<?> cadastrar(@RequestBody @Valid Usuario usuario, BindingResult br) {
        if (br.hasErrors()) {
            return ResponseEntity.badRequest().body("Dados inválidos.");
        }

        try {
            serviceUsuario.salvarUsuario(usuario);
            return ResponseEntity.ok("Usuário cadastrado com sucesso.");
        } catch (EmailExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (CriptoExistsException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criptografar senha.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid Usuario usuario, BindingResult br, HttpSession session) {
        if (br.hasErrors()) {
            return ResponseEntity.badRequest().body("Dados inválidos.");
        }

        try {
            Usuario userLogin = serviceUsuario.findByEmail(usuario.getEmail());

            if (userLogin == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado. Tente novamente.");
            }

            String senhaCriptografada = Util.md5(usuario.getSenha());

            if (!userLogin.getSenha().equals(senhaCriptografada)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta. Tente novamente.");
            }

            // Aqui, se quiser retornar o usuário sem a senha:
            userLogin.setSenha(null);
            session.setAttribute("usuarioLogado", userLogin);

            return ResponseEntity.ok(userLogin);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente.");
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        System.out.println("Logout realizado com sucesso!");
        return ResponseEntity.ok("Logout realizado com sucesso.");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");

        if (usuarioLogado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Usuário não está logado.");
        }
        usuarioLogado.setSenha(null);

        return ResponseEntity.ok(usuarioLogado);
    }
    @PutMapping("/profile")
    public ResponseEntity<?> atualizarPerfil(@RequestBody Usuario usuarioAtualizado, HttpSession session) {
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");

        if (usuarioLogado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Usuário não está logado.");
        }

        // Buscar o usuário no banco (por ID)
        Usuario usuarioExistente = serviceUsuario.buscarPorId(usuarioLogado.getId());
        if (usuarioExistente == null) {
            return ResponseEntity.notFound().build();
        }

        // Confirmar se o usuário recebido é o mesmo do que está logado
        if (!usuarioExistente.getId().equals(usuarioAtualizado.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Atualizar os campos (nome, usuário e email)
        usuarioExistente.setName(usuarioAtualizado.getName());
        usuarioExistente.setUser(usuarioAtualizado.getUser());

        Usuario updatedUser = serviceUsuario.updateUser(usuarioExistente);

        // Atualiza a sessão também para refletir as mudanças
        updatedUser.setSenha(null);
        session.setAttribute("usuarioLogado", updatedUser);

        return ResponseEntity.ok(updatedUser);
    }
}
