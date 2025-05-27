const jobFeed = document.getElementById("jobFeed");
const appliedJobsSection = document.getElementById("appliedJobs");

let jobs = JSON.parse(localStorage.getItem("mtejaJobs")) || [];
let appliedJobs = JSON.parse(localStorage.getItem("msaidiziApplications")) || [];

function displayAvailableJobs() {
  jobFeed.innerHTML = "";
  jobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.type}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.details}</p>
      <small>Posted at: ${job.timestamp}</small><br><br>
      <button onclick="applyToJob(${index})">Apply</button>
    `;
    jobFeed.appendChild(card);
  });
}

function displayAppliedJobs() {
  appliedJobsSection.innerHTML = "";
  if (appliedJobs.length === 0) {
    appliedJobsSection.innerHTML = "<p>No applications yet.</p>";
    return;
  }

  appliedJobs.forEach((job) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.type}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.details}</p>
      <small>Applied at: ${job.appliedAt}</small>
    `;
    appliedJobsSection.appendChild(card);
  });
}

function applyToJob(index) {
  const job = jobs[index];
  const alreadyApplied = appliedJobs.some(j => j.timestamp === job.timestamp && j.details === job.details);

  if (!alreadyApplied) {
    appliedJobs.push({ ...job, appliedAt: new Date().toLocaleString() });
    localStorage.setItem("msaidiziApplications", JSON.stringify(appliedJobs));
    alert("Applied successfully!");
    displayAppliedJobs();
  } else {
    alert("You've already applied to this job.");
  }
}

displayAvailableJobs();
displayAppliedJobs();

// === Theme Toggle ===
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
