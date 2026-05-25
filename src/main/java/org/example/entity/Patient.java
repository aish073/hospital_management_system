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

    // EMPTY CONSTRUCTOR
    public Patient() {

        this.patientId =
                "PAT-" +
                        UUID.randomUUID()
                                .toString()
                                .substring(0,8);

        this.admissionDate = LocalDate.now();
    }

    // PARAMETERIZED CONSTRUCTOR
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

    // GETTERS
    public String getPatientId() {
        return patientId;
    }

    public String getFullName() {
        return fullName;
    }

    public int getAge() {
        return age;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public boolean isInsuranceApproved() {
        return insuranceApproved;
    }

    // SETTERS
    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public void setInsuranceApproved(boolean insuranceApproved) {
        this.insuranceApproved = insuranceApproved;
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
                (insuranceApproved ? "Approved" : "Pending");
    }
}