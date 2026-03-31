import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitTextByChar(element) {
  const text = element.textContent;
  element.innerHTML = '';
  element.style.display = 'inline-block';
  return [...text].map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(60px)';
    element.appendChild(span);
    return span;
  });
}

function animateHero() {
  if (prefersReducedMotion) {
    gsap.set('#hero-badge, #hero-sub, #hero-ctas, #hero-mockup', { opacity: 1 });
    return;
  }

  const tl = gsap.timeline();

  tl.to('#hero-badge', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.2 })
    .to('#hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to('#hero-ctas', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('#hero-mockup', { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'power3.out' }, '-=0.4');

  gsap.set('#hero-sub, #hero-ctas, #hero-mockup', { y: 30 });
  gsap.set('#hero-mockup', { rotationX: 10, y: 100 });
}

function animateHeader() {
  gsap.from('#header', { y: '-100%', duration: 0.6, ease: 'power3.out' });

  ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
      const header = document.getElementById('header');
      if (self.direction === 1 || self.scroll() > 50) {
        header.classList.add('glass-strong', 'border-b', 'border-white/5');
      } else {
        header.classList.remove('glass-strong', 'border-b', 'border-white/5');
      }
    }
  });
}

function animateMarquee() {
  const marquee = document.getElementById('logo-marquee');
  if (!marquee) return;

  gsap.to(marquee, {
    x: '-50%',
    duration: 30,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % (marquee.offsetWidth / 2))
    }
  });
}

function animateProblem() {
  if (prefersReducedMotion) return;

  gsap.from('#problem-heading', {
    scrollTrigger: { trigger: '#problem', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
  });

  gsap.from('#problem-visual', {
    scrollTrigger: { trigger: '#problem', start: 'top 70%' },
    opacity: 0, x: 60, duration: 1, ease: 'power3.out'
  });
}

function animateHorizontalScroll() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('horizontal-scroll-container');
  const track = document.getElementById('horizontal-scroll-track');
  const progressBar = document.getElementById('horizontal-progress-bar');

  if (!container || !track) return;

  const cards = track.querySelectorAll('.horizontal-card');
  const totalScroll = (cards.length - 1) * (window.innerWidth * 0.8 + 32);

  gsap.to(track, {
    x: () => -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${container.offsetHeight - window.innerHeight}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        if (progressBar) {
          progressBar.style.width = `${self.progress * 100}%`;
        }
      }
    }
  });

  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.95,
      scrollTrigger: {
        trigger: container,
        start: () => `top+=${(i * 0.25) * (container.offsetHeight - window.innerHeight)} top`,
        end: () => `top+=${((i + 1) * 0.25) * (container.offsetHeight - window.innerHeight)} top`,
        scrub: true
      }
    });
  });
}

function animateFeatures() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.feature-block').forEach((block) => {
    const mockup = block.querySelector('.feature-mockup');
    const text = block.querySelector('.feature-text');

    gsap.from(block, {
      scrollTrigger: { trigger: block, start: 'top 80%' },
      opacity: 0, y: 60, duration: 0.8, ease: 'power3.out'
    });

    if (mockup) {
      gsap.from(mockup, {
        scrollTrigger: { trigger: block, start: 'top 75%' },
        opacity: 0, x: mockup.parentElement.classList.contains('md:order-2') || !block.querySelector('.md\\:order-2') ? -60 : 60, duration: 1, ease: 'power3.out'
      });
    }

    if (text) {
      gsap.from(text, {
        scrollTrigger: { trigger: block, start: 'top 75%' },
        opacity: 0, y: 40, duration: 0.8, delay: 0.2, ease: 'power3.out'
      });
    }
  });
}

function animateIntegrations() {
  if (prefersReducedMotion) return;

  const grid = document.getElementById('integrations-grid');
  if (!grid) return;

  const integrations = [
    'Slack', 'GitHub', 'Google', 'Figma', 'Notion', 'Jira', 'Zoom', 'Dropbox',
    'Trello', 'Asana', 'Stripe', 'Salesforce', 'HubSpot', 'Zapier', 'Discord', 'Teams'
  ];

  integrations.forEach(name => {
    const tile = document.createElement('div');
    tile.className = 'integration-tile p-4 rounded-xl glass flex items-center justify-center text-text-secondary text-sm font-medium hover:-translate-y-1 hover:border-accent-primary/30 transition-all cursor-pointer';
    tile.textContent = name;
    grid.appendChild(tile);
  });

  gsap.from('.integration-tile', {
    scrollTrigger: { trigger: '#integrations', start: 'top 80%' },
    opacity: 0, scale: 0.9, duration: 0.4, stagger: 0.03, ease: 'power2.out'
  });
}

function animateStats() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;

    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: function() {
        const current = this.targets()[0].val;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      }
    });
  });

  gsap.from('.stat-card', {
    scrollTrigger: { trigger: '#stats', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.6, stagger: 0.15, ease: 'power3.out'
  });
}

function animateCaseStudy() {
  if (prefersReducedMotion) return;

  gsap.from('#case-study', {
    scrollTrigger: { trigger: '#case-study', start: 'top 80%' },
    opacity: 0, y: 60, duration: 0.8, ease: 'power3.out'
  });
}

function animateComparison() {
  if (prefersReducedMotion) return;

  gsap.from('#comparison tbody tr', {
    scrollTrigger: { trigger: '#comparison', start: 'top 80%' },
    opacity: 0, y: 20, duration: 0.4, stagger: 0.05, ease: 'power2.out'
  });
}

function animateTestimonials() {
  if (prefersReducedMotion) return;

  gsap.from('#testimonials', {
    scrollTrigger: { trigger: '#testimonials', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
  });

  gsap.from('.testimonial-card', {
    scrollTrigger: { trigger: '#testimonials-carousel', start: 'top 85%' },
    opacity: 0, x: 60, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });
}

function animateTeam() {
  if (prefersReducedMotion) return;

  gsap.from('.team-card', {
    scrollTrigger: { trigger: '#team', start: 'top 80%' },
    opacity: 0, y: 40, scale: 0.95, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });
}

function animatePricing() {
  if (prefersReducedMotion) return;

  gsap.from('.pricing-card', {
    scrollTrigger: { trigger: '#pricing', start: 'top 80%' },
    opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: 'power3.out'
  });

  const monthlyBtn = document.getElementById('monthly-btn');
  const annualBtn = document.getElementById('annual-btn');
  const priceAmounts = document.querySelectorAll('.price-amount');

  function updatePricing(isAnnual) {
    if (isAnnual) {
      monthlyBtn.classList.remove('bg-accent-primary', 'text-white');
      monthlyBtn.classList.add('text-text-secondary');
      annualBtn.classList.add('bg-accent-primary', 'text-white');
      annualBtn.classList.remove('text-text-secondary');
    } else {
      annualBtn.classList.remove('bg-accent-primary', 'text-white');
      annualBtn.classList.add('text-text-secondary');
      monthlyBtn.classList.add('bg-accent-primary', 'text-white');
      monthlyBtn.classList.remove('text-text-secondary');
    }

    priceAmounts.forEach(el => {
      const price = isAnnual ? el.dataset.annual : el.dataset.monthly;
      gsap.to(el, {
        innerText: `$${price}`,
        duration: 0.3,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate: function() {
          el.textContent = `$${Math.round(this.targets()[0].innerText.replace('$', ''))}`;
        }
      });
      el.textContent = `$${price}`;
    });
  }

  monthlyBtn?.addEventListener('click', () => updatePricing(false));
  annualBtn?.addEventListener('click', () => updatePricing(true));
}

function animateDemo() {
  if (prefersReducedMotion) return;

  gsap.from('#demo .aspect-video', {
    scrollTrigger: { trigger: '#demo', start: 'top 80%' },
    opacity: 0, scale: 0.95, duration: 0.8, ease: 'power3.out'
  });
}

function animateBlog() {
  if (prefersReducedMotion) return;

  gsap.from('.blog-card', {
    scrollTrigger: { trigger: '#blog', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });
}

function animateMobileApp() {
  if (prefersReducedMotion) return;

  gsap.from('.phone-mockup', {
    scrollTrigger: { trigger: '#mobile-app', start: 'top 80%' },
    opacity: 0, y: 80, rotation: (i) => (i - 1) * 15, duration: 1, stagger: 0.15, ease: 'power3.out',
    onComplete: function() {
      gsap.set('.phone-mockup', { rotation: (i) => (i === 0 ? -8 : i === 2 ? 8 : 0) });
    }
  });
}

function animateNewsletter() {
  if (prefersReducedMotion) return;

  gsap.from('#newsletter-form', {
    scrollTrigger: { trigger: '#newsletter', start: 'top 85%' },
    opacity: 0, y: 30, duration: 0.6, ease: 'power3.out'
  });
}

function animateCTA() {
  if (prefersReducedMotion) return;

  gsap.from('#cta h2', {
    scrollTrigger: { trigger: '#cta', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
  });

  gsap.from('#cta a', {
    scrollTrigger: { trigger: '#cta', start: 'top 75%' },
    opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(1.7)'
  });

  gsap.to('#cta a', {
    boxShadow: '0 0 30px rgba(99,102,241,0.4)',
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
}

function animateFooter() {
  if (prefersReducedMotion) return;

  gsap.from('#footer', {
    scrollTrigger: { trigger: '#footer', start: 'top 95%' },
    opacity: 0, y: 30, duration: 0.6, ease: 'power3.out'
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: target, offsetY: 72 }, duration: 1, ease: 'power3.inOut' });
      }
    });
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  btn?.addEventListener('click', () => {
    const nav = document.querySelector('#header nav .hidden.md\\:flex');
    if (nav) {
      nav.classList.toggle('hidden');
      nav.classList.toggle('flex');
      nav.classList.toggle('flex-col');
      nav.classList.toggle('absolute');
      nav.classList.toggle('top-[72px]');
      nav.classList.toggle('left-0');
      nav.classList.toggle('right-0');
      nav.classList.toggle('bg-base/95');
      nav.classList.toggle('backdrop-blur-xl');
      nav.classList.toggle('p-6');
      nav.classList.toggle('gap-4');
    }
  });
}

function initOrbs() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.orb').forEach((orb, i) => {
    gsap.to(orb, {
      x: `random(-50, 50)`,
      y: `random(-50, 50)`,
      duration: `random(8, 15)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateHero();
  animateHeader();
  animateMarquee();
  animateProblem();
  animateHorizontalScroll();
  animateFeatures();
  animateIntegrations();
  animateStats();
  animateCaseStudy();
  animateComparison();
  animateTestimonials();
  animateTeam();
  animatePricing();
  animateDemo();
  animateBlog();
  animateMobileApp();
  animateNewsletter();
  animateCTA();
  animateFooter();
  initSmoothScroll();
  initMobileMenu();
  initOrbs();
});
