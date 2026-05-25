package org.example.controller;

import org.example.entity.Doctor;
import org.example.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/doctor")
    public Doctor addDoctor(@RequestBody Doctor doctor) {

        return doctorService.addDoctor(doctor);
    }

    @GetMapping("/doctor")
    public List<Doctor> getDoctors() {

        return doctorService.getAllDoctors();
    }

    @PutMapping("/doctor")
    public Doctor updateDoctor(@RequestBody Doctor doctor) {

        return doctorService.updateDoctor(doctor);
    }

    @DeleteMapping("/doctor/{id}")
    public String deleteDoctor(@PathVariable String id) {

        doctorService.deleteDoctor(id);

        return "Doctor Deleted Successfully!";
    }
}