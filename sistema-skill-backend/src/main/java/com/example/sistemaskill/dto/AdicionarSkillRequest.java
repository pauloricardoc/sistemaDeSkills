package com.example.sistemaskill.dto;
public class AdicionarSkillRequest {
  private Long usuarioId;
  private Long skillId;
  private String level;
  public Long getUsuarioId(){return usuarioId;}
  public void setUsuarioId(Long usuarioId){this.usuarioId=usuarioId;}
  public Long getSkillId(){return skillId;}
  public void setSkillId(Long skillId){this.skillId=skillId;}
  public String getLevel(){return level;}
  public void setLevel(String level){this.level=level;}
}