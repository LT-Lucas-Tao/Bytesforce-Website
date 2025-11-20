// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Home link functionality
document.getElementById('home-link').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showSlide(0);
    resetInterval();
});

// Background and text rotation
const backgrounds = document.querySelectorAll('.hero-bg');
const contents = document.querySelectorAll('.hero-content');
const images = document.querySelectorAll('.hero-image');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let interval;

function showSlide(index) {
    // Remove active class from all elements
    backgrounds.forEach(bg => bg.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    images.forEach(image => image.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current elements
    backgrounds[index].classList.add('active');
    
    // Add staggered animation for text elements
    setTimeout(() => {
        contents[index].classList.add('active');
    }, 300);
    
    setTimeout(() => {
        images[index].classList.add('active');
    }, 500);
    
    dots[index].classList.add('active');
    
    currentIndex = index;
}

function nextSlide() {
    let nextIndex = (currentIndex + 1) % backgrounds.length;
    showSlide(nextIndex);
}

// Add click event to dots
dots.forEach(dot => {
    dot.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default behavior
        let index = parseInt(this.getAttribute('data-index'));
        showSlide(index);
        resetInterval();
        
        // Remove focus to prevent cursor flashing
        this.blur();
    });
});

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 6000);
}

// Start the rotation
interval = setInterval(nextSlide, 6000);

// Pause rotation on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', function() {
    clearInterval(interval);
});

heroSection.addEventListener('mouseleave', function() {
    resetInterval();
});