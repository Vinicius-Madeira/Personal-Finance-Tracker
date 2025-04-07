package com.projeto.rastreamento_de_gastos.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.exceptions.CriptoExistsException;
import com.projeto.rastreamento_de_gastos.exceptions.EmailExistsException;
import com.projeto.rastreamento_de_gastos.exceptions.ServiceExc;
import com.projeto.rastreamento_de_gastos.services.usuario.ServiceUsuario;
import com.projeto.rastreamento_de_gastos.util.Util;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
public class UsuarioController {

    @Autowired
    private ServiceUsuario serviceUsuario;

    @GetMapping("/login")
    public ModelAndView login(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("login/login");
        mv.addObject("usuario", new Usuario());
        return mv;
    }

    @GetMapping("/index")
public ModelAndView index(){
    ModelAndView mv = new ModelAndView();
    mv.setViewName("index");
    return mv;
}


    @GetMapping("/cadastro")
    public ModelAndView cadastrar(){
        ModelAndView mv = new ModelAndView();
        mv.addObject("usuario", new Usuario());
        mv.setViewName("login/cadastro");
        return mv;
    }

    @PostMapping("/salvarUsuario")
    public ModelAndView cadastrar(Usuario usuario) {
        ModelAndView mv = new ModelAndView();
        try {
            serviceUsuario.salvarUsuario(usuario);
            mv.setViewName("redirect:/login");
        } catch (EmailExistsException e) {
            mv.addObject("erro", e.getMessage()); // Adiciona mensagem de erro para exibir na tela
            mv.setViewName("login/cadastro"); // Retorna à página de cadastro
        } catch (CriptoExistsException e) {
            mv.addObject("erro", "Erro ao criptografar senha.");
            mv.setViewName("login/cadastro");
        }
        return mv;
    }

    @PostMapping("/login")
    public ModelAndView loginUsuario(@Valid Usuario usuario, BindingResult br, HttpSession session) throws NoSuchAlgorithmException, ServiceExc {
        ModelAndView mv = new ModelAndView();
        mv.addObject("usuario", usuario);  // Mantém os dados preenchidos no formulário
        
        if (br.hasErrors()) {
            mv.setViewName("login/login");
            return mv;
        }
        
        try {
            // Busca o usuário pelo nome
            Usuario userLogin = serviceUsuario.findByUser(usuario.getUser());
    
            if (userLogin == null) {
                mv.addObject("msg", "Usuário não encontrado. Tente novamente");
                mv.setViewName("login/login");
            } else {
                // Criptografa a senha digitada pelo usuário
                String senhaCriptografada = Util.md5(usuario.getSenha());
    
                if (!userLogin.getSenha().equals(senhaCriptografada)) {
                    mv.addObject("msg", "Senha incorreta. Tente novamente");
                    mv.setViewName("login/login");
                } else {
                    session.setAttribute("usuarioLogado", userLogin);
                    mv.setViewName("redirect:/index");
                }
            }
        } catch (Exception e) {
            mv.addObject("msg", "Ocorreu um erro inesperado. Tente novamente.");
            mv.setViewName("login/login");
            e.printStackTrace();
        }
        
        return mv;
    }
    
    @PostMapping("/logout")
    public ModelAndView logout(HttpSession session) {

        session.invalidate();
        return login();
    }

}
