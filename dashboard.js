/*==================================
  Dashboard Functionality Handling JavaScript
  ==================================*/

function ShowUserFrequency() {
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    // --- Gender frequency ---
    let genderFreq = { Male: 0, Female: 0, Other: 0 };
    users.forEach(u => {
        let g = (u.gender || "").trim();
        if (g === "Male") genderFreq.Male++;
        else if (g === "Female") genderFreq.Female++;
        else genderFreq.Other++;
    });

    let maxGender = Math.max(genderFreq.Male, genderFreq.Female, genderFreq.Other, 1);

    let genderBarHTML = "";
    for (let [label, count] of Object.entries(genderFreq)) {
        genderBarHTML += `
            <div class="bar-row">
                <span class="bar-label">${label}</span>
                <div class="bar" style="width:${80 + count/maxGender*280}px"></div>
                <span class="bar-count">${count}</span>
            </div>
        `;
    }
    document.getElementById("genderChart").innerHTML = genderBarHTML;

    // --- Age Group frequency data ---
    // Age buckets: 18-25, 26-35, 36-50, 51+
    let ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "51+": 0 };

    let today = new Date();
    for (let u of users) {
        let dob = new Date(u.dateofbirth);
        let age = today.getFullYear() - dob.getFullYear();
        let m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        // Assign bucket
        if (age >= 18 && age <= 25) ageGroups["18-25"]++;
        else if (age <= 35) ageGroups["26-35"]++;
        else if (age <= 50) ageGroups["36-50"]++;
        else if (age > 50) ageGroups["51+"]++;
    }

    let maxAge = Math.max(...Object.values(ageGroups), 1);
    let ageBarHTML = "";
    for (let [label, count] of Object.entries(ageGroups)) {
        ageBarHTML += `
            <div class="bar-row">
                <span class="bar-label">${label}</span>
                <div class="bar" style="width:${80 + count/maxAge*280}px"></div>
                <span class="bar-count">${count}</span>
            </div>
        `;
    }
    document.getElementById("ageChart").innerHTML = ageBarHTML;
}

// -------- Invoice Search by TRN --------
function ShowInvoices() {
    let trn = document.getElementById("trnSearch").value.trim();
    let invoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    let filtered = invoices;
    if (trn) filtered = invoices.filter(inv => inv.trn === trn);

    let output = "";
    if (filtered.length === 0) {
        output = "<em>No invoices found for TRN.</em>";
    } else {
        output = "<b>Invoices Found:</b><br>";
        filtered.forEach(inv => {
            
            output += `
            <div>
              <span style="color:#ff4c4c"><b>Invoice #:${inv.invoiceNumber}</b></span> | <b>Date:</b> ${inv.date} 
              <br><b>Name:</b> ${inv.customer.name} | <b>TRN:</b> ${inv.trn}
              <br><b>Total:</b> $${inv.total}
              <br>
              <span style="font-size:0.97em;color:#3c3c3c;">${inv.items && inv.items.length ? inv.items.map(i=>`${i.name} ×${i.quantity}`).join(', ') : ''}</span>
            </div>
            <hr>`;
        });
    }
    document.getElementById("invoiceResults").innerHTML = output;
    // Logs results to console for debugging purposes
    console.log(filtered);
}

// Render all charts on page load
window.onload = ShowUserFrequency;
