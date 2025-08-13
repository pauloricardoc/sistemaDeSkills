package com.example.sistemaskill.service;
import com.example.sistemaskill.model.*;
import com.example.sistemaskill.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkillService {
  @Autowired private UsuarioSkillRepository usRepo;
  @Autowired private SkillRepository skillRepo;
  @Autowired private com.example.sistemaskill.repository.UsuarioRepository usuarioRepo;

  public List<UsuarioSkill> listarPorUsuario(Long usuarioId){ return usRepo.findByUsuarioId(usuarioId); }

  public UsuarioSkill adicionar(Long usuarioId, Long skillId, String level){
    Usuario u = usuarioRepo.findById(usuarioId).orElseThrow();
    Skill s = skillRepo.findById(skillId).orElseThrow();
    UsuarioSkill us = new UsuarioSkill();
    us.setUsuario(u); us.setSkill(s); us.setLevel(level);
    return usRepo.save(us);
  }

  public UsuarioSkill atualizarLevel(Long id, String level){
    UsuarioSkill us = usRepo.findById(id).orElseThrow();
    us.setLevel(level);
    return usRepo.save(us);
  }

  public void excluir(Long id){ usRepo.deleteById(id); }

  public List<Skill> listarCatalogo(){ return skillRepo.findAll(); }
}