package org.example.entity;

import jakarta.persistence.*;

import java.util.UUID;

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

    // EMPTY CONSTRUCTOR
    public Appointment() {

        this.appointmentId =
                "APP-" +
                        UUID.randomUUID()
                                .toString()
                                .substring(0,8);
    }

    // PARAMETERIZED CONSTRUCTOR
    public Appointment(Patient patient,
                       Doctor doctor,
                       String appointmentDate,
                       String status) {

        this.appointmentId =
                "APP-" +
                        UUID.randomUUID()
                                .toString()
                                .substring(0,8);

        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDate = appointmentDate;
        this.status = status;
    }

    // GETTERS
    public String getAppointmentId() {
        return appointmentId;
    }

    public Patient getPatient() {
        return patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public String getStatus() {
        return status;
    }

    // SETTERS
    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}