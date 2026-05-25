package org.example.service;

import org.example.entity.Patient;
import org.example.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient addPatient(Patient patient) {

        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {

        return patientRepository.findAll();
    }

    public Patient updatePatient(Patient patient) {

        return patientRepository.save(patient);
    }

    public void deletePatient(String id) {

        patientRepository.deleteById(id);
    }
}