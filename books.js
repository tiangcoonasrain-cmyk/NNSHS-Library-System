// ==========================================
// NNSHS LIBRARY MANAGEMENT SYSTEM
// books.js
// ==========================================

const searchInput = document.getElementById("searchInput");
const gradeFilter = document.getElementById("gradeFilter");
const subjectFilter = document.getElementById("subjectFilter");

const books = document.querySelectorAll(".book-card");



/* ===============================
   SEARCH + FILTER
=============================== */

function filterBooks() {

    const keyword = searchInput.value.toLowerCase();

    const grade = gradeFilter.value;

    const subject = subjectFilter.value;

    books.forEach(book => {

        const title =
            book.querySelector("h3")
                .textContent
                .toLowerCase();

        const author =
            book.querySelector(".book-author")
                .textContent
                .toLowerCase();

        const bookGrade =
            book.dataset.grade;

        const bookSubject =
            book.dataset.subject;

        const matchKeyword =
            title.includes(keyword) ||
            author.includes(keyword);

        const matchGrade =
            grade === "all" ||
            grade === bookGrade;

        const matchSubject =
            subject === "all" ||
            subject === bookSubject;

        if (
            matchKeyword &&
            matchGrade &&
            matchSubject
        ) {

            book.style.display = "flex";

        }

        else {

            book.style.display = "none";

        }

    });

}



/* ===============================
   EVENT LISTENERS
=============================== */

searchInput.addEventListener(

    "keyup",

    filterBooks

);

gradeFilter.addEventListener(

    "change",

    filterBooks

);

subjectFilter.addEventListener(

    "change",

    filterBooks

);
/* ===============================
   BOOK DETAILS MODAL
=============================== */

const modal = document.getElementById("bookModal");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalAuthor = document.getElementById("modalAuthor");

const modalSubject = document.getElementById("modalSubject");

const modalGrade = document.getElementById("modalGrade");

const modalStatus = document.getElementById("modalStatus");

const modalDescription =
    document.getElementById("modalDescription");

const closeModal =
    document.querySelector(".close-modal");



const viewButtons =
    document.querySelectorAll(".book-btn");



viewButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".book-card");

        const image =
            card.querySelector("img").src;

        const title =
            card.querySelector("h3").textContent;

        const author =
            card.querySelector(".book-author").textContent;

        const grade =
            card.querySelector(".book-grade").textContent;

        const subject =
            card.querySelector(".book-category").textContent;

        const status =
            card.querySelector(".status").textContent;

        modalImage.src = image;

        modalTitle.textContent = title;

        modalAuthor.textContent = author;

        modalGrade.textContent = grade;

        modalSubject.textContent =
            "Subject: " + subject;

        modalStatus.textContent = status;

        modalDescription.textContent =
            "This book is available in the NNSHS Library collection. Visit the library to borrow or inquire about this title.";

        if(status.trim() === "Available"){

            modalStatus.style.background =
                "#e8f8ee";

            modalStatus.style.color =
                "#1d7a41";

        }

        else{

            modalStatus.style.background =
                "#fdecec";

            modalStatus.style.color =
                "#c62828";

        }

        modal.classList.add("active");

    });

});
/* ===============================
   CLOSE MODAL
=============================== */

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});



/* ===============================
   CLOSE WHEN CLICKING OUTSIDE
=============================== */

window.addEventListener("click", (event) => {

    if(event.target === modal){

        modal.classList.remove("active");

    }

});



/* ===============================
   ESC KEY SUPPORT
=============================== */

document.addEventListener("keydown", (event) => {

    if(event.key === "Escape"){

        modal.classList.remove("active");

    }

});



/* ===============================
   PAGE LOAD ANIMATION
=============================== */

window.addEventListener("load", () => {

    books.forEach((book, index) => {

        book.style.opacity = "0";

        book.style.transform = "translateY(30px)";

        setTimeout(() => {

            book.style.transition =
                "all .45s ease";

            book.style.opacity = "1";

            book.style.transform =
                "translateY(0)";

        }, index * 80);

    });

});



/* ===============================
   INITIALIZE FILTER
=============================== */

filterBooks();
