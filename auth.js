function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  
  clearMessages();

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
  }
}

function clearMessages() {
  document.getElementById('authError').textContent = '';
  document.getElementById('authSuccess').textContent = '';
}

function handleRegister(event) {
  event.preventDefault();
  clearMessages();

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    document.getElementById('authError').textContent = 'An account with this email already exists.';
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  document.getElementById('authSuccess').textContent = 'Account created successfully! Please Sign In.';
  document.getElementById('registerForm').reset();
  
  setTimeout(() => {
    switchTab('login');
  }, 1500);
}

function handleLogin(event) {
  event.preventDefault();
  clearMessages();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const foundUser = users.find(user => user.email === email && user.password === password);

  if (!foundUser) {
    document.getElementById('authError').textContent = 'Invalid email or password.';
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(foundUser));
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    window.location.href = 'index.html';
  }
});