(function () {
  'use strict';

  // ==============================
  // PERFORMANCE DETECTION
  // ==============================
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isLowPerf = isMobile || (navigator.hardwareConcurrency || 8) <= 4;
  const perfMultiplier = isLowPerf ? 0.4 : 1;

  // ==============================
  // PARTICLE SYSTEM (Canvas)
  // ==============================
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.rays = [];
      this.biolum = [];
      this.animId = null;
      this.maxParticles = Math.round(80 * perfMultiplier);
      this.maxRays = Math.round(4 * perfMultiplier);
      this.maxBiolum = Math.round(12 * perfMultiplier);

      this.resize();
      this.init();
      this.bindResize();
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = window.innerWidth * dpr;
      this.canvas.height = window.innerHeight * dpr;
      this.ctx.scale(dpr, dpr);
      this.w = window.innerWidth;
      this.h = window.innerHeight;
    }

    bindResize() {
      let ticking = false;
      window.addEventListener('resize', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.resize();
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    init() {
      this.particles = [];
      this.rays = [];
      this.biolum = [];

      for (let i = 0; i < this.maxParticles; i++) {
        this.particles.push(this.createParticle());
      }
      for (let i = 0; i < this.maxRays; i++) {
        this.rays.push(this.createRay());
      }
      for (let i = 0; i < this.maxBiolum; i++) {
        this.biolum.push(this.createBiolum());
      }
    }

    createParticle() {
      return {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        size: 1 + Math.random() * (isMobile ? 1.5 : 2.5),
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.1 - Math.random() * 0.2,
        opacity: 0.1 + Math.random() * 0.4,
        pulseSpeed: 0.005 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
      };
    }

    createRay() {
      return {
        x: Math.random() * this.w,
        width: 2 + Math.random() * 4,
        height: 60 + Math.random() * 120,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.015 + Math.random() * 0.025,
      };
    }

    createBiolum() {
      return {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        size: 1.5 + Math.random() * 3,
        speed: 0.2 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        opacity: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: 300 + Math.random() * 400,
      };
    }

    update() {
      const w = this.w;
      const h = this.h;

      for (const p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        p.phase += p.pulseSpeed;
      }

      for (const r of this.rays) {
        r.x += r.speed * 0.5;
        if (r.x > w + 20) r.x = -20;
        r.opacity = 0.015 + Math.random() * 0.02;
      }

      for (const b of this.biolum) {
        b.life++;
        if (b.life > b.maxLife) {
          Object.assign(b, this.createBiolum());
          b.life = 0;
          return;
        }
        b.angle += 0.01;
        b.x += Math.cos(b.angle) * 0.2;
        b.y += Math.sin(b.angle) * 0.15;
        if (b.x < -10 || b.x > w + 10 || b.y < -10 || b.y > h + 10) {
          b.x = Math.random() * w;
          b.y = Math.random() * h;
        }
        b.phase += 0.02;
      }
    }

    draw() {
      const ctx = this.ctx;
      const w = this.w;
      const h = this.h;

      ctx.clearRect(0, 0, w, h);

      for (const r of this.rays) {
        const grad = ctx.createLinearGradient(r.x, 0, r.x + r.width * 0.5, r.height);
        grad.addColorStop(0, `rgba(0, 180, 216, ${r.opacity})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(r.x, 0, r.width, r.height);
      }

      for (const p of this.particles) {
        const o = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${o})`;
        ctx.fill();
      }

      for (const b of this.biolum) {
        const progress = b.life / b.maxLife;
        const fadeIn = Math.min(progress * 3, 1);
        const fadeOut = Math.max(1 - progress * 1.2, 0);
        const o = b.opacity * fadeIn * fadeOut * (0.7 + 0.3 * Math.sin(b.phase));

        if (o < 0.01) continue;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size * 4);
        grad.addColorStop(0, `rgba(0, 212, 255, ${o * 0.6})`);
        grad.addColorStop(0.3, `rgba(0, 180, 216, ${o * 0.2})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 240, 255, ${o * 0.5})`;
        ctx.fill();
      }
    }

    loop() {
      this.update();
      this.draw();
      this.animId = requestAnimationFrame(() => this.loop());
    }

    start() {
      if (!this.animId) this.loop();
    }

    stop() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }
  }

  // ==============================
  // STARS GENERATOR
  // ==============================
  function createStars(container) {
    const count = isLowPerf ? 40 : 80;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = 1 + Math.random() * 2;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
      star.style.setProperty('--max-op', (0.3 + Math.random() * 0.7));
      star.style.animationDelay = (Math.random() * 4) + 's';
      frag.appendChild(star);
    }

    container.appendChild(frag);
  }

  // ==============================
  // SPARKLE GENERATOR (Envelope)
  // ==============================
  function createSparkles(container) {
    const count = isLowPerf ? 8 : 16;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        background: #fff;
        border-radius: 50%;
        left: ${5 + Math.random() * 90}%;
        top: ${5 + Math.random() * 90}%;
        opacity: 0;
        box-shadow: 0 0 ${4 + Math.random() * 6}px rgba(0, 180, 216, 0.6);
        animation: sparkle-burst ${1.5 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite;
      `;
      frag.appendChild(sparkle);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle-burst {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 0.8; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);

    container.appendChild(frag);
  }

  // ==============================
  // ENVELOPE ANIMATION
  // ==============================
  class EnvelopeAnimation {
    constructor() {
      this.envelope = document.getElementById('envelope');
      this.letter = document.getElementById('letter');
      this.btn = document.getElementById('open-btn');
      this.screen = document.getElementById('envelope-screen');
      this.mainContent = document.getElementById('main-content');
      this.isAnimating = false;
      this.bind();
    }

    bind() {
      this.btn.addEventListener('click', () => this.start());
    }

    start() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      this.btn.classList.add('loading');
      this.btn.disabled = true;

      setTimeout(() => {
        this.stepIlluminate();
      }, 300);
    }

    stepIlluminate() {
      this.envelope.classList.add('illuminating');

      this.envelope.querySelector('.envelope-border-glow').style.opacity = '1';
      this.envelope.querySelector('.envelope-border-glow').style.boxShadow =
        '0 0 50px rgba(0, 180, 216, 0.4), 0 0 100px rgba(0, 180, 216, 0.15)';

      setTimeout(() => this.stepOpen(), 400);
    }

    stepOpen() {
      this.envelope.classList.add('opening');
      this.btn.style.opacity = '0';
      this.btn.style.transform = 'translateY(20px)';

      setTimeout(() => this.stepLetterEmerge(), 600);
    }

    stepLetterEmerge() {
      setTimeout(() => this.stepLightBurst(), 400);
    }

    stepLightBurst() {
      const burst = document.createElement('div');
      burst.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 180, 216, 0.3), transparent);
        transform: translate(-50%, -50%);
        z-index: 999;
        pointer-events: none;
        transition: width 1s ease, height 1s ease, opacity 1s ease;
      `;
      document.body.appendChild(burst);

      requestAnimationFrame(() => {
        burst.style.width = '200vw';
        burst.style.height = '200vw';
        burst.style.opacity = '0';
      });

      setTimeout(() => this.stepRevealContent(), 1000);
    }

    stepRevealContent() {
      this.screen.classList.add('fade-out');

      setTimeout(() => {
        this.screen.style.display = 'none';
        this.mainContent.classList.remove('hidden');
        this.mainContent.classList.add('visible');
        this.animateSections();
      }, 800);
    }

    animateSections() {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.card, .gallery-item, .contacto-inner').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
      });
    }
  }

  // ==============================
  // INIT
  // ==============================
  function init() {
    const canvas = document.getElementById('particle-canvas');
    const starsContainer = document.getElementById('stars-container');
    const sparklesContainer = document.getElementById('envelope-sparkles');

    const particles = new ParticleSystem(canvas);
    particles.start();

    createStars(starsContainer);
    createSparkles(sparklesContainer);

    new EnvelopeAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
