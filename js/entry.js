// ==========================================
// NNSHS LIBRARY MANAGEMENT SYSTEM
// entry.js
// ==========================================

const entryForm = document.getElementById("entryForm");

const tableBody =
    document.querySelector("#entryTable tbody");

const totalEntries =
    document.getElementById("totalEntries");

const currentlyInside =
    document.getElementById("currentlyInside");

const lastEntry =
    document.getElementById("lastEntry");



/* ===============================
   SUCCESS MESSAGE
=============================== */

const successMessage =
    document.createElement("div");

successMessage.className =
    "success-message";

successMessage.textContent =
    "Library entry recorded successfully.";

entryForm.appendChild(successMessage);



/* ===============================
   LOAD SAVED ENTRIES
=============================== */

let entries =

    JSON.parse(

        localStorage.getItem("libraryEntries")

    ) || [];



/* ===============================
   UPDATE SUMMARY CARDS
=============================== */

function updateSummary(){

    totalEntries.textContent =
        entries.length;

    currentlyInside.textContent =
        entries.length;

    if(entries.length > 0){

        lastEntry.textContent =
            entries[entries.length - 1].timeIn;

    }

    else{

        lastEntry.textContent =
            "--";

    }

}



/* ===============================
   DISPLAY ENTRIES
=============================== */

function renderEntries(){

    tableBody.innerHTML = "";

    entries.forEach(entry => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${entry.studentName}</td>

            <td>${entry.studentNumber}</td>

            <td>${entry.gradeSection}</td>

            <td>${entry.purpose}</td>

            <td>${entry.timeIn}</td>

        `;

        tableBody.appendChild(row);

    });

}
/* ===============================
   SUBMIT ENTRY FORM
=============================== */

entryForm.addEventListener(

    "submit",

    function(event){

        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value.trim();

        const studentNumber =
            document.getElementById("studentNumber").value.trim();

        const gradeSection =
            document.getElementById("gradeSection").value.trim();

        const purpose =
            document.getElementById("purpose").value;

        const timeIn =
            document.getElementById("timeIn").value;

        if(

            studentName === "" ||

            studentNumber === "" ||

            gradeSection === "" ||

            purpose === "" ||

            timeIn === ""

        ){

            alert("Please complete all required fields.");

            return;

        }

        const newEntry = {

            studentName,

            studentNumber,

            gradeSection,

            purpose,

            timeIn,

            date:

                new Date().toLocaleDateString()

        };

        entries.push(newEntry);

        localStorage.setItem(

            "libraryEntries",

            JSON.stringify(entries)

        );

        renderEntries();

        updateSummary();

        successMessage.style.display = "block";

        entryForm.reset();

        setTimeout(() => {

            successMessage.style.display = "none";

        }, 3000);

    }

);
/* ===============================
   SORT ENTRIES
=============================== */

entries.sort((a, b) => {

    return a.studentName.localeCompare(b.studentName);

});



/* ===============================
   PAGE INITIALIZATION
=============================== */

renderEntries();

updateSummary();



/* ===============================
   AUTO SET CURRENT TIME
=============================== */

window.addEventListener("load", () => {

    const timeInput =
        document.getElementById("timeIn");

    if(timeInput){

        const now = new Date();

        const hours =
            String(now.getHours()).padStart(2, "0");

        const minutes =
            String(now.getMinutes()).padStart(2, "0");

        timeInput.value =
            `${hours}:${minutes}`;

    }

});



/* ===============================
   ENTER KEY SUPPORT
=============================== */

document.addEventListener("keydown", (event) => {

    if(

        event.key === "Enter" &&

        document.activeElement.tagName !== "TEXTAREA"

    ){

        // Allow normal form submission

    }

});



/* ===============================
   END OF FILE
=============================== */
