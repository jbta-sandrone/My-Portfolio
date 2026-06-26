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

// ===== AI Chatbot =====
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

const qaData = [
    {
        keywords: ['who', 'jonel', 'about', 'tell me'],
        answer: "Jonel Bryan Ablog is a BS Information Technology graduate from the University of Northern Philippines (Cum Laude). He's an aspiring software developer and programmer passionate about building meaningful digital experiences."
    },
    {
        keywords: ['project', 'build', 'made', 'create'],
        answer: "Jonel has built several academic projects:\n\u2022 CLIQ: B-Hive Cafe Mobile Ordering App (Web-based kiosk)\n\u2022 E-TAPON: Sensor-Based Smart Bin System (IoT)\n\u2022 Taste of Ilocos Food Products (Website)\n\u2022 High-Fidelity Prototype & Wireframing (UI/UX Design)"
    },
    {
        keywords: ['language', 'programming', 'technologies', 'tech', 'stack', 'tools'],
        answer: "Jonel's tech stack includes: HTML5, CSS3, JavaScript, React, Vite, Java, Visual Basic, SQL, Firebase, MySQL, and tools like VS Code, GitHub, Figma, Canva, Adobe Photoshop, Arduino IDE, and Microsoft Office."
    },
    {
        keywords: ['skill', 'good at', 'expert', 'proficient'],
        answer: "Jonel's skills include:\n\u2022 Soft Skills: Communication, Adaptability, Problem-Solving, Time Management, Teamwork, Attention to Detail\n\u2022 Administrative: Data Entry, Document Management, Email Management, Research, Google Workspace\n\u2022 Languages: English (Conversational), Tagalog (Advanced), Ilocano (Advanced)"
    },
    {
        keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'facebook', 'social'],
        answer: "You can reach Jonel via:\n\u2022 Email: ablogjonelbryan@gmail.com\n\u2022 LinkedIn: linkedin.com/in/jonel-bryan-ablog-76bb1840b\n\u2022 Facebook: facebook.com/ablogjonel.21\n\u2022 GitHub: github.com/jbta-sandrone"
    },
    {
        keywords: ['certificate', 'cert', 'seminar', 'award'],
        answer: "Jonel's certificates include:\n\u2022 GAWAD CCIT 2026\n\u2022 Introduction to PowerBuilder & PowerBI (PSITE, 2025)\n\u2022 Leverage AI to Your Marketing Skills (EMPOWORK.PH, 2025)\n\u2022 Leveraging Generative AI for English Teachers (British Council, 2025)"
    },
    {
        keywords: ['education', 'study', 'college', 'university', 'graduate', 'degree'],
        answer: "Jonel studied at the University of Northern Philippines, earning a Bachelor of Science in Information Technology from July 2022 to May 2026, graduating Cum Laude. Coursework included Software Engineering, Database Management, HCI, Web Systems, Data Structures, and IoT."
    },
    {
        keywords: ['aspiration', 'goal', 'dream', 'future', 'want'],
        answer: "Jonel aspires to grow in: Web Development, Game Development, Data Analysis, Software Testing, Python Programming, and Full-Stack Development. He's passionate about continuous learning and creating solutions that help people."
    },
    {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
        answer: "Hello! \uD83D\uDC4B I'm Jonel's AI assistant. Feel free to ask me anything about him \u2014 his projects, skills, background, or how to get in touch!"
    },
    {
        keywords: ['help', 'can you', 'what can'],
        answer: "I can answer questions about Jonel! Try asking:\n\u2022 Who is Jonel?\n\u2022 What projects has he built?\n\u2022 What are his skills?\n\u2022 How can I contact him?\n\u2022 What technologies does he use?"
    }
];

const fallback = "I'm not sure about that! Try asking about Jonel's projects, skills, education, technologies, or how to contact him. \uD83D\uDE0A";

function findAnswer(question) {
    const q = question.toLowerCase();
    for (const item of qaData) {
        for (const kw of item.keywords) {
            if (q.includes(kw)) {
                return item.answer;
            }
        }
    }
    return fallback;
}

function addMessage(text, from) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${from}`;
    if (from === 'bot') {
        const avatar = document.createElement('span');
        avatar.className = 'msg-avatar';
        avatar.textContent = '\uD83E\uDD16';
        msgDiv.appendChild(avatar);
    }
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatbotBody.appendChild(msgDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot typing-msg';
    div.innerHTML = '<span class="msg-avatar">\uD83E\uDD16</span><div class="msg-bubble typing-indicator"><span></span><span></span><span></span></div>';
    chatbotBody.appendChild(div);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function hideTyping() {
    const typing = chatbotBody.querySelector('.typing-msg');
    if (typing) typing.remove();
}

function handleChatSend() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatbotInput.value = '';
    showTyping();

    setTimeout(() => {
        hideTyping();
        const answer = findAnswer(text);
        addMessage(answer, 'bot');
    }, 800 + Math.random() * 600);
}

chatbotToggle.addEventListener('click', () => {
    const isOpen = chatbotPanel.classList.toggle('open');
    chatbotToggle.classList.toggle('open');
    if (isOpen) {
        chatbotInput.focus();
    }
});

chatbotSend.addEventListener('click', handleChatSend);

chatbotInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleChatSend();
});
