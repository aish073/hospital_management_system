package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Hospital Management System is Running!";
    }
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Hospital API!";
    }
}