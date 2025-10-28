// ===== NAVIGATION =====
const initNavigation = () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (!hamburger || !navLinks) return;
  
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isActive);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? '' : 'hidden';
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
};

// ===== SMOOTH SCROLL =====
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      
      // Handle empty hash or just "#"
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      const navLinks = document.getElementById('navLinks');
      const hamburger = document.getElementById('hamburger');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
      
      // Smooth scroll to target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL without jumping
      history.pushState(null, '', href);
    });
  });
};

// ===== SCROLL REVEAL =====
const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal, .section');
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after reveal for performance
          // revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );
  
  revealElements.forEach((el) => revealObserver.observe(el));
};

// ===== COPY TO CLIPBOARD =====
const initCopyToClipboard = () => {
  const copyButton = document.getElementById('copyButton');
  const copyText = document.getElementById('copyText');
  
  if (!copyButton || !copyText) return;
  
  copyButton.addEventListener('click', () => {
    const textToCopy = copyText.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyButton.innerText = 'Copied!';
      setTimeout(() => {
        copyButton.innerText = 'Copy';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
};

// ===== NAV BACKGROUND ON SCROLL =====
const initNavScroll = () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  let lastScroll = 0;
  
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove shadow based on scroll
    if (currentScroll > 50) {
      nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  };
  
  // Throttle scroll event
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
};

// ===== FORM HANDLING =====
const initForm = () => {
  const form = document.getElementById('joinForm');
  const formMsg = document.getElementById('formMsg');
  
  if (!form || !formMsg) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    formMsg.textContent = `Thanks! We'll reach out to ${email} soon.`;
    formMsg.style.background = 'rgba(58, 176, 255, 0.15)';
    formMsg.style.borderColor = 'rgba(58, 176, 255, 0.4)';
    formMsg.style.color = '#3ab0ff';
    
    // Reset form
    form.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formMsg.textContent = '';
    }, 5000);
    
    // In production, replace the above with actual form submission:
    /*
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message })
      });
      
      if (response.ok) {
        formMsg.textContent = `Thanks! We'll reach out to ${email} soon.`;
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      formMsg.textContent = 'Something went wrong. Please try again.';
      formMsg.style.background = 'rgba(255, 77, 77, 0.15)';
      formMsg.style.borderColor = 'rgba(255, 77, 77, 0.4)';
      formMsg.style.color = '#ff4d4d';
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
    */
  });
  
  // Input validation with smooth feedback
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.validity.valid) {
        input.style.borderColor = 'rgba(58, 176, 255, 0.5)';
      } else if (input.value) {
        input.style.borderColor = 'rgba(255, 77, 77, 0.5)';
      } else {
        input.style.borderColor = '';
      }
    });
    
    input.addEventListener('focus', () => {
      input.style.borderColor = '';
    });
  });
};

// ===== FAQ SMOOTH TOGGLE =====
const initFAQ = () => {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    summary?.addEventListener('click', (e) => {
      // Close other open items for accordion effect (optional)
      // Comment this out if you want multiple items open at once
      const wasOpen = item.hasAttribute('open');
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.removeAttribute('open');
        }
      });
    });
  });
};

// ===== FOOTER YEAR =====
const updateFooterYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

// ===== PERFORMANCE: LAZY LOAD IMAGES =====
const initLazyLoading = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return;
  }
  
  // Fallback for browsers that don't support native lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach((img) => imageObserver.observe(img));
};

// ===== CURSOR GLOW EFFECT (Optional enhancement) =====
const initCursorGlow = () => {
  // Only on larger screens
  if (window.innerWidth < 768) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let isMoving = false;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMoving) {
      isMoving = true;
      updateGlow();
    }
  });
  
  const updateGlow = () => {
    document.body.style.background = `
      radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(255, 138, 76, 0.08), transparent 80%),
      radial-gradient(1400px 700px at 70% -5%, #281d17 0%, #141110 50%, #0f0d0c 100%)
    `;
    
    isMoving = false;
  };
};

// ===== INITIALIZE ALL =====
const init = () => {
  // Initialize all features when DOM is ready
  initNavigation();
  initSmoothScroll();
  initScrollReveal();
  initNavScroll();
  initForm();
  initFAQ();
  initCopyToClipboard();
  updateFooterYear();
  initLazyLoading();

  // Optional: cursor glow effect (comment out if too much)
  // initCursorGlow();

  // Add loaded class to body for any CSS transitions
  document.body.classList.add('loaded');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ===== EXPORT FOR POTENTIAL MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initNavigation,
    initSmoothScroll,
    initScrollReveal,
    initForm,
    initCopyToClipboard
  };
}