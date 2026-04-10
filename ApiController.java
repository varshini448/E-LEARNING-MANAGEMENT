package com.elearning.lms.controller;

import com.elearning.lms.model.Course;
import com.elearning.lms.model.User;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows your JS to communicate with Java
public class ApiController {

    // Simulating database users
    User testUser = new User("student1", "password123", "Student");

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        if (username.equals(testUser.getUsername()) && password.equals(testUser.getPassword())) {
            return "SUCCESS:" + testUser.getRole();
        }
        return "FAILED:Invalid Credentials";
    }

    @GetMapping("/courses")
    public List<Course> getCourses() {
        // Simulating fetching courses from a database
        return Arrays.asList(
            new Course("CS101", "Python Programming", "Learn Python from scratch."),
            new Course("IT202", "Big Data Analytics", "Introduction to Hadoop and Spark."),
            new Course("IT303", "Internet of Things", "IoT architectures and sensor networks.")
        );
    }
}
