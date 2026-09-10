package com.examly.springapp.service.impl;

import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserProfile(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new ResourceNotFoundException("Email is required to fetch profile");
        }
        String cleanEmail = email.trim();
        return userRepository.findByEmailIgnoreCase(cleanEmail)
                .or(() -> userRepository.findByEmail(cleanEmail))
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found for email: " + cleanEmail));
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }
}

