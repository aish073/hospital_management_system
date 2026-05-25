package org.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class Doctor {

    @Id
    private String doctorId;

    private String doctorName;
    private String specialization;
    private int experienceYears;

    // EMPTY CONSTRUCTOR (REQUIRED FOR JPA)
    public Doctor() {
        this.doctorId = "DOC-" +
                UUID.randomUUID().toString().substring(0,8);
    }

    // PARAMETERIZED CONSTRUCTOR
    public Doctor(String doctorName,
                  String specialization,
                  int experienceYears) {

        this.doctorId = "DOC-" +
                UUID.randomUUID().toString().substring(0,8);

        this.doctorName = doctorName;
        this.specialization = specialization;
        this.experienceYears = experienceYears;
    }

    // GETTERS
    public String getDoctorId() {
        return doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public int getExperienceYears() {
        return experienceYears;
    }

    // SETTERS
    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }

    @Override
    public String toString() {
        return "\n===== DOCTOR DETAILS =====" +
                "\nDoctor ID : " + doctorId +
                "\nDoctor Name : " + doctorName +
                "\nSpecialization : " + specialization +
                "\nExperience : " + experienceYears + " years";
    }
}