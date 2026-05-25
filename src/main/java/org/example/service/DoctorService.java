package org.example.service;

import org.example.entity.Doctor;
import org.example.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor addDoctor(Doctor doctor) {

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();
    }

    public Doctor updateDoctor(Doctor doctor) {

        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(String id) {

        doctorRepository.deleteById(id);
    }
}