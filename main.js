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
      new AnimationManager();
      new EffectsManager();
      new ContactManager();
      new PerformanceMonitor();
      
      console.log('Portfolio application initialized successfully');
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }
}

// Start the application
new App();

// Export for potential testing
export { ThemeManager, NavigationManager, AnimationManager, EffectsManager };