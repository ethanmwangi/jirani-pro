// Role selection on index.html
function selectRole(role) {
  localStorage.setItem('userRole', role);
  window.location.href = 'sign-up.html'; // updated from login.html
}

// Handle login redirect
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const role = localStorage.getItem('userRole');
      const username = document.getElementById('username').value;

      localStorage.setItem('currentUser', JSON.stringify({ role, username }));

      if (role === 'mteja') {
        window.location.href = 'mteja.html';
      } else if (role === 'msaidizi') {
        window.location.href = 'msaidizi.html';
      } else {
        alert('Invalid role.');
      }
    });
  }

  // Apply theme on load
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Logout function for dashboards
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}
// On Mteja Dashboard
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.role === 'mteja') {
    document.getElementById('mteja-name').textContent = currentUser.username;

    const jobForm = document.getElementById('jobForm');
    const jobList = document.getElementById('jobList');

    // Load posted jobs
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    function renderJobs() {
      jobList.innerHTML = '';
      const myJobs = jobs.filter(job => job.postedBy === currentUser.username);
      myJobs.forEach((job, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${job.title}</strong> - ${job.category}<br/>
          ${job.description}<br/>
          Budget: ${job.budget} KES | Location: ${job.location}
        `;
        jobList.appendChild(li);
      });
    }

    renderJobs();

    jobForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newJob = {
        title: document.getElementById('jobTitle').value,
        description: document.getElementById('jobDescription').value,
        category: document.getElementById('jobCategory').value,
        budget: document.getElementById('jobBudget').value,
        location: document.getElementById('jobLocation').value,
        postedBy: currentUser.username
      };

      jobs.push(newJob);
      localStorage.setItem('jobs', JSON.stringify(jobs));

      jobForm.reset();
      renderJobs();
    });
  }
});
// On Msaidizi Dashboard
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.role === 'msaidizi') {
    document.getElementById('msaidizi-name').textContent = currentUser.username;

    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const applications = JSON.parse(localStorage.getItem('applications')) || [];

    const availableJobs = document.getElementById('availableJobs');
    const appliedJobs = document.getElementById('appliedJobs');

    function hasApplied(jobIndex) {
      return applications.some(
        app => app.jobIndex === jobIndex && app.applicant === currentUser.username
      );
    }

    function renderJobs() {
      availableJobs.innerHTML = '';
      appliedJobs.innerHTML = '';

      jobs.forEach((job, index) => {
        if (!hasApplied(index)) {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${job.title}</strong> - ${job.category}<br/>
            ${job.description}<br/>
            Budget: ${job.budget} KES | Location: ${job.location}<br/>
            <textarea placeholder="Write a message..." id="msg-${index}"></textarea><br/>
            <button onclick="applyToJob(${index})">Apply</button>
          `;
          availableJobs.appendChild(li);
        } else {
          const app = applications.find(
            a => a.jobIndex === index && a.applicant === currentUser.username
          );
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${job.title}</strong> - ${job.category}<br/>
            ${job.description}<br/>
            Location: ${job.location}<br/>
            ✅ Applied with message: <em>${app.message}</em>
          `;
          appliedJobs.appendChild(li);
        }
      });
    }

    window.applyToJob = function(index) {
      const message = document.getElementById(`msg-${index}`).value.trim();
      if (!message) {
        alert('Please enter a message before applying.');
        return;
      }

      const newApp = {
        jobIndex: index,
        applicant: currentUser.username,
        message
      };

      applications.push(newApp);
      localStorage.setItem('applications', JSON.stringify(applications));
      renderJobs();
    };

    renderJobs();
  }
});
const jobApplicants = {
  job123: [
    { name: 'Jane W.', experience: '2 yrs', rating: 4.8 },
    { name: 'Mary A.', experience: '3 yrs', rating: 4.5 }
  ],
  // other jobs...
};

function viewApplicants(jobId) {
  const container = document.getElementById(`applicants-${jobId}`);
  const applicants = jobApplicants[jobId];

  if (!applicants || applicants.length === 0) {
    container.innerHTML = '<p>No applicants yet.</p>';
  } else {
    container.innerHTML = applicants.map(app => `
      <div class="applicant-card">
        <p><strong>${app.name}</strong> – ${app.experience}</p>
        <p>Rating: ⭐ ${app.rating}</p>
        <button onclick="updateStatus('${jobId}', '${app.name}', 'accepted')">Accept</button>
        <button onclick="updateStatus('${jobId}', '${app.name}', 'rejected')">Reject</button>
      </div>
    `).join('');
  }

  container.style.display = container.style.display === 'none' ? 'block' : 'none';
}
// Sample job data
const jobs = [
  {
    id: "job1",
    title: "House Cleaning",
    location: "Kilimani",
    date: "2025-05-28",
    applicants: [
      { name: "Amina", rating: 4.7, experience: "2 yrs" },
      { name: "John", rating: 4.5, experience: "1.5 yrs" }
    ]
  },
  {
    id: "job2",
    title: "Gardening",
    location: "Lavington",
    date: "2025-05-29",
    applicants: [
      { name: "Grace", rating: 4.9, experience: "3 yrs" }
    ]
  }
];

// Track job status per applicant
const applicantStatus = {};

// Render job listings
function renderJobs() {
  const container = document.getElementById("job-listings");
  container.innerHTML = "";

  jobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";

    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Date:</strong> ${job.date}</p>
      <button onclick="viewApplicants('${job.id}')">View Applicants</button>
    `;

    container.appendChild(jobCard);
  });
}

// View applicants for a specific job
function viewApplicants(jobId) {
  const job = jobs.find(j => j.id === jobId);
  const container = document.getElementById("applicants");
  container.innerHTML = `<h2>Applicants for ${job.title}</h2>`;

  container.innerHTML += job.applicants.map(app => {
    const status = applicantStatus[jobId]?.[app.name];
    let statusHTML = "";

    if (status) {
      statusHTML = `<p class="status ${status}">Status: ${status.toUpperCase()}</p>`;
    } else {
      statusHTML = `
        <button onclick="updateStatus('${jobId}', '${app.name}', 'accepted')">Accept</button>
        <button onclick="updateStatus('${jobId}', '${app.name}', 'rejected')">Reject</button>
      `;
    }

    return `
      <div class="applicant-card">
        <p><strong>${app.name}</strong> – ${app.experience}</p>
        <p>Rating: ⭐ ${app.rating}</p>
        ${statusHTML}
      </div>
    `;
  }).join("");
}

// Accept or reject an applicant
function updateStatus(jobId, applicantName, status) {
  if (!applicantStatus[jobId]) {
    applicantStatus[jobId] = {};
  }

  applicantStatus[jobId][applicantName] = status;

  alert(`${applicantName} has been ${status.toUpperCase()} for job ${jobId}.`);

  // Re-render applicants with updated status
  viewApplicants(jobId);
}

// Initialize dashboard
window.onload = renderJobs;
