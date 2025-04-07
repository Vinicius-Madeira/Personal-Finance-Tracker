package com.projeto.rastreamento_de_gastos.services.usuario;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.rastreamento_de_gastos.dao.UsuarioDao;
import com.projeto.rastreamento_de_gastos.entity.Usuario;
import com.projeto.rastreamento_de_gastos.exceptions.CriptoExistsException;
import com.projeto.rastreamento_de_gastos.exceptions.EmailExistsException;
import com.projeto.rastreamento_de_gastos.exceptions.ServiceExc;
import com.projeto.rastreamento_de_gastos.util.Util;

@Service
public class ServiceUsuario {
    @Autowired
    private UsuarioDao repositorioUsuario;

    public void salvarUsuario(Usuario user) throws EmailExistsException, CriptoExistsException {

        try {
            if (repositorioUsuario.findByEmail(user.getEmail()) != null){
                throw new EmailExistsException("Já existe um email cadastrado para: " + user.getEmail());
            }
            user.setSenha(Util.md5(user.getSenha()));
        } catch (NoSuchAlgorithmException e) {
            throw new CriptoExistsException("Erro na criptografia da senha");
        }
        repositorioUsuario.save(user);
    }

    public Usuario loginUser(String user, String senha) throws ServiceExc{
        Usuario userLogin = repositorioUsuario.buscarLogin(user, senha);
        return userLogin;
    }

    public Usuario findByUser(String user) {
        return repositorioUsuario.findByUser(user);
    }
    
}
