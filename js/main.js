document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initStarBars();
  initActiveNav();
});

/* ----- Navbar scroll effect ----- */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ----- Mobile menu toggle ----- */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openPath = 'M4 6h16M4 12h16M4 18h16';
  const closePath = 'M6 18L18 6M6 6l12 12';

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuIcon.setAttribute('d', isOpen ? openPath : closePath);
    menuBtn.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.setAttribute('d', openPath);
      menuBtn.setAttribute('aria-label', '메뉴 열기');
    });
  });
}

/* ----- Intersection Observer for fade-in ----- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ----- Star rating bars ----- */
function initStarBars() {
  const skillItems = document.querySelectorAll('.skill-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderStarBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillItems.forEach((item) => observer.observe(item));
}

function renderStarBar(item) {
  const stars = parseInt(item.dataset.stars, 10);
  const maxStars = 5;
  const barContainer = item.querySelector('.star-bar');
  const label = item.querySelector('.star-label');

  label.textContent = '★'.repeat(stars) + '☆'.repeat(maxStars - stars);

  for (let i = 0; i < maxStars; i++) {
    const segment = document.createElement('div');
    segment.classList.add('bar-segment');
    if (i < stars) segment.classList.add('filled');
    barContainer.appendChild(segment);
  }

  requestAnimationFrame(() => {
    barContainer.classList.add('animated');
  });
}

/* ----- Active nav link on scroll ----- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}
