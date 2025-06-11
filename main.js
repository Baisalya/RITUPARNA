import './style.css'

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
  }

  applyTheme() {
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', this.theme);
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  bindEvents() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggle());
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.mobileMenuPanel = document.getElementById('mobile-menu-panel');
    this.closeMobileMenu = document.getElementById('close-mobile-menu');
    this.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener('click', () => this.openMobileMenu());
    }

    if (this.closeMobileMenu) {
      this.closeMobileMenu.addEventListener('click', () => this.closeMobileMenuPanel());
    }

    if (this.mobileMenuOverlay) {
      this.mobileMenuOverlay.addEventListener('click', () => this.closeMobileMenuPanel());
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          this.closeMobileMenuPanel();
        }
      });
    });

    // Scroll handling
    window.addEventListener('scroll', () => this.handleScroll());
  }

  openMobileMenu() {
    if (this.mobileMenuPanel) {
      this.mobileMenuPanel.classList.remove('translate-x-full');
    }
  }

  closeMobileMenuPanel() {
    if (this.mobileMenuPanel) {
      this.mobileMenuPanel.classList.add('translate-x-full');
    }
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar?.classList.add('bg-white/90', 'dark:bg-gray-900/90', 'shadow-lg');
    } else {
      this.navbar?.classList.remove('bg-white/90', 'dark:bg-gray-900/90', 'shadow-lg');
    }
  }
}

// Rocket Launch Animation Manager
class RocketLaunchManager {
  constructor() {
    this.profilePhoto = document.getElementById('profile-photo');
    this.rocketContainer = document.getElementById('rocket-container');
    this.rocket = document.getElementById('rocket');
    this.rocketTrail = document.getElementById('rocket-trail');
    this.blastModal = document.getElementById('blast-modal');
    this.blastContent = document.getElementById('blast-content');
    this.closeBlast = document.getElementById('close-blast');
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    if (this.profilePhoto) {
      this.profilePhoto.addEventListener('click', () => this.launchRocket());
    }

    if (this.closeBlast) {
      this.closeBlast.addEventListener('click', () => this.closeBlastModal());
    }

    // Close modal on backdrop click
    if (this.blastModal) {
      this.blastModal.addEventListener('click', (e) => {
        if (e.target === this.blastModal) {
          this.closeBlastModal();
        }
      });
    }
  }

  launchRocket() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    // Get profile photo position
    const photoRect = this.profilePhoto.getBoundingClientRect();
    const startX = photoRect.left + photoRect.width / 2;
    const startY = photoRect.top + photoRect.height / 2;
    
    // Show rocket container
    this.rocketContainer.classList.remove('hidden');
    
    // Position rocket at profile photo
    this.rocket.style.left = `${startX}px`;
    this.rocket.style.top = `${startY}px`;
    this.rocket.style.transform = 'rotate(-45deg) scale(1)';
    
    // Create trail effect
    this.createTrailEffect();
    
    // Animate rocket launch
    setTimeout(() => {
      this.animateRocketFlight();
    }, 100);
  }

  createTrailEffect() {
    // Create multiple trail particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-orange-400 rounded-full opacity-70';
      particle.style.left = this.rocket.style.left;
      particle.style.top = this.rocket.style.top;
      this.rocketContainer.appendChild(particle);
      
      // Animate particles
      setTimeout(() => {
        particle.style.transition = 'all 0.5s ease-out';
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`;
        particle.style.opacity = '0';
        
        setTimeout(() => {
          particle.remove();
        }, 500);
      }, i * 50);
    }
  }

  animateRocketFlight() {
    // Calculate target position (contact section)
    const contactSection = document.getElementById('contact');
    const contactRect = contactSection.getBoundingClientRect();
    const targetX = contactRect.left + contactRect.width / 2;
    const targetY = contactRect.top + contactRect.height / 2;
    
    // Animate rocket to target
    this.rocket.style.transition = 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    this.rocket.style.left = `${targetX}px`;
    this.rocket.style.top = `${targetY}px`;
    this.rocket.style.transform = 'rotate(-45deg) scale(1.5)';
    
    // Start auto-scroll to contact section
    setTimeout(() => {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 500);
    
    // Show blast effect after rocket reaches target
    setTimeout(() => {
      this.showBlastEffect();
    }, 2000);
  }

  showBlastEffect() {
    // Hide rocket
    this.rocketContainer.classList.add('hidden');
    
    // Show blast modal
    this.blastModal.classList.remove('hidden');
    this.blastModal.classList.add('flex');
    
    // Animate blast content
    setTimeout(() => {
      this.blastContent.style.transform = 'scale(1)';
    }, 100);
    
    // Add screen shake effect
    document.body.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);
  }

  closeBlastModal() {
    this.blastContent.style.transform = 'scale(0)';
    
    setTimeout(() => {
      this.blastModal.classList.add('hidden');
      this.blastModal.classList.remove('flex');
      this.isAnimating = false;
    }, 300);
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.observeElements();
    this.initializeCounters();
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  initializeCounters() {
    const counters = document.querySelectorAll('.stat-card h4');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 30);
  }
}

// 3D Effects Manager
class EffectsManager {
  constructor() {
    this.init();
  }

  init() {
    this.initFloatingShapes();
    this.initParallaxEffect();
    this.initSkillBars();
  }

  initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
      shape.style.setProperty('--delay', `${index * 0.5}s`);
      
      // Add random movement
      setInterval(() => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        shape.style.transform += ` translate(${randomX}px, ${randomY}px)`;
      }, 3000);
    });
  }

  initParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-shape');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.width || '0%';
          skillObserver.unobserve(entry.target);
        }
      });
    });

    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });
  }
}

// Contact Form Manager
class ContactManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindFormEvents();
  }

  bindFormEvents() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        if (button.textContent.includes('Download')) {
          this.downloadResume();
        } else if (button.textContent.includes('Get In Touch')) {
          this.scrollToContact();
        }
      });
    });
  }

  downloadResume() {
    // In a real application, this would trigger a resume download
    alert('Resume download feature will be implemented with actual resume file.');
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If contact section doesn't exist yet, show contact info
      alert('Contact: parijarituparna@gmail.com | Phone: +91-8457047744');
    }
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.deferNonCriticalCSS();
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        img.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Image+Not+Found';
      });
    });
  }

  deferNonCriticalCSS() {
    // This would defer non-critical CSS loading in a production environment
    console.log('Performance optimizations applied');
  }
}

// Initialize Application
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeManagers());
    } else {
      this.initializeManagers();
    }
  }

  initializeManagers() {
    try {
      new ThemeManager();
      new NavigationManager();
      new RocketLaunchManager(); // New rocket launch feature
      new AnimationManager();
      new EffectsManager();
      new ContactManager();
      new PerformanceMonitor();
      
      console.log('Portfolio application with rocket launch feature initialized successfully');
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }
}

// Start the application
new App();

// Export for potential testing
export { ThemeManager, NavigationManager, AnimationManager, EffectsManager, RocketLaunchManager };