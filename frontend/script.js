const API = "https://hospitalmanagementsystem-production-3a22.up.railway.app";

async function loadDashboard() {

    try {

        document.getElementById("patientCount").innerText = "Loading...";
        document.getElementById("doctorCount").innerText = "Loading...";
        document.getElementById("appointmentCount").innerText = "Loading...";

        const patients =
            await fetch(API + "/patient").then(r=>r.json());

        const doctors =
            await fetch(API + "/doctor").then(r=>r.json());

        const appointments =
            await fetch(API + "/appointment").then(r=>r.json());

        document.getElementById("patientCount").innerText =
            patients.length;

        document.getElementById("doctorCount").innerText =
            doctors.length;

        document.getElementById("appointmentCount").innerText =
            appointments.length;

    }

    catch(error){

        alert("ERROR: " + error);

        document.getElementById("patientCount").innerText="ERR";
        document.getElementById("doctorCount").innerText="ERR";
        document.getElementById("appointmentCount").innerText="ERR";

    }

}

loadDashboard();