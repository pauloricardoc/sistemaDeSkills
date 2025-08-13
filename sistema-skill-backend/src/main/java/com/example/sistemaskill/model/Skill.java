package com.example.sistemaskill.model;
import jakarta.persistence.*;
@Entity
@Table(name="skills")
public class Skill {
  @Id @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String nome;
  @Column(columnDefinition="text")
  private String descricao;
  private String imagemUrl;
  public Long getId(){return id;}
  public void setId(Long id){this.id=id;}
  public String getNome(){return nome;}
  public void setNome(String nome){this.nome=nome;}
  public String getDescricao(){return descricao;}
  public void setDescricao(String descricao){this.descricao=descricao;}
  public String getImagemUrl(){return imagemUrl;}
  public void setImagemUrl(String imagemUrl){this.imagemUrl=imagemUrl;}
}