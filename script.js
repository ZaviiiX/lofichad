// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    hamburger.setAttribute('aria-expanded', String(!open));
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth < 720) navLinks.style.display = 'none';
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple fake submit for Join form
const joinForm = document.getElementById('joinForm');
const formMsg  = document.getElementById('formMsg');

if (joinForm) {
  joinForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(joinForm);
    const email = data.get('email');
    formMsg.textContent = `Thanks, ${email}. We will reach out soon.`;
    joinForm.reset();
  });
}
