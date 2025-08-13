package com.example.sistemaskill.security;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
@Component
public class JwtUtil {
  @Value("${jwt.secret}")
  private String secret;
  @Value("${jwt.expiration-ms}")
  private Long expirationMs;

  public String generateToken(String username){
    Date now = new Date();
    Date exp = new Date(now.getTime() + expirationMs);
    return Jwts.builder()
      .setSubject(username)
      .setIssuedAt(now)
      .setExpiration(exp)
      .signWith(SignatureAlgorithm.HS256, secret.getBytes())
      .compact();
  }

  public String extractUsername(String token){
    return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validate(String token){
    try {
      Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token);
      return true;
    } catch (JwtException e) { return false; }
  }
}