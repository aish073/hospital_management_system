// ---------- DATA MODELS ----------
let patients = [
    { id: "p1", name: "Ajay Deshmukh", symptoms: "chest pain", disease: "Hypertension", age: 58, bloodGroup: "B+", contact: "9822012345", doctorAssignedId: "d1", appointmentDateTime: "2026-06-05T10:30", status: "Scheduled" },
    { id: "p2", name: "Rohit Patil", symptoms: "fever & cough", disease: "Viral Fever", age: 34, bloodGroup: "O+", contact: "9922334455", doctorAssignedId: "d2", appointmentDateTime: "2026-06-04T14:00", status: "Completed" },
    { id: "p3", name: "Sneha Joshi", symptoms: "knee pain", disease: "Arthritis", age: 45, bloodGroup: "A+", contact: "9876543210", doctorAssignedId: "d3", appointmentDateTime: "2026-06-05T09:15", status: "Scheduled" },
    { id: "p4", name: "Manoj Shinde", symptoms: "migraine", disease: "Chronic headache", age: 29, bloodGroup: "AB+", contact: "9988776655", doctorAssignedId: "d2", appointmentDateTime: "2026-06-06T11:45", status: "Pending" }
];

let doctors = [
    { id: "d1", name: "Dr. Anil Kulkarni", specialization: "Cardiologist", experience: 12, shiftTiming: "9AM-5PM", availability: "Available", assignedPatientIds: ["p1"] },
    { id: "d2", name: "Dr. Madhuri Desai", specialization: "General Physician", experience: 8, shiftTiming: "10AM-6PM", availability: "Busy", assignedPatientIds: ["p2","p4"] },
    { id: "d3", name: "Dr. Suresh Jadhav", specialization: "Orthopedic", experience: 15, shiftTiming: "8AM-4PM", availability: "Available", assignedPatientIds: ["p3"] }
];

let appointments = [
    { id: "a1", patientId: "p1", symptoms: "chest pain", assignedDoctorId: "d1", bookingDate: "2026-06-01", visitTime: "10:30 AM", arrivalTime: "10:15 AM", notes: "ECG required", status: "Confirmed" },
    { id: "a2", patientId: "p2", symptoms: "high fever", assignedDoctorId: "d2", bookingDate: "2026-06-02", visitTime: "2:00 PM", arrivalTime: "1:45 PM", notes: "blood test", status: "Completed" },
    { id: "a3", patientId: "p3", symptoms: "joint swelling", assignedDoctorId: "d3", bookingDate: "2026-06-03", visitTime: "9:15 AM", arrivalTime: "9:00 AM", notes: "X-ray", status: "Scheduled" },
    { id: "a4", patientId: "p4", symptoms: "migraine", assignedDoctorId: "d2", bookingDate: "2026-06-04", visitTime: "11:45 AM", arrivalTime: "11:30 AM", notes: "MRI review", status: "Pending" }
];

// Helper: sync doctor assigned patients based on current patient list
function syncDoctorAssignedPatients() {
    doctors.forEach(doc => {
        doc.assignedPatientIds = patients.filter(p => p.doctorAssignedId === doc.id).map(p => p.id);
    });
}
syncDoctorAssignedPatients();

// Auto-assign doctor based on symptom keywords
function autoAssignDoctorBySymptoms(symptomsText) {
    const text = symptomsText.toLowerCase();
    if (text.includes("chest") || text.includes("heart") || text.includes("cardiac"))
        return doctors.find(d => d.specialization === "Cardiologist")?.id || doctors[0]?.id;
    if (text.includes("bone") || text.includes("joint") || text.includes("knee") || text.includes("fracture"))
        return doctors.find(d => d.specialization === "Orthopedic")?.id || doctors[2]?.id;
    return doctors.find(d => d.specialization === "General Physician")?.id || doctors[1]?.id;
}

// Helper functions to get names
function getDoctorName(id) {
    return doctors.find(d => d.id === id)?.name || "Not Assigned";
}
function getPatientName(id) {
    return patients.find(p => p.id === id)?.name || "Unknown";
}
function getDoctorAvailabilityClass(avail) {
    return avail === "Available" ? "badge-available" : (avail === "Busy" ? "badge-busy" : "badge-leave");
}

let currentView = "dashboard";

// ---------- RENDER FUNCTIONS ----------
function render() {
    if (currentView === "dashboard") renderDashboard();
    else if (currentView === "patients") renderPatients();
    else if (currentView === "doctors") renderDoctors();
    else if (currentView === "appointments") renderAppointments();
}

function renderDashboard() {
    const totalPatients = patients.length;
    const totalDoctors = doctors.length;
    const totalAppointments = appointments.length;
    const availableDoctors = doctors.filter(d => d.availability === "Available").length;
    const today = new Date().toISOString().slice(0,10);
    const todayAppointments = appointments.filter(a => a.bookingDate === today).length;
    const upcomingVisits = appointments.filter(a => a.status === "Scheduled" || a.status === "Confirmed").slice(0,4);
    const recentActivities = [...appointments].sort((a,b)=>b.bookingDate.localeCompare(a.bookingDate)).slice(0,3);

    let doctorMappingHtml = `<div class="glass-panel"><div class="section-header"><h3>Patient-Doctor Mapping</h3></div><table><thead><tr><th>Patient</th><th>Doctor</th><th>Status</th></tr></thead><tbody>`;
    patients.forEach(p => {
        doctorMappingHtml += `<tr><td>${p.name}</td><td>${getDoctorName(p.doctorAssignedId)}</td><td>${p.status}</td></tr>`;
    });
    doctorMappingHtml += `</tbody></table></div>`;

    let upcomingHtml = `<div class="glass-panel"><div class="section-header"><h3>Upcoming Visits</h3></div><table><thead><tr><th>Patient</th><th>Doctor</th><th>Date/Time</th><th>Status</th></tr></thead><tbody>`;
    upcomingVisits.forEach(a => {
        let pat = getPatientName(a.patientId);
        let doc = getDoctorName(a.assignedDoctorId);
        upcomingHtml += `<tr><td>${pat}</td><td>${doc}</td><td>${a.visitTime} (${a.bookingDate})</td><td>${a.status}</td></tr>`;
    });
    upcomingHtml += `</tbody></table></div>`;

    let recentHtml = `<div class="glass-panel"><div class="section-header"><h3>Recent Activities</h3></div><table><thead><tr><th>Event</th><th>Details</th></tr></thead><tbody>`;
    recentActivities.forEach(a => {
        recentHtml += `<tr><td>Appointment</td><td>${getPatientName(a.patientId)} with ${getDoctorName(a.assignedDoctorId)} on ${a.bookingDate}</td></tr>`;
    });
    recentHtml += `</tbody></table></div>`;

    const assignedDoctorsList = doctors.map(d => `<div class="stat-card" style="margin:0.5rem"><b>${d.name}</b> (${d.specialization})<br>Available: ${d.availability}<br>Patients: ${d.assignedPatientIds.length}</div>`).join('');

    document.getElementById("viewContainer").innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-title">Total Patients</div><div class="stat-number">${totalPatients}</div></div>
      <div class="stat-card"><div class="stat-title">Total Doctors</div><div class="stat-number">${totalDoctors}</div></div>
      <div class="stat-card"><div class="stat-title">Total Appointments</div><div class="stat-number">${totalAppointments}</div></div>
      <div class="stat-card"><div class="stat-title">Doctor Availability</div><div class="stat-number">${availableDoctors}/${totalDoctors}</div></div>
      <div class="stat-card"><div class="stat-title">Today's Appointments</div><div class="stat-number">${todayAppointments}</div></div>
    </div>
    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px,1fr));">
      <div>${doctorMappingHtml}</div>
      <div>${upcomingHtml}</div>
    </div>
    <div class="stats-grid" style="grid-template-columns: 1fr 1fr;">
      <div>${recentHtml}</div>
      <div class="glass-panel"><div class="section-header"><h3>Assigned Doctors</h3></div><div style="padding:1rem; gap:12px; display:flex; flex-wrap:wrap;">${assignedDoctorsList}</div></div>
    </div>
    <div style="text-align:right; margin-top:1rem;"><button class="btn-primary" onclick="expandDashboardDetails()"><i class="fas fa-chart-line"></i> Expand Analytics</button></div>
  `;
}

function renderPatients() {
    let html = `<div class="glass-panel"><div class="section-header"><h3><i class="fas fa-users"></i> Patient Registry</h3><button class="btn-primary" onclick="openAddPatientModal()"><i class="fas fa-plus"></i> Register Patient</button></div><table><thead><tr><th>Name</th><th>Symptoms/Disease</th><th>Age/BGrp</th><th>Contact</th><th>Doctor Assigned</th><th>Appt DateTime</th><th>Status</th><th></th></tr></thead><tbody>`;
    patients.forEach(p => {
        html += `<tr>
      <td>${p.name}</td>
      <td>${p.symptoms} / ${p.disease}</td>
      <td>${p.age} / ${p.bloodGroup}</td>
      <td>${p.contact}</td>
      <td>${getDoctorName(p.doctorAssignedId)}</td>
      <td>${p.appointmentDateTime.replace('T',' ')}</td>
      <td><span class="badge badge-scheduled">${p.status}</span></td>
      <td><i class="fas fa-trash-alt delete-btn" onclick="deletePatient('${p.id}')"></i></td>
    </tr>`;
    });
    html += `</tbody></table></div>`;
    document.getElementById("viewContainer").innerHTML = html;
}

function renderDoctors() {
    let html = `<div class="glass-panel"><div class="section-header"><h3><i class="fas fa-stethoscope"></i> Medical Staff</h3><button class="btn-primary" onclick="openAddDoctorModal()"><i class="fas fa-user-plus"></i> Add Doctor</button></div><table><thead><tr><th>Name</th><th>Specialization</th><th>Experience</th><th>Shift</th><th>Availability</th><th>Assigned Patients</th><th></th></tr></thead><tbody>`;
    doctors.forEach(d => {
        const assignedCount = patients.filter(p => p.doctorAssignedId === d.id).length;
        html += `<tr>
      <td>${d.name}</td>
      <td>${d.specialization}</td>
      <td>${d.experience} yrs</td>
      <td>${d.shiftTiming}</td>
      <td><span class="badge ${getDoctorAvailabilityClass(d.availability)}">${d.availability}</span></td>
      <td>${assignedCount} patients</td>
      <td><i class="fas fa-trash-alt delete-btn" onclick="deleteDoctor('${d.id}')"></i></td>
    </tr>`;
    });
    html += `</tbody></table></div>`;
    document.getElementById("viewContainer").innerHTML = html;
}

function renderAppointments() {
    let html = `<div class="glass-panel"><div class="section-header"><h3><i class="fas fa-calendar-alt"></i> Appointment Schedule</h3><button class="btn-primary" onclick="openAddAppointmentModal()"><i class="fas fa-plus"></i> New Appointment + Auto-assign</button></div><table><thead><tr><th>Patient</th><th>Symptoms</th><th>Doctor</th><th>Booking Date</th><th>Visit Time</th><th>Status</th><th>Notes</th><th></th></tr></thead><tbody>`;
    appointments.forEach(a => {
        html += `<tr>
      <td>${getPatientName(a.patientId)}</td>
      <td>${a.symptoms}</td>
      <td>${getDoctorName(a.assignedDoctorId)}</td>
      <td>${a.bookingDate}</td>
      <td>${a.visitTime}</td>
      <td><span class="badge badge-scheduled">${a.status}</span></td>
      <td>${a.notes}</td>
      <td><i class="fas fa-trash-alt delete-btn" onclick="deleteAppointment('${a.id}')"></i></td>
    </tr>`;
    });
    html += `</tbody></table></div>`;
    document.getElementById("viewContainer").innerHTML = html;
}

// ---------- MODAL & CRUD OPERATIONS ----------
const modalEl = document.getElementById("genericModal");
function showModal(innerHtml) {
    document.getElementById("modalDynamic").innerHTML = innerHtml;
    modalEl.style.display = "flex";
}
window.closeModal = function() {
    modalEl.style.display = "none";
};
window.onclick = function(e) {
    if (e.target === modalEl) modalEl.style.display = "none";
};

function openAddPatientModal() {
    let docOptions = doctors.map(d => `<option value="${d.id}">${d.name} (${d.specialization})</option>`).join('');
    showModal(`
    <h3>Register New Patient</h3>
    <input type="text" id="patName" placeholder="Full Name (Marathi Surname e.g. Deshmukh)" value="Pratik Joshi">
    <input type="text" id="patSymptoms" placeholder="Symptoms" value="fever, cough">
    <input type="text" id="patDisease" placeholder="Disease" value="Common Cold">
    <input type="number" id="patAge" placeholder="Age" value="32">
    <input type="text" id="patBlood" placeholder="Blood Group" value="O+">
    <input type="text" id="patContact" placeholder="Contact" value="9988776655">
    <select id="patDoctor">${docOptions}</select>
    <input type="datetime-local" id="patDateTime" value="2026-06-10T11:00">
    <select id="patStatus"><option>Scheduled</option><option>Pending</option><option>Completed</option></select>
    <div class="flex-btns"><button class="btn-primary" id="confirmPatient">Add Patient</button><button class="btn-primary" onclick="closeModal()">Cancel</button></div>
  `);
    document.getElementById("confirmPatient").onclick = () => {
        const newId = "p"+Date.now();
        const docId = document.getElementById("patDoctor").value;
        const newPatient = {
            id: newId,
            name: document.getElementById("patName").value,
            symptoms: document.getElementById("patSymptoms").value,
            disease: document.getElementById("patDisease").value,
            age: parseInt(document.getElementById("patAge").value),
            bloodGroup: document.getElementById("patBlood").value,
            contact: document.getElementById("patContact").value,
            doctorAssignedId: docId,
            appointmentDateTime: document.getElementById("patDateTime").value,
            status: document.getElementById("patStatus").value
        };
        patients.push(newPatient);
        syncDoctorAssignedPatients();
        closeModal();
        render();
        if(currentView === "patients") renderPatients();
        else render();
    };
}

function openAddDoctorModal() {
    showModal(`
    <h3>Add New Doctor</h3>
    <input type="text" id="docName" placeholder="Full Name" value="Dr. Ashutosh More">
    <input type="text" id="docSpecial" placeholder="Specialization" value="Neurologist">
    <input type="number" id="docExp" placeholder="Experience (years)" value="6">
    <input type="text" id="docShift" placeholder="Shift Timing" value="9AM-3PM">
    <select id="docAvail"><option>Available</option><option>Busy</option><option>On Leave</option></select>
    <div class="flex-btns"><button class="btn-primary" id="confirmDoctor">Add Doctor</button><button onclick="closeModal()">Cancel</button></div>
  `);
    document.getElementById("confirmDoctor").onclick = () => {
        const newId = "d"+Date.now();
        doctors.push({
            id: newId,
            name: document.getElementById("docName").value,
            specialization: document.getElementById("docSpecial").value,
            experience: parseInt(document.getElementById("docExp").value),
            shiftTiming: document.getElementById("docShift").value,
            availability: document.getElementById("docAvail").value,
            assignedPatientIds: []
        });
        syncDoctorAssignedPatients();
        closeModal();
        render();
        if(currentView === "doctors") renderDoctors();
        else render();
    };
}

function openAddAppointmentModal() {
    let patientOptions = patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    showModal(`
    <h3>Create Appointment + Auto-Assign Doctor</h3>
    <select id="appPatient">${patientOptions}</select>
    <input type="text" id="appSymptoms" placeholder="Describe symptoms" value="chest discomfort">
    <button class="btn-primary" id="autoAssignBtn" style="background:#2c5282; margin-bottom:10px;">Auto-assign Doctor</button>
    <select id="assignedDoctorSelect">${doctors.map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}</select>
    <input type="date" id="appBookingDate" value="${new Date().toISOString().slice(0,10)}">
    <input type="text" id="appVisitTime" placeholder="Visit Time" value="11:00 AM">
    <input type="text" id="appArrival" placeholder="Arrival Time" value="10:45 AM">
    <textarea id="appNotes" placeholder="Notes"></textarea>
    <select id="appStatus"><option>Scheduled</option><option>Confirmed</option><option>Pending</option></select>
    <div class="flex-btns"><button class="btn-primary" id="saveAppointment">Save Appointment</button><button onclick="closeModal()">Cancel</button></div>
  `);
    document.getElementById("autoAssignBtn").onclick = () => {
        const symptoms = document.getElementById("appSymptoms").value;
        const bestDocId = autoAssignDoctorBySymptoms(symptoms);
        const selectDoc = document.getElementById("assignedDoctorSelect");
        if(bestDocId && selectDoc.querySelector(`option[value="${bestDocId}"]`)) selectDoc.value = bestDocId;
        else alert("Doctor auto-assigned based on symptom mapping.");
    };
    document.getElementById("saveAppointment").onclick = () => {
        const patientId = document.getElementById("appPatient").value;
        const symptomsVal = document.getElementById("appSymptoms").value;
        const docId = document.getElementById("assignedDoctorSelect").value;
        const newId = "a"+Date.now();
        appointments.push({
            id: newId,
            patientId: patientId,
            symptoms: symptomsVal,
            assignedDoctorId: docId,
            bookingDate: document.getElementById("appBookingDate").value,
            visitTime: document.getElementById("appVisitTime").value,
            arrivalTime: document.getElementById("appArrival").value,
            notes: document.getElementById("appNotes").value,
            status: document.getElementById("appStatus").value
        });
        closeModal();
        render();
        if(currentView === "appointments") renderAppointments();
        else render();
    };
}

function deletePatient(id) {
    patients = patients.filter(p => p.id !== id);
    syncDoctorAssignedPatients();
    render();
    if(currentView === "patients") renderPatients();
    else render();
}
function deleteDoctor(id) {
    doctors = doctors.filter(d => d.id !== id);
    syncDoctorAssignedPatients();
    render();
    if(currentView === "doctors") renderDoctors();
    else render();
}
function deleteAppointment(id) {
    appointments = appointments.filter(a => a.id !== id);
    render();
    if(currentView === "appointments") renderAppointments();
    else render();
}
function expandDashboardDetails() {
    alert("📈 Detailed analytics: all vitals and trends are available in premium insight module.");
}

// ---------- NAVIGATION & CLOCK ----------
function setActiveView(view) {
    currentView = view;
    document.querySelectorAll(".nav-item").forEach(nav => {
        nav.classList.remove("active");
        if (nav.getAttribute("data-view") === view) nav.classList.add("active");
    });
    render();
}

function updateClock() {
    let now = new Date();
    let formatted = now.toLocaleDateString('en-IN') + " | " + now.toLocaleTimeString('en-IN');
    document.getElementById("liveClock").innerText = formatted;
}

// Attach global functions for onclick handlers
window.openAddPatientModal = openAddPatientModal;
window.openAddDoctorModal = openAddDoctorModal;
window.openAddAppointmentModal = openAddAppointmentModal;
window.deletePatient = deletePatient;
window.deleteDoctor = deleteDoctor;
window.deleteAppointment = deleteAppointment;
window.expandDashboardDetails = expandDashboardDetails;
window.setActiveView = setActiveView;

// Initialize
document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => setActiveView(btn.getAttribute("data-view")));
});
setInterval(updateClock, 1000);
updateClock();
setActiveView("dashboard");