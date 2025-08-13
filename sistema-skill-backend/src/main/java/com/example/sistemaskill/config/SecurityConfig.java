package com.example.sistemaskill.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.sistemaskill.security.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {
  @Autowired private JwtFilter jwtFilter;

  @Bean
  public FilterRegistrationBean<JwtFilter> jwtFilterRegistration() {
    FilterRegistrationBean<JwtFilter> registration = new FilterRegistrationBean<>(jwtFilter);
    registration.addUrlPatterns("/skills/*");
    registration.setOrder(Ordered.LOWEST_PRECEDENCE - 1);
    return registration;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
  }
}