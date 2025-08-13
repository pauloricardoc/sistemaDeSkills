package com.example.sistemaskill.model;
import jakarta.persistence.*;
@Entity
@Table(name="usuarios")
public class Usuario {
  @Id @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(unique=true, nullable=false)
  private String login;
  @Column(nullable=false)
  private String senhaHash;
  public Long getId(){return id;}
  public void setId(Long id){this.id=id;}
  public String getLogin(){return login;}
  public void setLogin(String login){this.login=login;}
  public String getSenhaHash(){return senhaHash;}
  public void setSenhaHash(String senhaHash){this.senhaHash=senhaHash;}
}