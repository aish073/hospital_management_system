package org.example.controller;

import org.example.entity.Appointment;
import org.example.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/appointment")
    public Appointment addAppointment(
            @RequestBody Appointment appointment) {

        return appointmentService
                .addAppointment(appointment);
    }

    @GetMapping("/appointment")
    public List<Appointment> getAllAppointments() {

        return appointmentService
                .getAllAppointments();
    }

    @PutMapping("/appointment")
    public Appointment updateAppointment(
            @RequestBody Appointment appointment) {

        return appointmentService
                .updateAppointment(appointment);
    }

    @DeleteMapping("/appointment/{id}")
    public String deleteAppointment(
            @PathVariable String id) {

        appointmentService.deleteAppointment(id);

        return "Appointment Deleted Successfully!";
    }
}