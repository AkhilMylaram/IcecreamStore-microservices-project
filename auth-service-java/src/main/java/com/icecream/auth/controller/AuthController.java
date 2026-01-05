package com.icecream.auth.controller;

import com.icecream.auth.dto.AuthRequest;
import com.icecream.auth.dto.AuthResponse;
import com.icecream.auth.dto.RegisterRequest;
import com.icecream.auth.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.ok(false);
        }
        final String jwt = authHeader.substring(7);
        return ResponseEntity.ok(service.validateToken(jwt));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Since we are using stateless JWT, we can't truly "logout" on server side
        // without a blacklist, but we return a success response.
        return ResponseEntity.ok("Logged out successfully");
    }
}
