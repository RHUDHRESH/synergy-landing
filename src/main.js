import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  gsap.set(bar, { transformOrigin: 'left' });
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

function initCursorGlow() {
  if (prefersReducedMotion) return;
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let x = 0, y = 0, targetX = 0, targetY = 0;
  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
  function animate() {
    x += (targetX - x) * 0.08;
    y += (targetY - y) * 0.08;
    glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

function initMagneticButtons() {
  if (prefersReducedMotion) return;
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.classList.add('magnetic-btn');
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

function animateHero() {
  if (prefersReducedMotion) {
    gsap.set('#hero-badge, #hero-sub, #hero-ctas, #hero-mockup', { opacity: 1 });
    return;
  }
  gsap.set('#hero-sub', { y: 30, opacity: 0 });
  gsap.set('#hero-ctas', { y: 30, opacity: 0 });
  gsap.set('#hero-mockup', { y: 60, opacity: 0, rotateX: 8 });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('#hero-badge', { opacity: 1, duration: 0.8, delay: 0.3 })
    .to('#hero-sub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to('#hero-ctas', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('#hero-mockup', { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power2.out' }, '-=0.4');
  gsap.utils.toArray('.orb').forEach((orb, i) => {
    gsap.to(orb, {
      x: `random(-80, 80)`,
      y: `random(-80, 80)`,
      duration: `random(10, 20)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 2
    });
  });
}

function animateHeader() {
  gsap.from('#header', { y: '-100%', duration: 0.8, ease: 'power3.out' });
  ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
      const header = document.getElementById('header');
      if (self.scroll() > 50) {
        header.style.background = 'rgba(5,5,7,0.8)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
      } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.borderBottom = 'none';
      }
    }
  });
}

function animateMarquee() {
  const marquee = document.getElementById('logo-marquee');
  if (!marquee) return;
  gsap.to(marquee, {
    x: '-50%',
    duration: 40,
    ease: 'none',
    repeat: -1
  });
}

function animateSectionReveals() {
  if (prefersReducedMotion) return;
  gsap.utils.toArray('section:not(#hero):not(#how-it-works)').forEach(section => {
    gsap.from(section, {
      scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 60%', scrub: 1 },
      opacity: 0, y: 40, duration: 1
    });
  });
}

function animateProblem() {
  if (prefersReducedMotion) return;
  gsap.from('#problem-heading', {
    scrollTrigger: { trigger: '#problem', start: 'top 80%' },
    opacity: 0, y: 50, duration: 1, ease: 'power3.out'
  });
  gsap.from('#problem-visual', {
    scrollTrigger: { trigger: '#problem', start: 'top 75%' },
    opacity: 0, x: 80, rotateY: -5, duration: 1.2, ease: 'power3.out'
  });
}

function animateHorizontalScroll() {
  if (prefersReducedMotion) {
    gsap.set('.horizontal-card', { opacity: 1 });
    return;
  }
  const container = document.getElementById('horizontal-scroll-container');
  const track = document.getElementById('horizontal-scroll-track');
  const progressBar = document.getElementById('horizontal-progress-bar');
  if (!container || !track) return;
  const cards = track.querySelectorAll('.horizontal-card');
  const totalScroll = (cards.length - 1) * (window.innerWidth * 0.6 + 24);
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
        if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
      }
    }
  });
}

function animateFeatures() {
  if (prefersReducedMotion) return;
  document.querySelectorAll('.feature-block').forEach((block) => {
    const mockup = block.querySelector('.feature-mockup');
    const text = block.querySelector('.feature-text');
    const isReversed = block.querySelector('.md\:order-2');
    gsap.from(block, {
      scrollTrigger: { trigger: block, start: 'top 85%' },
      opacity: 0, y: 60, duration: 0.8, ease: 'power3.out'
    });
    if (mockup) {
      gsap.from(mockup, {
        scrollTrigger: { trigger: block, start: 'top 80%' },
        opacity: 0, x: isReversed ? -60 : 60, duration: 1, ease: 'power3.out'
      });
      gsap.to(mockup, {
        scrollTrigger: { trigger: block, start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -30
      });
    }
    if (text) {
      gsap.from(text, {
        scrollTrigger: { trigger: block, start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8, delay: 0.15, ease: 'power3.out'
      });
    }
  });
}

function animateIntegrations() {
  if (prefersReducedMotion) return;
  const grid = document.getElementById('integrations-grid');
  if (!grid) return;
  const integrations = ['Slack', 'GitHub', 'Google', 'Figma', 'Notion', 'Jira', 'Zoom', 'Dropbox', 'Trello', 'Asana', 'Stripe', 'Salesforce', 'HubSpot', 'Zapier', 'Discord', 'Teams'];
  integrations.forEach(name => {
    const tile = document.createElement('div');
    tile.className = 'integration-tile';
    tile.textContent = name;
    grid.appendChild(tile);
  });
  gsap.from('.integration-tile', {
    scrollTrigger: { trigger: '#integrations', start: 'top 85%' },
    opacity: 0, scale: 0.9, duration: 0.4, stagger: 0.02, ease: 'power2.out'
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
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: function() {
        const current = this.targets()[0].val;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      }
    });
  });
  gsap.from('.stat-card', {
    scrollTrigger: { trigger: '#stats', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.7, stagger: 0.12, ease: 'power3.out'
  });
}

function animateCaseStudy() {
  if (prefersReducedMotion) return;
  gsap.from('#case-study .mockup', {
    scrollTrigger: { trigger: '#case-study', start: 'top 80%' },
    opacity: 0, x: -60, duration: 1, ease: 'power3.out'
  });
  gsap.from('#case-study blockquote, #case-study h3, #case-study .grid', {
    scrollTrigger: { trigger: '#case-study', start: 'top 75%' },
    opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out'
  });
}

function animateComparison() {
  if (prefersReducedMotion) return;
  gsap.from('#comparison tbody tr', {
    scrollTrigger: { trigger: '#comparison', start: 'top 85%' },
    opacity: 0, y: 20, duration: 0.4, stagger: 0.06, ease: 'power2.out'
  });
}

function animateTestimonials() {
  if (prefersReducedMotion) return;
  gsap.from('.testimonial-card', {
    scrollTrigger: { trigger: '#testimonials-carousel', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out'
  });
}

function animateTeam() {
  if (prefersReducedMotion) return;
  gsap.from('.team-card', {
    scrollTrigger: { trigger: '#team', start: 'top 85%' },
    opacity: 0, y: 50, scale: 0.95, duration: 0.7, stagger: 0.1, ease: 'power3.out'
  });
}

function animatePricing() {
  if (prefersReducedMotion) return;
  gsap.from('.pricing-card', {
    scrollTrigger: { trigger: '#pricing', start: 'top 85%' },
    opacity: 0, y: 60, duration: 0.8, stagger: 0.12, ease: 'power3.out'
  });
  const monthlyBtn = document.getElementById('monthly-btn');
  const annualBtn = document.getElementById('annual-btn');
  const priceAmounts = document.querySelectorAll('.price-amount');
  function updatePricing(isAnnual) {
    if (isAnnual) { monthlyBtn.classList.remove('active'); annualBtn.classList.add('active'); }
    else { annualBtn.classList.remove('active'); monthlyBtn.classList.add('active'); }
    priceAmounts.forEach(el => {
      const price = isAnnual ? el.dataset.annual : el.dataset.monthly;
      el.textContent = `$${price}`;
      gsap.from(el, { scale: 0.8, opacity: 0, duration: 0.3, ease: 'back.out(1.7)' });
    });
  }
  monthlyBtn?.addEventListener('click', () => updatePricing(false));
  annualBtn?.addEventListener('click', () => updatePricing(true));
}

function animateDemo() {
  if (prefersReducedMotion) return;
  gsap.from('#demo .mockup', {
    scrollTrigger: { trigger: '#demo', start: 'top 80%' },
    opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out'
  });
}

function animateBlog() {
  if (prefersReducedMotion) return;
  gsap.from('.blog-card', {
    scrollTrigger: { trigger: '#blog', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.7, stagger: 0.1, ease: 'power3.out'
  });
}

function animateMobileApp() {
  if (prefersReducedMotion) return;
  gsap.from('.phone', {
    scrollTrigger: { trigger: '#mobile-app', start: 'top 80%' },
    opacity: 0, y: 100, duration: 1.2, stagger: 0.15, ease: 'power3.out'
  });
}

function animateNewsletter() {
  if (prefersReducedMotion) return;
  gsap.from('#newsletter-form', {
    scrollTrigger: { trigger: '#newsletter', start: 'top 85%' },
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out'
  });
}

function animateCTA() {
  if (prefersReducedMotion) return;
  gsap.from('#cta h2', {
    scrollTrigger: { trigger: '#cta', start: 'top 80%' },
    opacity: 0, y: 50, duration: 0.8, ease: 'power3.out'
  });
  gsap.from('#cta .btn-primary', {
    scrollTrigger: { trigger: '#cta', start: 'top 75%' },
    opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(1.7)'
  });
}

function animateFooter() {
  if (prefersReducedMotion) return;
  gsap.from('#footer', {
    scrollTrigger: { trigger: '#footer', start: 'top 95%' },
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out'
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
      nav.classList.toggle('hidden'); nav.classList.toggle('flex'); nav.classList.toggle('flex-col');
      nav.classList.toggle('absolute'); nav.classList.toggle('top-[72px]');
      nav.classList.toggle('left-0'); nav.classList.toggle('right-0');
      nav.classList.toggle('bg-[#050507]/95'); nav.classList.toggle('backdrop-blur-xl');
      nav.classList.toggle('p-6'); nav.classList.toggle('gap-4');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCursorGlow();
  initMagneticButtons();
  animateHero();
  animateHeader();
  animateMarquee();
  animateSectionReveals();
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
});
