// Peak Performance Fitness - Dynamic Functionality

// Sample class schedule data
const classSchedule = [
    { day: 'monday', time: '6:00 AM', name: 'Morning HIIT', trainer: 'Sarah Chen', spots: 3, total: 15, intensity: 'high' },
    { day: 'monday', time: '9:00 AM', name: 'Strength Training', trainer: 'Marcus Johnson', spots: 8, total: 12, intensity: 'medium' },
    { day: 'monday', time: '5:30 PM', name: 'Yoga Flow', trainer: 'Emma Thompson', spots: 12, total: 20, intensity: 'low' },
    { day: 'tuesday', time: '6:00 AM', name: 'Bootcamp', trainer: 'David Rodriguez', spots: 5, total: 15, intensity: 'high' },
    { day: 'tuesday', time: '7:00 PM', name: 'Olympic Lifting', trainer: 'Marcus Johnson', spots: 2, total: 10, intensity: 'high' },
    { day: 'wednesday', time: '6:00 AM', name: 'Cardio Blast', trainer: 'Sarah Chen', spots: 7, total: 15, intensity: 'high' },
    { day: 'wednesday', time: '12:00 PM', name: 'Functional Fitness', trainer: 'David Rodriguez', spots: 10, total: 12, intensity: 'medium' },
    { day: 'wednesday', time: '6:30 PM', name: 'Power Yoga', trainer: 'Emma Thompson', spots: 6, total: 20, intensity: 'medium' },
    { day: 'thursday', time: '6:00 AM', name: 'HIIT Intervals', trainer: 'Sarah Chen', spots: 4, total: 15, intensity: 'high' },
    { day: 'thursday', time: '9:00 AM', name: 'Strength & Conditioning', trainer: 'Marcus Johnson', spots: 9, total: 12, intensity: 'medium' },
    { day: 'friday', time: '6:00 AM', name: 'Friday Grind', trainer: 'David Rodriguez', spots: 6, total: 15, intensity: 'high' },
    { day: 'friday', time: '5:30 PM', name: 'Weekend Warrior', trainer: 'Marcus Johnson', spots: 1, total: 12, intensity: 'high' },
    { day: 'saturday', time: '9:00 AM', name: 'Saturday Sweat', trainer: 'Sarah Chen', spots: 11, total: 20, intensity: 'medium' },
    { day: 'saturday', time: '10:30 AM', name: 'Mindful Movement', trainer: 'Emma Thompson', spots: 15, total: 20, intensity: 'low' }
];

// Initialize schedule on page load
document.addEventListener('DOMContentLoaded', function() {
    renderSchedule('all');
    setupFilters();
    setupMobileMenu();
    setupSmoothScroll();
    setupFormSubmission();
});

// Render class schedule
function renderSchedule(filterDay) {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return;
    
    const filtered = filterDay === 'all' 
        ? classSchedule 
        : classSchedule.filter(c => c.day === filterDay);
    
    grid.innerHTML = filtered.map(classItem => `
        <div class="class-card" data-day="${classItem.day}">
            <div class="class-header">
                <span class="class-time">${classItem.time}</span>
                <span class="intensity-badge intensity-${classItem.intensity}">${classItem.intensity}</span>
            </div>
            <h3 class="class-name">${classItem.name}</h3>
            <p class="class-trainer">with ${classItem.trainer}</p>
            <div class="class-availability">
                <div class="availability-bar">
                    <div class="availability-fill" style="width: ${(classItem.spots / classItem.total) * 100}%"></div>
                </div>
                <span class="spots-remaining">${classItem.spots} spots left</span>
            </div>
            <button class="book-btn ${classItem.spots < 3 ? 'limited' : ''}">
                ${classItem.spots < 3 ? 'Almost Full!' : 'Book Now'}
            </button>
        </div>
    `).join('');
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderSchedule(this.dataset.day);
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Smooth scrolling for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form submission handler
function setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest! We\'ll contact you within 24 hours to schedule your free consultation.');
            form.reset();
        });
    }
}

// Scroll indicator animation
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});
