// ==========================================
// NNSHS LIBRARY MANAGEMENT SYSTEM
// admin.js
// ==========================================

const totalBooks =
    document.getElementById("totalBooks");

const borrowedBooks =
    document.getElementById("borrowedBooks");

const libraryVisitors =
    document.getElementById("libraryVisitors");

const researchCount =
    document.getElementById("researchCount");



/* ===============================
   LOAD LOCAL STORAGE
=============================== */

const books =

    JSON.parse(

        localStorage.getItem("books")

    ) || [];

const borrowRequests =

    JSON.parse(

        localStorage.getItem("borrowRequests")

    ) || [];

const libraryEntries =

    JSON.parse(

        localStorage.getItem("libraryEntries")

    ) || [];

const researches =

    JSON.parse(

        localStorage.getItem("researches")

    ) || [];



/* ===============================
   UPDATE DASHBOARD
=============================== */

function updateDashboard(){

    totalBooks.textContent =
        books.length;

    borrowedBooks.textContent =
        borrowRequests.length;

    libraryVisitors.textContent =
        libraryEntries.length;

    researchCount.textContent =
        researches.length;

}



/* ===============================
   PAGE INITIALIZATION
=============================== */

updateDashboard();
/* ===============================
   RECENT ACTIVITY
=============================== */

function updateRecentActivity(){

    const activityItems =

        document.querySelectorAll(".activity-item");

    if(activityItems.length === 0){

        return;

    }

    if(libraryEntries.length > 0){

        const latest =

            libraryEntries[libraryEntries.length - 1];

        activityItems[1].querySelector("p").textContent =

            `${latest.studentName} entered the library.`;

    }

    if(borrowRequests.length > 0){

        const latestBorrow =

            borrowRequests[borrowRequests.length - 1];

        activityItems[0].querySelector("p").textContent =

            `${latestBorrow.studentName} borrowed "${latestBorrow.bookTitle}".`;

    }

}



/* ===============================
   AUTO REFRESH
=============================== */

window.addEventListener("storage", () => {

    location.reload();

});



/* ===============================
   INITIALIZE PAGE
=============================== */

window.addEventListener("load", () => {

    updateDashboard();

    updateRecentActivity();

});



/* ===============================
   FIREBASE READY
=============================== */

/*

Future Firebase Integration

- Load Books from Firestore
- Load Borrow Requests
- Load Library Entries
- Load Research Repository
- Update Dashboard Statistics
- Real-time Synchronization

Example:

onSnapshot(collection(db,"books"), ...)

*/



/* ===============================
   END OF FILE
=============================== */
