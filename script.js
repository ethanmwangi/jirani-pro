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
