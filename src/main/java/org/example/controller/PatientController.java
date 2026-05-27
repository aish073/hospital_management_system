package org.example.controller;

import org.example.entity.Patient;
import org.example.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/patient")
    public Patient addPatient(@RequestBody Patient patient) {

        return patientService.addPatient(patient);
    }

    @GetMapping("/patient")
    public List<Patient> getPatients() {

        return patientService.getAllPatients();
    }

    @PutMapping("/patient")
    public Patient updatePatient(@RequestBody Patient patient) {

        return patientService.updatePatient(patient);
    }

    @DeleteMapping("/patient/{id}")
    public String deletePatient(@PathVariable String id) {

        patientService.deletePatient(id);

        return "Patient Deleted Successfully!";
    }
}