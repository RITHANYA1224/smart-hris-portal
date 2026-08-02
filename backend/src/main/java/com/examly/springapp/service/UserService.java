package com.examly.springapp.service;

import com.examly.springapp.model.User;

public interface UserService {
    User getUserProfile(String email);
    void deleteUser(Long id);
}

