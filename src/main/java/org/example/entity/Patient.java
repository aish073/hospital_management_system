package org.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Patient {

    @Id
    private String patientId;

    private String fullName;
    private int age;
    private String bloodGroup;
    private String diagnosis;
    private String emergencyContact;
    private LocalDate admissionDate;
    private boolean insuranceApproved;

    public Patient() {

    }

    public Patient(String fullName,
                   int age,
                   String bloodGroup,
                   String diagnosis,
                   String emergencyContact,
                   boolean insuranceApproved) {

        this.patientId =
                "PAT-" +
                        UUID.randomUUID()
                                .toString()
                                .substring(0,8);

        this.fullName = fullName;
        this.age = age;
        this.bloodGroup = bloodGroup;
        this.diagnosis = diagnosis;
        this.emergencyContact = emergencyContact;
        this.admissionDate = LocalDate.now();
        this.insuranceApproved = insuranceApproved;
    }

    public String getPatientId() {
        return patientId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    @Override
    public String toString() {

        return "\n========= PATIENT RECORD =========" +
                "\nPatient ID : " + patientId +
                "\nName : " + fullName +
                "\nAge : " + age +
                "\nBlood Group : " + bloodGroup +
                "\nDiagnosis : " + diagnosis +
                "\nEmergency Contact : " + emergencyContact +
                "\nAdmission Date : " + admissionDate +
                "\nInsurance : " +
                (insuranceApproved
                        ? "Approved"
                        : "Pending");
    }
}