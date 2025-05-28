// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Store role from signup
  const roleSelect = document.getElementById("roleSelect");
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const role = roleSelect.value;
      localStorage.setItem("userRole", role);

      if (role === "mteja") {
        window.location.href = "mteja-dashboard.html";
      } else {
        window.location.href = "msaidizi-dashboard.html";
      }
    });
  }
});
 // Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

// Navbar: Show "My Profile" if logged in
const navLinks = document.querySelector(".nav-links");
const user = JSON.parse(localStorage.getItem("currentUser"));

if (user && navLinks) {
  const profileLink = document.createElement("li");
  profileLink.innerHTML = `<a href="#" id="myProfile">My Profile</a>`;
  navLinks.appendChild(profileLink);

  const logoutLink = document.createElement("li");
  logoutLink.innerHTML = `<a href="#" id="logoutBtn">Logout</a>`;
  navLinks.appendChild(logoutLink);
}

// Handle profile navigation
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "myProfile") {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    // Redirect to role-based profile view
    if (currentUser.role === "Msaidizi") {
      window.location.href = "profiles.html";
    } else {
      window.location.href = "jobs.html";
    }
  }

  // Logout
  if (e.target && e.target.id === "logoutBtn") {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  }
});
// ========== GLOBAL HELPERS ==========
function getMsaidiziProfiles() {
  return JSON.parse(localStorage.getItem("msaidiziProfiles") || "[]");
}

function saveMsaidiziProfile(profile) {
  const profiles = getMsaidiziProfiles();
  profiles.push(profile);
  localStorage.setItem("msaidiziProfiles", JSON.stringify(profiles));
}

// ========== MSAIDIZI PROFILE FORM ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("msaidiziForm");
  const preview = document.getElementById("profilePreview");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const profile = {
        name: formData.get("name"),
        photo: formData.get("photo") || "https://via.placeholder.com/100",
        location: formData.get("location"),
        category: formData.get("category"),
        experience: formData.get("experience"),
        availability: formData.get("availability"),
        pricing: formData.get("pricing"),
        rating: (Math.random() * 2 + 3).toFixed(1), // Random 3.0-5.0 rating
      };

      saveMsaidiziProfile(profile);
      displayProfileCard(preview, profile);
      preview.classList.remove("hidden");

      alert("Profile saved!");
    });
  }

  // Load profile if preview section exists
  if (preview && !form) {
    const profiles = getMsaidiziProfiles();
    if (profiles.length > 0) {
      displayProfileCard(preview, profiles[profiles.length - 1]);
      preview.classList.remove("hidden");
    }
  }

  // Logout and Navbar
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }

  const viewProfileBtn = document.getElementById("viewProfileBtn");
  if (viewProfileBtn) {
    viewProfileBtn.addEventListener("click", () => {
      window.location.href = "msaidizi-profile.html";
    });
  }
});

// ========== DISPLAY PROFILE CARD ==========
function displayProfileCard(container, profile) {
  container.innerHTML = `
    <div class="profile-card-inner">
      <img src="${profile.photo}" alt="${profile.name}" class="profile-pic" />
      <h3>${profile.name}</h3>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Category:</strong> ${profile.category}</p>
      <p><strong>Experience:</strong> ${profile.experience} yrs</p>
      <p><strong>Availability:</strong> ${profile.availability}</p>
      <p><strong>Pricing:</strong> KES ${profile.pricing}/hr</p>
      <p><strong>Rating:</strong> ⭐ ${profile.rating}</p>
    </div>
  `;
}
// ------------ FAKE HELPER PROFILES ------------
const defaultHelpers = [
  {
    name: "Amina Wanjiru",
    photo: "https://i.pravatar.cc/150?img=3",
    location: "Westlands",
    category: "Cleaning",
    experience: "3 years",
    rating: 4.5,
    skills: ["Deep cleaning", "Laundry", "Kitchen cleaning"],
    availability: "Full-time",
    pricing: "Ksh 800/day"
  },
  {
    name: "John Mwangi",
    photo: "https://i.pravatar.cc/150?img=7",
    location: "Kasarani",
    category: "Plumbing",
    experience: "5 years",
    rating: 4.8,
    skills: ["Leak repair", "Pipe fitting", "Toilet repair"],
    availability: "On call",
    pricing: "Ksh 1500/job"
  },
  {
    name: "Grace Achieng",
    photo: "https://i.pravatar.cc/150?img=12",
    location: "Lavington",
    category: "Babysitting",
    experience: "2 years",
    rating: 4.2,
    skills: ["Infant care", "Homework help", "Meal prep"],
    availability: "Weekends",
    pricing: "Ksh 1000/day"
  }
];

// ------------ LOAD & DISPLAY PROFILES ------------
function loadHelperProfiles() {
  const container = document.getElementById("profilesContainer");
  if (!container) return;

  const helpers = JSON.parse(localStorage.getItem("helpers")) || defaultHelpers;
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  function renderProfiles(profiles) {
    container.innerHTML = "";
    if (profiles.length === 0) {
      container.innerHTML = `<p>No helpers found.</p>`;
      return;
    }

    profiles.forEach(helper => {
      const card = document.createElement("div");
      card.className = "profile-card";
      card.innerHTML = `
        <img src="${helper.photo}" alt="${helper.name}" />
        <h3>${helper.name}</h3>
        <p><strong>Location:</strong> ${helper.location}</p>
        <p><strong>Category:</strong> ${helper.category}</p>
        <p><strong>Experience:</strong> ${helper.experience}</p>
        <p><strong>Rating:</strong> ⭐ ${helper.rating}</p>
        <p><strong>Skills:</strong> ${helper.skills.join(", ")}</p>
        <p><strong>Availability:</strong> ${helper.availability}</p>
        <p><strong>Pricing:</strong> ${helper.pricing}</p>
        <button class="cta">Send Offer</button>
      `;
      container.appendChild(card);
    });
  }

  function filterProfiles() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = helpers.filter(helper => {
      const matchesSearch =
        helper.name.toLowerCase().includes(searchTerm) ||
        helper.location.toLowerCase().includes(searchTerm) ||
        helper.skills.join(" ").toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" || helper.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    renderProfiles(filtered);
  }

  // Event listeners
  searchInput.addEventListener("input", filterProfiles);
  categoryFilter.addEventListener("change", filterProfiles);

  renderProfiles(helpers);
}

document.addEventListener("DOMContentLoaded", () => {
  loadHelperProfiles();

  // ------------- LOGOUT FUNCTIONALITY -------------
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "sign-up.html";
    });
  }

  // ------------- PROFILE NAVIGATION -------------
  const profileLink = document.getElementById("profileLink");
  if (profileLink) {
    profileLink.addEventListener("click", () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        window.location.href = "profile.html"; // or a role-based profile
      } else {
        window.location.href = "sign-up.html";
      }
    });
  }
});
// ===============================
// LOGIN SIMULATION & PROFILE CREATION
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const profileLink = document.getElementById('profileLink');

  // Handle sign-up form
  if (signUpForm) {
    signUpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const role = document.querySelector('input[name="role"]:checked').value;
      const name = document.getElementById('name').value;
      const location = document.getElementById('location').value;
      const contact = document.getElementById('contact').value;
      const language = document.getElementById('language').value;
      const category = document.getElementById('category').value;

      const userProfile = {
        name,
        location,
        contact,
        language,
        role,
        category,
      };

      localStorage.setItem('loggedInUser', JSON.stringify(userProfile));

      if (role === 'mteja') {
        window.location.href = 'jobs.html';
      } else {
        window.location.href = 'profiles.html';
      }
    });
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });
  }

  // Handle My Profile link
  if (profileLink) {
    profileLink.addEventListener('click', () => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user) {
        alert(`Profile:\nName: ${user.name}\nRole: ${user.role}\nLocation: ${user.location}`);
      } else {
        alert('Please log in.');
      }
    });
  }
});

// ===============================
// SAMPLE HELPER PROFILES
// ===============================
const sampleHelpers = [
  {
    name: 'Achieng Odhiambo',
    category: 'Cleaning',
    location: 'Kileleshwa',
    rating: 4.5,
    experience: '2 years',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Brian Waweru',
    category: 'Plumbing',
    location: 'Donholm',
    rating: 4.7,
    experience: '3 years',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Grace Mumbi',
    category: 'Babysitting',
    location: 'Westlands',
    rating: 4.9,
    experience: '5 years',
    photo: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    name: 'Peter Mwangi',
    category: 'Electrical',
    location: 'Langata',
    rating: 4.3,
    experience: '4 years',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
  }
];

function renderProfiles(profiles) {
  const container = document.getElementById('profilesContainer');
  if (!container) return;

  container.innerHTML = '';

  profiles.forEach(profile => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <img src="${profile.photo}" alt="${profile.name}" />
      <h3>${profile.name}</h3>
      <p><strong>Category:</strong> ${profile.category}</p>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Experience:</strong> ${profile.experience}</p>
      <p><strong>Rating:</strong> ⭐ ${profile.rating}</p>
      <button>Send Offer</button>
    `;
    container.appendChild(card);
  });
}

// ===============================
// FILTER & SEARCH ON profiles.html
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('searchName');
  const categorySelect = document.getElementById('filterCategory');
  const locationSelect = document.getElementById('filterLocation');

  if (nameInput || categorySelect || locationSelect) {
    renderProfiles(sampleHelpers); // Initial render

    function filterProfiles() {
      const nameVal = nameInput.value.toLowerCase();
      const categoryVal = categorySelect.value;
      const locationVal = locationSelect.value;

      const filtered = sampleHelpers.filter(helper => {
        const matchesName = helper.name.toLowerCase().includes(nameVal);
        const matchesCategory = categoryVal ? helper.category === categoryVal : true;
        const matchesLocation = locationVal ? helper.location === locationVal : true;

        return matchesName && matchesCategory && matchesLocation;
      });

      renderProfiles(filtered);
    }

    nameInput.addEventListener('input', filterProfiles);
    categorySelect.addEventListener('change', filterProfiles);
    locationSelect.addEventListener('change', filterProfiles);
  }
});
// script.js

// Save signup data
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const profileForm = document.getElementById("profileForm");
  const logoutBtn = document.getElementById("logoutBtn");

  // Handle Sign-Up Form
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        language: document.getElementById("language").value,
        role: document.getElementById("role").value
      };

      localStorage.setItem("currentUser", JSON.stringify(user));

      window.location.href = "profile.html";
    });
  }

  // Load & Update Profile Form
  if (profileForm) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
      profileForm.name.value = user.name;
      profileForm.email.value = user.email;
      profileForm.phone.value = user.phone;
      profileForm.location.value = user.location;
      profileForm.language.value = user.language;
      profileForm.role.value = user.role;
    }

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const updatedUser = {
        name: profileForm.name.value,
        email: profileForm.email.value,
        phone: profileForm.phone.value,
        location: profileForm.location.value,
        language: profileForm.language.value,
        role: profileForm.role.value
      };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      alert("Profile updated!");
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "sign-up.html";
    });
  }
});
