package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "User profile and account operations")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Retrieve current authenticated user profile details")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "User profile retrieved successfully")
    public ResponseEntity<User> getProfile(Authentication authentication, @RequestParam(value = "email", required = false) String email) {
        String queryEmail = null;
        if (email != null && !email.trim().isEmpty()) {
            queryEmail = email.trim();
        } else if (authentication != null && authentication.getName() != null && !authentication.getName().equalsIgnoreCase("anonymousUser")) {
            queryEmail = authentication.getName();
        }

        if (queryEmail == null || queryEmail.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userService.getUserProfile(queryEmail);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user account", description = "Delete a user account by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "User deleted successfully")
    public ResponseEntity<java.util.Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Record deleted successfully."));
    }
}

