const jobsContainer = document.getElementById("jobsContainer");

const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const jobCount = document.getElementById("jobCount");

const optionAll = document.getElementById("optionAll");
const optionInterview = document.getElementById("optionInterview");
const optionRejected = document.getElementById("optionRejected");

const emptyState = document.getElementById("emptyState");

let currentFilter = "all"; 


function updateCounts() {
  const allCards = jobsContainer.querySelectorAll(".job-card");
  const interviewCards = jobsContainer.querySelectorAll('.job-card[data-status="interview"]');
  const rejectedCards = jobsContainer.querySelectorAll('.job-card[data-status="rejected"]');

  totalCount.innerText = allCards.length;
  jobCount.innerText = allCards.length;

  interviewCount.innerText = interviewCards.length;
  rejectedCount.innerText = rejectedCards.length;
  if (allCards.length === 0) {
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

  cards.forEach(card => {
    const status = card.dataset.status;

    if (currentFilter === "all") {
      card.classList.remove("hidden");
    } 
    else if (currentFilter === "interview") {
      if (status === "interview") card.classList.remove("hidden");
      else card.classList.add("hidden");
    } 
    else if (currentFilter === "rejected") {
      if (status === "rejected") card.classList.remove("hidden");
      else card.classList.add("hidden");
    }
  });
}


// 4) Button style (active button)
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


// 5) Filter button clicks
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


// 6) One click listener for everything (Interview / Rejected / Delete)
jobsContainer.addEventListener("click", function (event) {
  const card = event.target.closest(".job-card");
  if (!card) return;

  // Delete button
  if (event.target.closest(".delete-btn")) {
    card.remove();
    updateCounts();
    return;
  }

  // Interview button
  if (event.target.closest(".interview-btn")) {
    card.dataset.status = "interview";
    updateBadge(card);
    updateCounts();
    applyFilter();
    return;
  }

  // Rejected button
  if (event.target.closest(".rejected-btn")) {
    card.dataset.status = "rejected";
    updateBadge(card);
    updateCounts();
    applyFilter();
    return;
  }
});


// 7) On page load (initialize)
const allCards = jobsContainer.querySelectorAll(".job-card");
allCards.forEach(card => {
  // your HTML has data-status="not"
  // we keep it as "not"
  updateBadge(card);
});

setActive(optionAll);
updateCounts();
applyFilter();