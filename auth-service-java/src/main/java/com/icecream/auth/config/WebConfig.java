package com.icecream.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:8080", "http://localhost:8081", "http://localhost:8082", "http://localhost:8083", "http://localhost:8084", "http://localhost:8085", "http://localhost:8086", "http://localhost:8087", "http://localhost:8088", "http://localhost:8089", "http://localhost:8090", "https://localhost:3000", "https://localhost:8080", "https://localhost:8081", "https://localhost:8082", "https://localhost:8083", "https://localhost:8084", "https://localhost:8085", "https://localhost:8086", "https://localhost:8087", "https://localhost:8088", "https://localhost:8089", "https://localhost:8090", "http://localhost", "https://localhost", "http://127.0.0.1", "https://127.0.0.1", "http://0.0.0.0", "https://0.0.0.0")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}