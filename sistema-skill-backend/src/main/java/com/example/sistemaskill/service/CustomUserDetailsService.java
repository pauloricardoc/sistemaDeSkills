package com.example.sistemaskill.service;
import com.example.sistemaskill.model.Usuario;
import com.example.sistemaskill.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomUserDetailsService {
  @Autowired private UsuarioRepository usuarioRepository;
  public Optional<Usuario> findByLogin(String login){ return usuarioRepository.findByLogin(login); }
  public Optional<Usuario> findById(Long id){ return usuarioRepository.findById(id); }
}
