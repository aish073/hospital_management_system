package org.example.entity;

import jakarta.persistence.*;

@Entity
public class Appointment {

    @Id
    private String appointmentId;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Doctor doctor;

    private String appointmentDate;
    private String status;

    public Appointment() {

    }

    public Appointment(Patient patient,
                       Doctor doctor,
                       String appointmentDate,
                       String status) {

        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDate = appointmentDate;
        this.status = status;
    }
}