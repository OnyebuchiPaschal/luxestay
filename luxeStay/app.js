const bookingForm = document.querySelector("#booking-form");

const checkInInput = document.querySelector("#check-in");
const checkOutInput = document.querySelector("#check-out");
const guestsInput = document.querySelector("#guests");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const bookingResult = document.querySelector("#booking-result");
const roomTypeInput = document.querySelector("#room-type");
const roomPriceDisplay = document.querySelector("#room-price");

// Get today's date
const todayDate = new Date();

const today =
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(todayDate.getDate()).padStart(2, "0");

// Check-in cannot be before today
checkInInput.min = today;

checkInInput.addEventListener("change", function () {
    checkOutInput.disabled = false;

    const nextDay = new Date(checkInInput.value);
    nextDay.setDate(nextDay.getDate() + 1);

    const nextDayFormatted =
        nextDay.getFullYear() +
        "-" +
        String(nextDay.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(nextDay.getDate()).padStart(2, "0");

    checkOutInput.min = nextDayFormatted;

    if (checkOutInput.value < checkOutInput.min) {
        checkOutInput.value = "";
    }
});

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const guests = guestsInput.value;
    const roomPrice = Number(roomTypeInput.value);
    const roomName = roomTypeInput.options[roomTypeInput.selectedIndex].text;

    if (!checkIn || !checkOut || !guests) {
        alert("Please complete all booking fields.");
        return;
    }

if (checkOut <= checkIn) {
    alert("Check-out must be after check-in.");
    return;
}

const checkInDate = new Date(checkIn);
const checkOutDate = new Date(checkOut);

const difference = checkOutDate - checkInDate;

const nights = difference / (1000 * 60 * 60 * 24);
const totalPrice = roomPrice * nights;
const formattedTotal = totalPrice.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN"
});
bookingResult.innerHTML = `
    <div class="result-card">
        <h3>Stay Summary</h3>

        <p><strong>Room:</strong> ${roomName}</p>
        <p><strong>Check-in:</strong> ${checkIn}</p>
        <p><strong>Check-out:</strong> ${checkOut}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Nights:</strong> ${nights}</p>

        <div class="result-total">
            <span>Estimated Total</span>
            <strong>${formattedTotal}</strong>
        </div>

        <p class="result-message">
            Great choice! Your stay details are ready.
        </p>

        <button class="confirm-booking" type="button">
            Confirm Booking
        </button>
    </div>
`;

const confirmButton = bookingResult.querySelector(".confirm-booking");

confirmButton.addEventListener("click", function () {
    bookingResult.innerHTML = `
        <div class="result-card confirmation-card">
            <h3>Booking Confirmed ✓</h3>

            <p>
                Your stay at LuxeStay has been successfully reserved.
            </p>

            <p>
                We look forward to welcoming you.
            </p>
        </div>
    `;
    bookingForm.reset();
    roomPriceDisplay.textContent = "";
    checkOutInput.min = "";
    checkOutInput.disabled = true;
});

});

menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    navLinks.classList.toggle("open");

    if (navLinks.classList.contains("open")) {
        menuToggle.querySelector(".menu-icon").textContent = "✕";
        menuToggle.setAttribute("aria-label", "Close navigation");
    } else {
        menuToggle.querySelector(".menu-icon").textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation");
    }
});

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.querySelector(".menu-icon").textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation");
}

navLinks.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        closeMenu();
    }
});
document.addEventListener("click", function (event) {
    if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});

roomTypeInput.addEventListener("change", function () {
    const price = Number(roomTypeInput.value);

    if (!price) {
        roomPriceDisplay.textContent = "";
        return;
    }

    roomPriceDisplay.textContent =
        `${price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN"
        })} / night`;
});


const roomBookButtons = document.querySelectorAll(".room-book-button");

roomBookButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const roomPrice = button.dataset.room;

        roomTypeInput.value = roomPrice;

        roomTypeInput.dispatchEvent(new Event("change"));

        document.querySelector("#booking").scrollIntoView({
            behavior: "smooth"
        });
    });
});


const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const currentItem = question.parentElement;

        document.querySelectorAll(".faq-item").forEach(function (item) {
            if (item !== currentItem) {
                item.classList.remove("open");
            }
        });

        currentItem.classList.toggle("open");
    });
});

const backToTopButton = document.querySelector("#back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});