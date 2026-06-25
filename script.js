// ===== Slide Management =====
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimation();
});

// ===== Scroll Animation =====
// Trigger animations when slides come into view
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Trigger progress bar animation for skills slide
                if (entry.target.classList.contains('slide-5')) {
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        bar.style.animation = 'none';
                        setTimeout(() => {
                            bar.style.animation = '';
                        }, 10);
                    });
                }
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        slideObserver.observe(slide);
    });
}

// Stub functions for HTML onclick handlers
function nextSlide() {}
function previousSlide() {}
function goToSlide(n) {
    slides[n].scrollIntoView({ behavior: 'smooth' });
}

// ===== Parallax Effect for Background =====
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 5;
        orb.style.transform = `translate(${x / speed}px, ${y / speed}px)`;
    });
});

// ===== Certificate Modal Functions =====
function openCertificateModal(certPath) {
    const modal = document.getElementById('certificateModal');
    const certImage = document.getElementById('certificateImage');
    
    // Handle both full paths and IDs
    let imagePath = certPath;
    if (!certPath.includes('images/')) {
        imagePath = `images/${certPath}`;
    }
    if (!imagePath.includes('.')) {
        imagePath += '.png';
    }
    
    // Set the image source
    certImage.src = imagePath;
    
    // Show modal
    modal.classList.add('active');
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the content
document.addEventListener('click', (e) => {
    const modal = document.getElementById('certificateModal');
    if (e.target === modal) {
        closeCertificateModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});
