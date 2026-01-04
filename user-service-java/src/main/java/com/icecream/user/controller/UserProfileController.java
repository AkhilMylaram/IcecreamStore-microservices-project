package com.icecream.user.controller;

import com.icecream.user.model.UserProfile;
import com.icecream.user.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserProfileController {
    private final UserProfileService service;

    @GetMapping("/{email}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable String email) {
        return service.getProfileByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserProfile> updateProfile(@RequestBody UserProfile profile) {
        return ResponseEntity.ok(service.saveProfile(profile));
    }
}
