// Detect theme preference from localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
}

// Handle role selection
document.getElementById('mtejaBtn').addEventListener('click', () => {
  localStorage.setItem('role', 'mteja');
  window.location.href = 'login.html'; // We'll create this next
});

document.getElementById('msaidiziBtn').addEventListener('click', () => {
  localStorage.setItem('role', 'msaidizi');
  window.location.href = 'login.html'; // We'll create this next
});
// === Theme Toggle Logic ===
const toggle = document.getElementById('themeSwitcher');

// Check localStorage on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  toggle.checked = true;
}

// Toggle theme on change
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});
