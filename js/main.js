// ============================================
// Canopy Marketing Website — Main JS
// ============================================

(function () {
  'use strict';

  // Nav scroll effect
  var nav = document.getElementById('nav');

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
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Pricing toggle
  var pricingToggle = document.getElementById('pricingToggle');
  var priceAmounts = document.querySelectorAll('.pricing-card__amount');
  var periodLabels = document.querySelectorAll('.pricing-card__period');
  var toggleLabels = document.querySelectorAll('.pricing__toggle-label');
  var isYearly = false;

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

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (target.classList.contains('feature-card')) {
          target.classList.remove('highlight');
          void target.offsetWidth;
          target.classList.add('highlight');
        }
      }
    });
  });

  // Bubble hover effects
  document.querySelectorAll('.bubble').forEach(function (bubble) {
    bubble.addEventListener('mouseenter', function () {
      this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)';
    });
    bubble.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
    });
  });
})();
