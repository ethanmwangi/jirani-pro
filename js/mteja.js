// === Job Posting Logic ===
const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

let jobs = JSON.parse(localStorage.getItem("mtejaJobs")) || [];

function displayJobs() {
  jobList.innerHTML = "";
  jobs.forEach((job, index) => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.type}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.details}</p>
      <small>Posted at: ${job.timestamp}</small>
    `;
    jobList.appendChild(jobCard);
  });
}

jobForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const type = document.getElementById("jobType").value;
  const location = document.getElementById("location").value;
  const details = document.getElementById("details").value;

  const job = {
    type,
    location,
    details,
    timestamp: new Date().toLocaleString()
  };

  jobs.unshift(job);
  localStorage.setItem("mtejaJobs", JSON.stringify(jobs));
  displayJobs();
  jobForm.reset();
});

displayJobs();

// === Theme Toggle Logic ===
const toggle = document.getElementById('themeSwitcher');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  toggle.checked = true;
}
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});
