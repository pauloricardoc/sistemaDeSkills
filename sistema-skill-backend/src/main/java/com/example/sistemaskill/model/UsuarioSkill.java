package com.example.sistemaskill.model;
import jakarta.persistence.*;
@Entity
@Table(name="usuario_skills")
public class UsuarioSkill {
  @Id @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @ManyToOne @JoinColumn(name="usuario_id")
  private Usuario usuario;
  @ManyToOne @JoinColumn(name="skill_id")
  private Skill skill;
  private String level;

  public Long getId(){return id;}
  public void setId(Long id){this.id=id;}
  public Usuario getUsuario(){return usuario;}
  public void setUsuario(Usuario usuario){this.usuario=usuario;}
  public Skill getSkill(){return skill;}
  public void setSkill(Skill skill){this.skill=skill;}
  public String getLevel(){return level;}
  public void setLevel(String level){this.level=level;}
}