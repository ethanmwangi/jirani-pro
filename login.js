// Detect role from localStorage
const role = localStorage.getItem('role');

// Update heading based on role
const title = document.getElementById('loginTitle');
if (role === 'mteja') {
  title.textContent = 'Mteja Login';
} else if (role === 'msaidizi') {
  title.textContent = 'Msaidizi Login';
} else {
  title.textContent = 'Login';
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Simple mock "save" to localStorage (not secure — just for this project)
  const user = { name, email, password, role };
  localStorage.setItem('user', JSON.stringify(user));

  // Redirect to the right dashboard
  if (role === 'mteja') {
    window.location.href = 'mteja.html';
  } else if (role === 'msaidizi') {
    window.location.href = 'msaidizi.html';
  } else {
    alert('Role not selected. Go back to home page.');
  }
});
