// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
 hamburger.classList.toggle('active');
 navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
 link.addEventListener('click', () => {
 hamburger.classList.remove('active');
 navMenu.classList.remove('active');
 });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function (e) {
 const target = document.querySelector(this.getAttribute('href'));
 if (target) {
 e.preventDefault();
 target.scrollIntoView({
 behavior: 'smooth',
 block: 'start'
 });
 }
 });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
 const navbar = document.querySelector('.navbar');
 if (window.scrollY > 100) {
 navbar.style.background = 'rgba(255, 255, 255, 0.98)';
 navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
 } else {
 navbar.style.background = 'rgba(255, 255, 255, 0.95)';
 navbar.style.boxShadow = 'none';
 }
});

// App Download Function
function downloadApp(platform) {
 const appUrls = {
 android: 'https://play.google.com/store/apps/details?id=com.bitminepro.app',
 ios: 'https://apps.apple.com/app/bitmine-pro/id1234567890'
 };

 const platformNames = {
 android: 'Google Play Store',
 ios: 'Apple App Store'
 };

 // Show loading notification
 showNotification(`Redirecting to ${platformNames[platform]}...`, 'info');

 // Simulate download process
 setTimeout(() => {
 // In a real implementation, you would redirect to the actual app store
 // window.open(appUrls[platform], '_blank');

 // For demo purposes, show success message
 showNotification(`BitMine Pro app download started! Please check your ${platformNames[platform]}.`, 'success');

 // Add download animation to the button
 const downloadBtn = document.querySelector(`.download-btn.${platform}`);
 if (downloadBtn) {
 downloadBtn.style.transform = 'scale(0.95)';
 setTimeout(() => {
 downloadBtn.style.transform = 'scale(1)';
 }, 200);
 }
 }, 1500);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
 contactForm.addEventListener('submit', function (e) {
 e.preventDefault();

 // Get form data
 const formData = new FormData(this);
 const name = this.querySelector('input[type="text"]').value;
 const email = this.querySelector('input[type="email"]').value;
 const phone = this.querySelector('input[type="tel"]').value;
 const message = this.querySelector('textarea').value;

 // Basic validation
 if (!name || !email || !message) {
 showNotification('Please fill in all required fields', 'error');
 return;
 }

 if (!isValidEmail(email)) {
 showNotification('Please enter a valid email address', 'error');
 return;
 }

 // Simulate form submission
 showNotification('Sending your message...', 'info');

 setTimeout(() => {
 showNotification('Your message has been sent successfully! We will contact you soon.', 'success');
 this.reset();
 }, 2000);
 });
}

// Email validation function
function isValidEmail(email) {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
 // Remove existing notifications
 const existingNotification = document.querySelector('.notification');
 if (existingNotification) {
 existingNotification.remove();
 }

 // Create notification element
 const notification = document.createElement('div');
 notification.className = `notification notification-${type}`;
 notification.innerHTML = `
 <div class="notification-content">
 <span class="notification-message">${message}</span>
 <button class="notification-close">&times;</button>
 </div>
 `;

 // Add styles
 notification.style.cssText = `
 position: fixed;
 top: 100px;
 right: 20px;
 background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
 color: white;
 padding: 1rem 1.5rem;
 border-radius: 10px;
 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
 z-index: 10000;
 max-width: 400px;
 animation: slideIn 0.3s ease;
 `;

 // Add to page
 document.body.appendChild(notification);

 // Close button functionality
 const closeBtn = notification.querySelector('.notification-close');
 closeBtn.addEventListener('click', () => {
 notification.remove();
 });

 // Auto remove after 5 seconds
 setTimeout(() => {
 if (notification.parentNode) {
 notification.style.animation = 'slideOut 0.3s ease';
 setTimeout(() => {
 if (notification.parentNode) {
 notification.remove();
 }
 }, 300);
 }
 }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
 @keyframes slideIn {
 from {
 transform: translateX(100%);
 opacity: 0;
 }
 to {
 transform: translateX(0);
 opacity: 1;
 }
 }
 
 @keyframes slideOut {
 from {
 transform: translateX(0);
 opacity: 1;
 }
 to {
 transform: translateX(100%);
 opacity: 0;
 }
 }
 
 .notification-close {
 background: none;
 border: none;
 color: white;
 font-size: 1.5rem;
 cursor: pointer;
 margin-left: 1rem;
 padding: 0;
 line-height: 1;
 }
 
 .notification-content {
 display: flex;
 align-items: center;
 justify-content: space-between;
 }
`;
document.head.appendChild(style);

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
 card.addEventListener('mouseenter', function () {
 if (!this.classList.contains('featured')) {
 this.style.transform = 'translateY(-10px)';
 }
 });

 card.addEventListener('mouseleave', function () {
 if (!this.classList.contains('featured')) {
 this.style.transform = 'translateY(0)';
 }
 });
});

// Animate stats on scroll
function animateStats() {
 const stats = document.querySelectorAll('.stat h3, .about-stat h4, .app-stat h4');

 const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 const target = entry.target;
 const finalValue = parseInt(target.textContent.replace(/[^\d]/g, ''));
 const duration = 2000;
 const increment = finalValue / (duration / 16);
 let currentValue = 0;

 const timer = setInterval(() => {
 currentValue += increment;
 if (currentValue >= finalValue) {
 currentValue = finalValue;
 clearInterval(timer);
 }

 if (target.classList.contains('stat')) {
 target.textContent = Math.floor(currentValue).toLocaleString() + '+';
 } else if (target.classList.contains('app-stat')) {
 // Handle app stats differently (like 4.8★)
 const originalText = target.textContent;
 if (originalText.includes('★')) {
 target.textContent = Math.floor(currentValue * 10) / 10 + '★';
 } else {
 target.textContent = Math.floor(currentValue) + '+';
 }
 } else {
 target.textContent = Math.floor(currentValue) + '+';
 }
 }, 16);

 observer.unobserve(target);
 }
 });
 }, { threshold: 0.5 });

 stats.forEach(stat => observer.observe(stat));
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
 animateStats();
});

// Add loading animation for buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
 button.addEventListener('click', function (e) {
 if (this.textContent.includes('Started')) {
 // Scroll to APK download section and show suggestion
 e.preventDefault();
 const apkSection = document.getElementById('apk-download');
 if (apkSection) {
 apkSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
 showNotification('To start computing, please download our free APK from below!', 'info');
 }
 return;
 }
 if (this.textContent.includes('Choose')) {
 // Add loading state
 const originalText = this.textContent;
 this.textContent = 'Loading...';
 this.disabled = true;
 setTimeout(() => {
 this.textContent = originalText;
 this.disabled = false;
 showNotification('Your request has been received! We will contact you soon.', 'success');
 }, 2000);
 }
 });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
 const scrolled = window.pageYOffset;
 const hero = document.querySelector('.hero');
 if (hero) {
 const rate = scrolled * -0.5;
 hero.style.transform = `translateY(${rate}px)`;
 }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
 let i = 0;
 element.textContent = '';

 function type() {
 if (i < text.length) {
 element.textContent += text.charAt(i);
 i++;
 setTimeout(type, speed);
 }
 }

 type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
 const heroTitle = document.querySelector('.hero-content h1');
 if (heroTitle) {
 const originalText = heroTitle.textContent;
 typeWriter(heroTitle, originalText, 50);
 }
});

// Add scroll progress indicator
function createScrollProgress() {
 const progressBar = document.createElement('div');
 progressBar.className = 'scroll-progress';
 progressBar.style.cssText = `
 position: fixed;
 top: 0;
 left: 0;
 width: 0%;
 height: 3px;
 background: linear-gradient(90deg, #f7931a, #ff6b35);
 z-index: 10001;
 transition: width 0.1s ease;
 `;
 document.body.appendChild(progressBar);

 window.addEventListener('scroll', () => {
 const scrollTop = window.pageYOffset;
 const docHeight = document.body.offsetHeight - window.innerHeight;
 const scrollPercent = (scrollTop / docHeight) * 100;
 progressBar.style.width = scrollPercent + '%';
 });
}

// Initialize scroll progress
createScrollProgress();

// Screenshot slider logic
let currentScreenshot = 0;
const screenshots = document.querySelectorAll('.screenshot-slider .screenshot');

function showScreenshot(index) {
 if (!screenshots.length) return;
 screenshots.forEach((img, i) => {
 img.classList.remove('active');
 if (i === index) img.classList.add('active');
 });
}

function changeScreenshot(direction) {
 if (!screenshots.length) return;
 currentScreenshot += direction;
 if (currentScreenshot < 0) currentScreenshot = screenshots.length - 1;
 if (currentScreenshot >= screenshots.length) currentScreenshot = 0;
 showScreenshot(currentScreenshot);
}

document.addEventListener('DOMContentLoaded', () => {
 showScreenshot(currentScreenshot);
});

// Nav-logo पर क्लिक करने पर mobile menu बंद करें
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
 navLogo.addEventListener('click', () => {
 hamburger.classList.remove('active');
 navMenu.classList.remove('active');
 });
}

// API Purchase form handling for api.html
const apiForm = document.querySelector('.api-purchase-form');
if (apiForm) {
 apiForm.addEventListener('submit', function (e) {
 e.preventDefault();
 const email = this.querySelector('input[type="email"]').value;
 const plan = this.querySelector('select').value;
 if (!email || !plan) {
 alert('Please fill in all required fields');
 return;
 }
 if (plan === 'basic') {
 // Scroll to app download bar
 const appBar = document.querySelector('.app-download-bar');
 if (appBar) {
 appBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
 }
 alert('Free API plan selected! Please download our app to start computing.');
 } else {
 alert('Thank you for your interest! Our team will contact you soon for API purchase.');
 this.reset();
 }
 });
} 