const jobsContainer = document.getElementById("jobsContainer");

let  totalCount = document.getElementById("totalCount");
let  interviewCount = document.getElementById("interviewCount");
let  rejectedCount = document.getElementById("rejectedCount");
let  jobCount = document.getElementById("jobCount");

const optionAll = document.getElementById("optionAll");
const optionInterview = document.getElementById("optionInterview");
const optionRejected = document.getElementById("optionRejected");

const emptyState = document.getElementById("emptyState");

let currentFilter = "all"; 


function updateCounts() {
  const allCards = jobsContainer.querySelectorAll(".job-card");
  // console.log(allCards);
  const interviewCards = jobsContainer.querySelectorAll('.job-card[data-status="interview"]');
  // console.log(interviewCards);
  const rejectedCards = jobsContainer.querySelectorAll('.job-card[data-status="rejected"]');
  let cardLength = allCards.length;
  totalCount.innerText = cardLength;
  jobCount.innerText = cardLength;
  
  interviewCount.innerText = interviewCards.length;
  rejectedCount.innerText = rejectedCards.length;
  if (cardLength === 0) {
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

  cards.forEach(card => {
    const status = card.dataset.status;

    if (currentFilter === "all") {
      card.classList.remove("hidden");
      visibleCount++;
    } 
    else if (currentFilter === "interview") {
      if (status === "interview") {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    } 
    else if (currentFilter === "rejected") {
      if (status === "rejected") {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    }
  });
  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
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

