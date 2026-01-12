// ===================================
// Summit Legal Partners - JavaScript
// ===================================

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ===== SMOOTH SCROLL WITH OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== MULTI-STEP FORM =====
let currentStep = 1;
const totalSteps = 3;
let formData = {};

// Service routing configuration
const serviceRouting = {
    'business': {
        email: 'business@summitlegalpartners.com',
        team: 'Business Law Team',
        priority: 'high'
    },
    'real-estate': {
        email: 'realestate@summitlegalpartners.com',
        team: 'Real Estate Team',
        priority: 'high'
    },
    'family': {
        email: 'family@summitlegalpartners.com',
        team: 'Family Law Team',
        priority: 'high'
    },
    'employment': {
        email: 'employment@summitlegalpartners.com',
        team: 'Employment Law Team',
        priority: 'medium'
    },
    'estate': {
        email: 'estate@summitlegalpartners.com',
        team: 'Estate Planning Team',
        priority: 'medium'
    },
    'litigation': {
        email: 'litigation@summitlegalpartners.com',
        team: 'Litigation Team',
        priority: 'high'
    }
};

function updateProgressBar() {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

function showStep(stepNumber) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    const targetStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    currentStep = stepNumber;
    updateProgressBar();
}

function validateStep(stepNumber) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (!currentStepElement) return false;
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            const radioGroup = currentStepElement.querySelectorAll(`[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
            }
        } else if (field.type === 'checkbox') {
            if (!field.checked) {
                isValid = false;
                field.parentElement.style.color = '#e53e3e';
            } else {
                field.parentElement.style.color = '';
            }
        } else {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e53e3e';
            } else {
                field.style.borderColor = '';
            }
        }
    });
    
    if (!isValid) {
        // Show validation message
        let errorMsg = currentStepElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#e53e3e';
            errorMsg.style.marginTop = '10px';
            errorMsg.style.fontSize = '14px';
            errorMsg.textContent = 'Please fill in all required fields.';
            currentStepElement.querySelector('.form-navigation').before(errorMsg);
        }
        
        setTimeout(() => {
            if (errorMsg && errorMsg.parentElement) {
                errorMsg.remove();
            }
        }, 3000);
    }
    
    return isValid;
}

function nextStep() {
    if (validateStep(currentStep)) {
        // Save current step data
        saveStepData(currentStep);
        
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function saveStepData(stepNumber) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (!currentStepElement) return;
    
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else {
            formData[input.name] = input.value;
        }
    });
}

function resetForm() {
    const form = document.getElementById('multiStepForm');
    form.reset();
    formData = {};
    currentStep = 1;
    showStep(1);
    document.getElementById('formSuccess').style.display = 'none';
    document.querySelector('.form-progress').style.display = 'flex';
    document.querySelectorAll('.form-step').forEach(step => {
        step.style.display = 'none';
    });
    document.querySelector('.form-step[data-step="1"]').style.display = 'block';
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
}

// ===== FORM SUBMISSION =====
const multiStepForm = document.getElementById('multiStepForm');

if (multiStepForm) {
    multiStepForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Save final step data
            saveStepData(currentStep);
            
            // Get routing information based on selected service
            const selectedService = formData.service;
            const routing = serviceRouting[selectedService] || serviceRouting['business'];
            
            // Prepare submission data
            const submissionData = {
                ...formData,
                routing: routing,
                submittedAt: new Date().toISOString(),
                routedTo: routing.email,
                assignedTeam: routing.team,
                priority: routing.priority
            };
            
            // Log submission data (in production, this would be sent to a server)
            console.log('Form Submission Data:', submissionData);
            console.log('Routed to:', routing.team, `(${routing.email})`);
            console.log('Priority:', routing.priority);
            
            // Simulate API call
            setTimeout(() => {
                // Hide form steps
                document.querySelectorAll('.form-step').forEach(step => {
                    step.style.display = 'none';
                });
                
                // Hide progress bar
                document.querySelector('.form-progress').style.display = 'none';
                
                // Show success message
                document.getElementById('formSuccess').style.display = 'block';
                
                // Send notification (simulated)
                simulateNotification(submissionData);
            }, 500);
        }
    });
}

function simulateNotification(data) {
    // In production, this would send an email or webhook notification
    console.log(`
    ========================================
    NEW CONSULTATION REQUEST
    ========================================
    
    Service Type: ${formatServiceName(data.service)}
    Routed To: ${data.assignedTeam}
    Email: ${data.routedTo}
    Priority: ${data.priority.toUpperCase()}
    
    Client Information:
    - Name: ${data.fullName}
    - Email: ${data.email}
    - Phone: ${data.phone}
    - Preferred Contact: ${data.preferredContact}
    
    Request Details:
    - Urgency: ${data.urgency}
    - Description: ${data.description}
    
    Submitted: ${new Date(data.submittedAt).toLocaleString()}
    ========================================
    `);
}

function formatServiceName(serviceKey) {
    const serviceNames = {
        'business': 'Business Law',
        'real-estate': 'Real Estate Law',
        'family': 'Family Law',
        'employment': 'Employment Law',
        'estate': 'Estate Planning',
        'litigation': 'Civil Litigation'
    };
    return serviceNames[serviceKey] || serviceKey;
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, team members, and resource cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .team-member, .resource-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== RESOURCE CARDS FILTERING (Optional Enhancement) =====
// This can be expanded to add filtering functionality to the resources section

// ===== FORM FIELD VALIDATION HELPERS =====
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#e53e3e';
            showFieldError(this, 'Please enter a valid email address');
        } else {
            this.style.borderColor = '';
            hideFieldError(this);
        }
    });
}

if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        // Auto-format phone number
        let value = this.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        
        if (value.length >= 6) {
            this.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            this.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            this.value = value;
        }
    });
}

function showFieldError(field, message) {
    hideFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation for service options
document.querySelectorAll('.service-option').forEach(option => {
    option.setAttribute('tabindex', '0');
    option.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.querySelector('input[type="radio"]').checked = true;
        }
    });
});

// ===== LOADING STATE MANAGEMENT =====
function showLoadingState(button) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = 'Processing...';
    button.style.opacity = '0.7';
}

function hideLoadingState(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText;
    button.style.opacity = '1';
}

// Make functions globally accessible for inline onclick handlers
window.nextStep = nextStep;
window.prevStep = prevStep;
window.resetForm = resetForm;

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c Summit Legal Partners', 'font-size: 24px; font-weight: bold; color: #1e3a5f;');
console.log('%c Website developed with modern web technologies', 'font-size: 12px; color: #4a5568;');
console.log('%c Features: Multi-step forms, Service-specific routing, Responsive design', 'font-size: 11px; color: #718096;');
