package com.icecream.auth.config;

import com.icecream.auth.model.Role;
import com.icecream.auth.model.User;
import com.icecream.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin user already exists to avoid duplicates
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            // Create default admin user
            User admin = User.builder()
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(admin);
            System.out.println("Admin user created successfully");
        } else {
            System.out.println("Admin user already exists, skipping creation");
        }

        // Check if other default users exist to avoid duplicates
        if (userRepository.findByEmail("user1@example.com").isEmpty()) {
            User user1 = User.builder()
                    .email("user1@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user1);
            System.out.println("User1 created successfully");
        }

        if (userRepository.findByEmail("user2@example.com").isEmpty()) {
            User user2 = User.builder()
                    .email("user2@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user2);
            System.out.println("User2 created successfully");
        }

        if (userRepository.findByEmail("user3@example.com").isEmpty()) {
            User user3 = User.builder()
                    .email("user3@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user3);
            System.out.println("User3 created successfully");
        }

        if (userRepository.findByEmail("user4@example.com").isEmpty()) {
            User user4 = User.builder()
                    .email("user4@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user4);
            System.out.println("User4 created successfully");
        }

        if (userRepository.findByEmail("user5@example.com").isEmpty()) {
            User user5 = User.builder()
                    .email("user5@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user5);
            System.out.println("User5 created successfully");
        }

        if (userRepository.findByEmail("test@example.com").isEmpty()) {
            User test = User.builder()
                    .email("test@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(test);
            System.out.println("Test user created successfully");
        }

        if (userRepository.findByEmail("test2@example.com").isEmpty()) {
            User test2 = User.builder()
                    .email("test2@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(test2);
            System.out.println("Test2 user created successfully");
        }

        if (userRepository.findByEmail("john.doe@example.com").isEmpty()) {
            User john = User.builder()
                    .email("john.doe@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(john);
            System.out.println("John Doe user created successfully");
        }

        if (userRepository.findByEmail("jane.smith@example.com").isEmpty()) {
            User jane = User.builder()
                    .email("jane.smith@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(jane);
            System.out.println("Jane Smith user created successfully");
        }

        if (userRepository.findByEmail("newuser@example.com").isEmpty()) {
            User newUser = User.builder()
                    .email("newuser@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(newUser);
            System.out.println("New user created successfully");
        }

        if (userRepository.findByEmail("gatewayuser@example.com").isEmpty()) {
            User gatewayUser = User.builder()
                    .email("gatewayuser@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(gatewayUser);
            System.out.println("Gateway user created successfully");
        }

        if (userRepository.findByEmail("signupuser@example.com").isEmpty()) {
            User signupUser = User.builder()
                    .email("signupuser@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(signupUser);
            System.out.println("Signup user created successfully");
        }
    }
}