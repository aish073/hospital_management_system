package org.example;
import org.example.entity.Patient;
import org.example.entity.Doctor;
import org.example.entity.Appointment;
import org.example.service.HospitalService;
public class Main {

    public static void main(String[] args) {

        Patient patient1 =
                new Patient(
                        "Rahul Sharma",
                        24,
                        "O+",
                        "Dengue Fever",
                        "9876543210",
                        true
                );

        System.out.println(patient1);

        Doctor doctor1 = new Doctor(
                "Dr. Sharma",
                "Cardiologist",
                10
        );

        System.out.println(doctor1);

        Appointment appointment1 =
                new Appointment(
                        patient1,
                        doctor1,
                        "25-May-2026",
                        "Confirmed"
                );

        HospitalService service =
                new HospitalService();

        service.registerPatient(patient1);

        service.addDoctor(doctor1);

        service.bookAppointment(appointment1);
    }
}