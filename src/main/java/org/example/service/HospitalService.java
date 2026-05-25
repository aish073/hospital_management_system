package org.example.service;

import org.example.entity.*;

public class HospitalService {

    public void registerPatient(Patient patient) {

        System.out.println(
                "\nPatient Registered Successfully!"
        );

        System.out.println(patient);
    }

    public void addDoctor(Doctor doctor) {

        System.out.println(
                "\nDoctor Added Successfully!"
        );

        System.out.println(doctor);
    }

    public void bookAppointment(Appointment appointment) {

        System.out.println(
                "\nAppointment Booked!"
        );

        System.out.println(appointment);
    }
}