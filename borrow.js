// ==========================================
// NNSHS LIBRARY MANAGEMENT SYSTEM
// borrow.js
// ==========================================

const borrowForm =
    document.getElementById("borrowForm");



/* ===============================
   CREATE SUCCESS MESSAGE
=============================== */

const successMessage =
    document.createElement("div");

successMessage.className =
    "success-message";

successMessage.textContent =
    "Your borrow request has been submitted successfully!";

borrowForm.appendChild(successMessage);



/* ===============================
   FORM SUBMIT
=============================== */

borrowForm.addEventListener(

    "submit",

    function(event){

        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value.trim();

        const studentNumber =
            document.getElementById("studentNumber").value.trim();

        const gradeSection =
            document.getElementById("gradeSection").value.trim();

        const bookTitle =
            document.getElementById("bookTitle").value.trim();

        const bookAuthor =
            document.getElementById("bookAuthor").value.trim();

        const borrowDate =
            document.getElementById("borrowDate").value;

        const returnDate =
            document.getElementById("returnDate").value;

        const purpose =
            document.getElementById("purpose").value.trim();

        if(

            studentName === "" ||

            studentNumber === "" ||

            gradeSection === "" ||

            bookTitle === "" ||

            bookAuthor === "" ||

            borrowDate === "" ||

            returnDate === "" ||

            purpose === ""

        ){

            alert("Please complete all required fields.");

            return;

        }

        successMessage.style.display = "block";
        /* ===============================
           SAVE TO LOCAL STORAGE
        =============================== */

        const borrowRequest = {

            studentName,

            studentNumber,

            gradeSection,

            bookTitle,

            bookAuthor,

            borrowDate,

            returnDate,

            purpose,

            status: "Pending",

            dateSubmitted:
                new Date().toLocaleString()

        };

        const requests =

            JSON.parse(

                localStorage.getItem("borrowRequests")

            ) || [];

        requests.push(borrowRequest);

        localStorage.setItem(

            "borrowRequests",

            JSON.stringify(requests)

        );



        /* ===============================
           RESET FORM
        =============================== */

        borrowForm.reset();



        setTimeout(() => {

            successMessage.style.display = "none";

        }, 3000);

    }

);



/* ===============================
   DATE VALIDATION
=============================== */

const borrowDateInput =

    document.getElementById("borrowDate");

const returnDateInput =

    document.getElementById("returnDate");



returnDateInput.addEventListener(

    "change",

    () => {

        if(

            borrowDateInput.value &&

            returnDateInput.value < borrowDateInput.value

        ){

            alert(

                "Return date cannot be earlier than the borrow date."

            );

            returnDateInput.value = "";

        }

    }

);
