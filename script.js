const PASSWORD = "cranes";

const gate = document.querySelector("#gate");
const clubHome = document.querySelector("#club-home");
const bikeTransition = document.querySelector("#bike-transition");
const passwordForm = document.querySelector("#password-form");
const passwordInput = document.querySelector("#club-password");
const passwordMessage = document.querySelector("#password-message");
const tabs = document.querySelectorAll(".tab[data-tab]");
const panels = document.querySelectorAll(".tab-panel");
const nextUrl = new URLSearchParams(window.location.search).get("next");

if (new URLSearchParams(window.location.search).has("reset")) {
  sessionStorage.removeItem("blue-cranes-unlocked");
}

function unlockClub() {
  gate.hidden = true;
  bikeTransition.hidden = true;
  bikeTransition.classList.remove("is-riding");
  clubHome.hidden = false;
  sessionStorage.setItem("blue-cranes-unlocked", "true");

  if (nextUrl) {
    window.location.assign(nextUrl);
  }
}

function rideToClub() {
  passwordForm.querySelector("button").disabled = true;
  bikeTransition.hidden = false;
  bikeTransition.classList.add("is-riding");

  window.setTimeout(() => {
    unlockClub();
  }, 1180);
}

if (sessionStorage.getItem("blue-cranes-unlocked") === "true") {
  unlockClub();
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value.trim().toLowerCase() === PASSWORD) {
    rideToClub();
    return;
  }

  passwordMessage.textContent = "Try again.";
  passwordMessage.classList.add("is-error");
  passwordInput.select();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const activeId = tab.dataset.tab;

    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === activeId);
    });
  });
});
