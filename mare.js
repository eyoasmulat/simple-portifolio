// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Fade-in animation on scroll
const fadeInElements = document.querySelectorAll('section');

const observerOptions = {
    threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.classList.add('fade-out');
    observer.observe(element);
});

// Card hover animation
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
    });
});

// Sticky navbar animation
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.style.top = '-70px'; // Hide navbar when scrolling down
    } else {
        navbar.style.top = '0'; // Show navbar when scrolling up
    }
    lastScrollTop = scrollTop;
});

// Horizontal scroll for testimonials section
const testimonialsContainer = document.querySelector('.testimonials .row');
let isDown = false;
let startX;
let scrollLeft;

testimonialsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialsContainer.classList.add('active');
    startX = e.pageX - testimonialsContainer.offsetLeft;
    scrollLeft = testimonialsContainer.scrollLeft;
});

testimonialsContainer.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialsContainer.classList.remove('active');
});

testimonialsContainer.addEventListener('mouseup', () => {
    isDown = false;
    testimonialsContainer.classList.remove('active');
});

testimonialsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialsContainer.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    testimonialsContainer.scrollLeft = scrollLeft - walk;
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.innerHTML = `
  .fade-out {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .testimonials .row {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
  }

  .testimonials .row::-webkit-scrollbar {
    display: none;
  }

  .testimonials .row.active {
    cursor: grabbing;
  }
`;
document.head.appendChild(style);
