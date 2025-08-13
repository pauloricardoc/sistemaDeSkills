package com.example.sistemaskill.repository;
import com.example.sistemaskill.model.UsuarioSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface UsuarioSkillRepository extends JpaRepository<UsuarioSkill, Long> {
  List<UsuarioSkill> findByUsuarioId(Long usuarioId);
}