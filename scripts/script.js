const jobsContainer = document.getElementById("jobsContainer");

let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let jobCount = document.getElementById("jobCount");

const optionAll = document.getElementById("optionAll");
const optionInterview = document.getElementById("optionInterview");
const optionRejected = document.getElementById("optionRejected");

const emptyState = document.getElementById("emptyState");

let currentFilter = "all";

function updateCounts() {
  const allCards = jobsContainer.querySelectorAll(".job-card");

  let interviewTotal = 0;
  let rejectedTotal = 0;
  let visibleTotal = 0;

  for (let i = 0; i < allCards.length; i++) {
    const card = allCards[i];

    if (card.dataset.status === "interview") {
      interviewTotal++;
    }
    if (card.dataset.status === "rejected") {
      rejectedTotal++;
    }

    if (!card.classList.contains("hidden")) {
      visibleTotal++;
    }
  }

  totalCount.innerText = allCards.length;
  interviewCount.innerText = interviewTotal;
  rejectedCount.innerText = rejectedTotal;

  jobCount.innerText = visibleTotal;

  if (visibleTotal === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

function updateBadge(card) {
  const badge = card.querySelector(".status-badge");
  const status = card.dataset.status;

  badge.classList.remove("badge-ghost", "badge-success", "badge-error");

  if (status === "interview") {
    badge.classList.add("badge-success");
    badge.innerText = "INTERVIEW";
  } else if (status === "rejected") {
    badge.classList.add("badge-error");
    badge.innerText = "REJECTED";
  } else {
    badge.classList.add("badge-ghost");
    badge.innerText = "NOT APPLIED";
  }
}

function applyFilter() {
  const cards = jobsContainer.querySelectorAll(".job-card");
  let visibleCount = 0;

  for (let i = 0; i <cards.length; i++) {
    const card = cards[i];
    const status = card.dataset.status;

    if (currentFilter === "all") {
      card.classList.remove("hidden");
      visibleCount++;
    } else if (currentFilter === "interview") {
      if (status === "interview") {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    } else if (currentFilter === "rejected") {
      if (status === "rejected") {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    }
  }

  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  updateCounts();
}

function setActive(btn) {
  optionAll.classList.remove("btn-primary");
  optionAll.classList.add("btn-ghost");

  optionInterview.classList.remove("btn-primary");
  optionInterview.classList.add("btn-ghost");

  optionRejected.classList.remove("btn-primary");
  optionRejected.classList.add("btn-ghost");

  btn.classList.remove("btn-ghost");
  btn.classList.add("btn-primary");
}

optionAll.addEventListener("click", function () {
  currentFilter = "all";
  setActive(optionAll);
  applyFilter();
});

optionInterview.addEventListener("click", function () {
  currentFilter = "interview";
  setActive(optionInterview);
  applyFilter();
});

optionRejected.addEventListener("click", function () {
  currentFilter = "rejected";
  setActive(optionRejected);
  applyFilter();
});

jobsContainer.addEventListener("click", function (event) {
  const card = event.target.closest(".job-card");
  if (!card) return;

  if (event.target.closest(".delete-btn")) {
    card.remove();
    updateCounts();
    return;
  }

  if (event.target.closest(".interview-btn")) {
    card.dataset.status = "interview";
    updateBadge(card);
    updateCounts();
    applyFilter();
    return;
  }

  if (event.target.closest(".rejected-btn")) {
    card.dataset.status = "rejected";
    updateBadge(card);
    updateCounts();
    applyFilter();
    return;
  }
});

const allCards = jobsContainer.querySelectorAll(".job-card");
for (let i = 0; i < allCards.length; i++) {
  updateBadge(allCards[i]);
}
setActive(optionAll);
applyFilter();
