document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.getElementById('menu-toggle');
menuBtn.addEventListener('click', () => {
  const open = document.getElementById('nav').classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#nav ul a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('nav').classList.remove('open'))
);

// Placeholder until an email service (Mailchimp, Klaviyo, Formspree) is connected.
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('signup-note').textContent = "Thanks! You're on the list.";
  e.target.reset();
});
