package com.pragtics.Oauthresourceserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity(debug = true)
public class ResourceServerConfig {

   @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      /* http    .mvcMatcher("/api/**")
               .authorizeRequests()
               .mvcMatchers("/api/**")
               .access("hasAuthority('SCOPE_api.read')")
               .and()
               .oauth2ResourceServer().jwt();*/
       http
               .authorizeRequests()
               .anyRequest().authenticated()
               .and()
               .oauth2ResourceServer()
               .jwt().jwtAuthenticationConverter(new JwtAuthenticationConverter());

       return http.build();
    }

}
