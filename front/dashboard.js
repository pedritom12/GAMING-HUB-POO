
const btnOpenAuth = document.getElementById('btn-open-auth');
const btnCloseAuth = document.getElementById('btn-close-auth');
const authSidebar = document.getElementById('auth-sidebar');
const tabButtons = document.querySelectorAll('.tab-btn');
const registerSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');


btnOpenAuth.addEventListener('click', () => authSidebar.classList.remove('hidden'));
btnCloseAuth.addEventListener('click', () => authSidebar.classList.add('hidden'));


tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.interpolate = btn.dataset.target;
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.dataset.target === 'register-section') {
      registerSection.classList.remove('hidden');
      loginSection.classList.add('hidden');
    } else {
      loginSection.classList.remove('hidden');
      registerSection.classList.add('hidden');
    }
  });
});
