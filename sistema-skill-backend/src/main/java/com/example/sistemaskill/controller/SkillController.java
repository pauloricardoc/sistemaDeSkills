package com.example.sistemaskill.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.sistemaskill.service.SkillService;
import com.example.sistemaskill.model.UsuarioSkill;
import com.example.sistemaskill.model.Skill;
import java.util.List;

@RestController
@RequestMapping("/skills")
public class SkillController {
  @Autowired private SkillService skillService;
  @Autowired private com.example.sistemaskill.security.JwtUtil jwtUtil;

  @GetMapping("/catalogo")
  public ResponseEntity<List<Skill>> catalogo(){ return ResponseEntity.ok(skillService.listarCatalogo()); }

  
  private boolean validToken(String authHeader){ return authHeader!=null && authHeader.startsWith("Bearer ") && jwtUtil.validate(authHeader.substring(7)); }

  @GetMapping("/listar/{usuarioId}")
  public ResponseEntity<?> listar(@RequestHeader(value="Authorization", required=false) String auth, @PathVariable Long usuarioId){
    if (!validToken(auth)) return ResponseEntity.status(401).body("Token inválido");
    return ResponseEntity.ok(skillService.listarPorUsuario(usuarioId));
  }

  @PostMapping("/adicionar")
  public ResponseEntity<?> adicionar(@RequestHeader(value="Authorization", required=false) String auth, @RequestBody com.example.sistemaskill.dto.AdicionarSkillRequest req){
    if (!validToken(auth)) return ResponseEntity.status(401).body("Token inválido");
    UsuarioSkill us = skillService.adicionar(req.getUsuarioId(), req.getSkillId(), req.getLevel());
    return ResponseEntity.ok(us);
  }

  @PutMapping("/atualizar/{id}")
  public ResponseEntity<?> atualizar(@RequestHeader(value="Authorization", required=false) String auth, @PathVariable Long id, @RequestBody java.util.Map<String,String> body){
    if (!validToken(auth)) return ResponseEntity.status(401).body("Token inválido");
    String level = body.get("level");
    UsuarioSkill us = skillService.atualizarLevel(id, level);
    return ResponseEntity.ok(us);
  }

  @DeleteMapping("/excluir/{id}")
  public ResponseEntity<?> excluir(@RequestHeader(value="Authorization", required=false) String auth, @PathVariable Long id){
    if (!validToken(auth)) return ResponseEntity.status(401).body("Token inválido");
    skillService.excluir(id);
    return ResponseEntity.ok("Excluído");
  }
}