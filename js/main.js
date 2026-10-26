// ============================================
// Canopy Marketing Website — Main JS
// ============================================

(function () {
  'use strict';

  // Nav scroll effect
  const nav = document.getElementById('nav');
  const heroSection = document.getElementById('hero');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Pricing toggle
  const pricingToggle = document.getElementById('pricingToggle');
  const priceAmounts = document.querySelectorAll('.pricing-card__amount');
  const periodLabels = document.querySelectorAll('.pricing-card__period');
  const toggleLabels = document.querySelectorAll('.pricing__toggle-label');
  let isYearly = false;

  pricingToggle.addEventListener('click', function () {
    isYearly = !isYearly;
    pricingToggle.classList.toggle('active', isYearly);

    toggleLabels.forEach(function (label) {
      label.classList.toggle('pricing__toggle-label--active',
        (label.dataset.period === 'yearly') === isYearly
      );
    });

    priceAmounts.forEach(function (el) {
      var price = isYearly ? el.dataset.yearly : el.dataset.monthly;
      el.textContent = '$' + price;
    });

    periodLabels.forEach(function (el) {
      el.textContent = isYearly ? '/yr' : '/mo';
    });
  });

  // Scroll-reveal observer
  var revealElements = document.querySelectorAll(
    '.feature-card, .pricing-card, .testimonial-card, .step'
  );

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // Parallax on hero (subtle)
  var parallaxBg = document.querySelector('.hero__parallax-bg');
  var heroTree = document.querySelector('.hero__tree');

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      var rate = scrolled * 0.3;
      parallaxBg.style.transform = 'translateY(' + rate + 'px)';
      if (heroTree) {
        heroTree.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
      }
    }
  }, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Canopy icon tooltips on hover
  document.querySelectorAll('.canopy-icon').forEach(function (icon) {
    icon.addEventListener('mouseenter', function () {
      this.style.filter = 'drop-shadow(0 0 8px rgba(232, 168, 56, 0.4))';
    });
    icon.addEventListener('mouseleave', function () {
      this.style.filter = '';
    });
  });
})();
