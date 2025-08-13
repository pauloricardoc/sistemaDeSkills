package com.example.sistemaskill.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.sistemaskill.repository.UsuarioRepository;
import com.example.sistemaskill.model.Usuario;
import java.util.Optional;

@Service
public class AuthService {
  @Autowired private UsuarioRepository usuarioRepository;
  private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public Usuario register(String login, String senha){
    Usuario u = new Usuario();
    u.setLogin(login);
    u.setSenhaHash(encoder.encode(senha));
    return usuarioRepository.save(u);
  }

  public Optional<Usuario> authenticate(String login, String senha){
    Optional<Usuario> ou = usuarioRepository.findByLogin(login);
    if (ou.isEmpty()) return Optional.empty();
    Usuario u = ou.get();
    if (encoder.matches(senha, u.getSenhaHash())) return Optional.of(u);
    return Optional.empty();
  }
}