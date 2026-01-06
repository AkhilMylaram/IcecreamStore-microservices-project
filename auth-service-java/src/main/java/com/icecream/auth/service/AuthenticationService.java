package com.icecream.auth.service;

import com.icecream.auth.dto.AuthRequest;
import com.icecream.auth.dto.AuthResponse;
import com.icecream.auth.dto.RegisterRequest;
import com.icecream.auth.model.Role;
import com.icecream.auth.model.User;
import com.icecream.auth.repository.UserRepository;
import com.icecream.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final org.springframework.web.client.RestTemplate restTemplate;

        public AuthResponse register(RegisterRequest request) {
                // Check if user already exists
                if (repository.findByEmail(request.getEmail()).isPresent()) {
                        throw new RuntimeException("User already exists with email: " + request.getEmail());
                }

                var user = User.builder()
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                repository.save(user);
                System.out.println("[auth-service] Registered user: " + request.getEmail());

                // Call user-service to create profile (async, non-blocking)
                try {
                        String userServiceUrl = "http://user-service:8082/api/users";
                        java.util.Map<String, String> profileData = new java.util.HashMap<>();
                        profileData.put("email", request.getEmail());
                        profileData.put("firstName", request.getFirstName());
                        profileData.put("lastName", request.getLastName());
                        restTemplate.postForObject(userServiceUrl, profileData, Object.class);
                } catch (Exception e) {
                        // Log but don't fail registration - user profile can be created later
                        System.err.println("Failed to create user profile: " + e.getMessage());
                }

                var jwtToken = jwtService.generateToken(user);
                System.out.println("[auth-service] Generated JWT for user: " + request.getEmail());
                return AuthResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new RuntimeException("User not found"));
                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public boolean validateToken(String token) {
                final String userEmail = jwtService.extractUsername(token);
                if (userEmail != null) {
                        var user = repository.findByEmail(userEmail).orElse(null);
                        if (user != null) {
                                return jwtService.isTokenValid(token, user);
                        }
                    }
                return false;
        }

        public java.util.Map<String, Object> getUserFromToken(String token) {
                final String userEmail = jwtService.extractUsername(token);
                if (userEmail != null) {
                        var user = repository.findByEmail(userEmail).orElse(null);
                        if (user != null) {
                                java.util.Map<String, Object> info = new java.util.HashMap<>();
                                info.put("id", user.getId());
                                info.put("email", user.getEmail());
                                info.put("role", user.getRole() != null ? user.getRole().name() : null);
                                return info;
                        }
                }
                return null;
        }
}
