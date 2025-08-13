package com.example.sistemaskill.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.sistemaskill.service.AuthService;
import com.example.sistemaskill.security.JwtUtil;
import com.example.sistemaskill.dto.LoginRequest;
import com.example.sistemaskill.model.Usuario;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired private AuthService authService;
  @Autowired private JwtUtil jwtUtil;

  @PostMapping("/cadastro")
  public ResponseEntity<?> cadastrar(@RequestBody LoginRequest req){
    Usuario u = authService.register(req.getLogin(), req.getSenha());
    return ResponseEntity.ok("Usuário cadastrado com sucesso");
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest req){
    return authService.authenticate(req.getLogin(), req.getSenha())
      .map(u -> {
        String token = jwtUtil.generateToken(u.getLogin());
        return ResponseEntity.ok(java.util.Map.of("token", token, "usuarioId", u.getId()));
      })
      .orElse(ResponseEntity.status(401).body("Login ou senha inválidos"));
  }
}