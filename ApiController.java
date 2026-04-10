package com.elearning.lms.controller;

import com.elearning.lms.model.Course;
import com.elearning.lms.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    // A list to act as our temporary Database
    private List<User> databaseUsers = new ArrayList<>();

    // Constructor to add a default test user when the server starts
    public ApiController() {
        databaseUsers.add(new User("student1", "password123", "Student"));
    }

    // --- NEW: REGISTRATION ENDPOINT ---
    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password, @RequestParam String role) {
        // Check if user already exists
        for (User u : databaseUsers) {
            if (u.getUsername().equals(username)) {
                return "FAILED"; // User already exists
            }
        }
        
        // Save new user
        databaseUsers.add(new User(username, password, role));
        System.out.println("New user registered: " + username);
        return "SUCCESS";
    }

    // --- UPDATED: LOGIN ENDPOINT ---
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        // Search through our list of registered users
        for (User u : databaseUsers) {
            if (u.getUsername().equals(username) && u.getPassword().equals(password)) {
                return "SUCCESS:" + u.getRole();
            }
        }
        return "FAILED:Invalid Credentials";
    }

    @GetMapping("/courses")
    public List<Course> getCourses() {
        return Arrays.asList(
            new Course("CS101", "Python Programming", "Learn Python from scratch."),
            new Course("IT202", "Big Data Analytics", "Introduction to Hadoop and Spark."),
            new Course("IT303", "Internet of Things", "IoT architectures and sensor networks.")
        );
    }
}
