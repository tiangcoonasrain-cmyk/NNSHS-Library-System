// ==========================================
// NNSHS LIBRARY MANAGEMENT SYSTEM
// leaderboard.js
// ==========================================

const leaderboardTable =
    document.querySelector("#leaderboardTable tbody");

const firstName =
    document.getElementById("firstName");

const firstPoints =
    document.getElementById("firstPoints");

const secondName =
    document.getElementById("secondName");

const secondPoints =
    document.getElementById("secondPoints");

const thirdName =
    document.getElementById("thirdName");

const thirdPoints =
    document.getElementById("thirdPoints");



/* ===============================
   LOAD BORROW RECORDS
=============================== */

const borrowRequests =

    JSON.parse(

        localStorage.getItem("borrowRequests")

    ) || [];



/* ===============================
   COMPUTE LEADERBOARD
=============================== */

const students = {};

borrowRequests.forEach(record => {

    const key =

        record.studentNumber;

    if(!students[key]){

        students[key] = {

            name:
                record.studentName,

            studentNumber:
                record.studentNumber,

            gradeSection:
                record.gradeSection,

            books:0,

            points:0

        };

    }

    students[key].books += 1;

    students[key].points += 50;

});



const leaderboard =

    Object.values(students)

    .sort((a,b)=>

        b.points - a.points

    );
/* ===============================
   RENDER LEADERBOARD TABLE
=============================== */

function renderLeaderboard(){

    leaderboardTable.innerHTML = "";

    leaderboard.forEach((student, index) => {

        const row =

            document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.gradeSection}</td>

            <td>${student.books}</td>

            <td>${student.points}</td>

        `;

        leaderboardTable.appendChild(row);

    });

}



/* ===============================
   UPDATE TOP 3 CARDS
=============================== */

function updateTopThree(){

    if(leaderboard.length > 0){

        firstName.textContent =
            leaderboard[0].name;

        firstPoints.textContent =
            leaderboard[0].points + " Points";

    }

    if(leaderboard.length > 1){

        secondName.textContent =
            leaderboard[1].name;

        secondPoints.textContent =
            leaderboard[1].points + " Points";

    }

    if(leaderboard.length > 2){

        thirdName.textContent =
            leaderboard[2].name;

        thirdPoints.textContent =
            leaderboard[2].points + " Points";

    }

}
/* ===============================
   EMPTY LEADERBOARD
=============================== */

function checkEmptyLeaderboard(){

    if(leaderboard.length === 0){

        leaderboardTable.innerHTML = `

            <tr>

                <td colspan="5"
                    style="text-align:center;padding:30px;">

                    No borrow records found.

                </td>

            </tr>

        `;

    }

}



/* ===============================
   PAGE INITIALIZATION
=============================== */

renderLeaderboard();

updateTopThree();

checkEmptyLeaderboard();



/* ===============================
   AUTO REFRESH
=============================== */

window.addEventListener("storage", () => {

    location.reload();

});



/* ===============================
   END OF FILE
=============================== */
