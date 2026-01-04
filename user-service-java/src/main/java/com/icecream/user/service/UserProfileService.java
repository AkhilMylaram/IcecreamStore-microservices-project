package com.icecream.user.service;

import com.icecream.user.model.UserProfile;
import com.icecream.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository repository;

    public UserProfile saveProfile(UserProfile profile) {
        return repository.save(profile);
    }

    public Optional<UserProfile> getProfileByEmail(String email) {
        return repository.findByEmail(email);
    }
}
