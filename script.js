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
