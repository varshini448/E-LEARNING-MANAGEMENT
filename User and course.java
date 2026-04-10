package com.elearning.lms.model;

public class User {
    private String username;
    private String password;
    private String role; // Student, Admin, Teacher

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getters
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
}
public class Course {
    private String courseId;
    private String title;
    private String description;

    public Course(String courseId, String title, String description) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
    }

    // Getters
    public String getCourseId() { return courseId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
}
