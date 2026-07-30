/* ==========================================================
   AI Chatbot Orientation Presentation
   ========================================================== */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentSlide = 0;
let isAnimating = false;


/* ==========================================================
   INITIALIZE
   ========================================================== */

updatePresentation();


/* ==========================================================
   MAIN FUNCTION
   ========================================================== */

function updatePresentation() {

    slides.forEach((slide, index) => {

        slide.classList.toggle("active", index === currentSlide);

    });

    dots.forEach((dot, index) => {

        dot.classList.toggle("active", index === currentSlide);

    });

    prevBtn.disabled = currentSlide === 0;

    nextBtn.disabled = currentSlide === slides.length - 1;

    prevBtn.style.opacity = prevBtn.disabled ? ".45" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? ".45" : "1";

}


/* ==========================================================
   GO TO SLIDE
   ========================================================== */

function goToSlide(index) {

    if (isAnimating) return;

    if (index < 0) return;

    if (index >= slides.length) return;

    isAnimating = true;

    currentSlide = index;

    updatePresentation();

    setTimeout(() => {

        isAnimating = false;

    }, 550);

}


/* ==========================================================
   NEXT
   ========================================================== */

function nextSlide() {

    goToSlide(currentSlide + 1);

}


/* ==========================================================
   PREVIOUS
   ========================================================== */

function previousSlide() {

    goToSlide(currentSlide - 1);

}


/* ==========================================================
   BUTTON EVENTS
   ========================================================== */

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", previousSlide);


/* ==========================================================
   PROGRESS DOTS
   ========================================================== */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        goToSlide(index);

    });

});


/* ==========================================================
   KEYBOARD
   ========================================================== */

document.addEventListener("keydown", (event) => {

    switch (event.key) {

        case "ArrowRight":
        case "PageDown":

            nextSlide();

            break;

        case "ArrowLeft":
        case "PageUp":

            previousSlide();

            break;

        case "Home":

            goToSlide(0);

            break;

        case "End":

            goToSlide(slides.length - 1);

            break;

        case "f":
        case "F":

            toggleFullscreen();

            break;

    }

});


/* ==========================================================
   MOUSE WHEEL
   ========================================================== */

let wheelTimeout = null;

window.addEventListener("wheel", (event) => {

    if (wheelTimeout) return;

    wheelTimeout = setTimeout(() => {

        wheelTimeout = null;

    }, 500);

    if (event.deltaY > 0) {

        nextSlide();

    } else {

        previousSlide();

    }

});


/* ==========================================================
   TOUCH SUPPORT
   ========================================================== */

let touchStartX = 0;

let touchEndX = 0;

window.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});

window.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe() {

    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {

        nextSlide();

    } else {

        previousSlide();

    }

}


/* ==========================================================
   FULLSCREEN
   ========================================================== */

function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}


/* ==========================================================
   PRESENTATION TIMER
   ========================================================== */

let startTime = Date.now();

window.addEventListener("beforeunload", () => {

    const seconds = Math.round(

        (Date.now() - startTime) / 1000

    );

    console.log(

        "Presentation viewed for",

        seconds,

        "seconds"

    );

});


/* ==========================================================
   OPTIONAL:
   AUTO-ANIMATE CARDS
   ========================================================== */

const observer = new MutationObserver(() => {

    const active = document.querySelector(".slide.active");

    if (!active) return;

    active.querySelectorAll(

        ".week, .week-card, .privacy-card, .ema-card, .mini-card, .check-item"

    ).forEach((card, i) => {

        card.style.animationDelay = `${i * 0.12}s`;

    });

});

observer.observe(document.body, {

    subtree: true,

    attributes: true,

    attributeFilter: ["class"]

});


/* ==========================================================
   END
   ========================================================== */