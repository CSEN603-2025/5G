

            document.addEventListener('DOMContentLoaded', function () {
    // 🕒 TIME DISPLAY
    function updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('currentTime');
        timeElement.textContent = now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();
// Add these variables at the top with other variable declarations
let currentWorkshopId = null;
let workshopRating = 0;
    // 🎖️ PRO BADGE LOGIC
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const checkEligibilityBtn = document.getElementById('checkEligibilityBtn');
    const successMessage = document.getElementById('successMessage');
    const badgeContainer = document.getElementById('badgeContainer');

    const monthsCompleted = 3;
    const progressPercentage = Math.min(100, (monthsCompleted / 3) * 100);
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${monthsCompleted} of 3 months completed`;

    checkEligibilityBtn.addEventListener('click', function () {
        if (monthsCompleted >= 3) {
            successMessage.style.display = 'block';
            badgeContainer.innerHTML = `
                <div class="pro-badge"><i class="fas fa-award"></i></div>
                <div class="badge-description">
                    <p>This PRO badge recognizes your successful completion of 3 months of internship at GUC.</p>
                    <p>It will appear on your profile and can be shared with potential employers.</p>
                </div>`;
            checkEligibilityBtn.disabled = true;
            checkEligibilityBtn.innerHTML = '<i class="fas fa-check-circle"></i> PRO Badge Awarded';
            checkEligibilityBtn.style.background = 'linear-gradient(90deg, #2ecc71 0%, #27ae60 100%)';
        }
    });

    if (monthsCompleted >= 3) checkEligibilityBtn.click();

    // 👁️ PROFILE VIEWS
    const profileViewsSection = document.getElementById('profileViewsSection');
    const toggleViewsBtn = document.getElementById('toggleViewsBtn');
    const profileViewsBtn = document.createElement('button');
    profileViewsBtn.className = 'btn-primary';
    profileViewsBtn.innerHTML = '<i class="fas fa-building"></i> View Companies That Checked My Profile';
    document.querySelector('.card').appendChild(profileViewsBtn);

    profileViewsBtn.addEventListener('click', function () {
        profileViewsSection.style.display = 'block';
        profileViewsBtn.style.display = 'none';
        loadProfileViews();
    });

    toggleViewsBtn.addEventListener('click', function () {
        profileViewsSection.style.display = 'none';
        profileViewsBtn.style.display = 'block';
    });

    function loadProfileViews() {
        const companies = [
            { name: "Siemens Egypt", lastViewed: "2 hours ago", viewCount: 3, initials: "SE" },
            { name: "Vodafone Egypt", lastViewed: "1 day ago", viewCount: 5, initials: "VE" },
            { name: "IBM Egypt", lastViewed: "3 days ago", viewCount: 2, initials: "IE" }
        ];
        document.getElementById('totalViews').textContent = companies.reduce((sum, c) => sum + c.viewCount, 0);
        document.getElementById('thisWeekViews').textContent = Math.floor(Math.random() * 5) + 1;

        const companyViewsList = document.getElementById('companyViewsList');
        companyViewsList.innerHTML = '';
        companies.forEach(company => {
            companyViewsList.innerHTML += `
                <div class="company-view">
                    <div class="company-logo">${company.initials}</div>
                    <div class="company-info">
                        <div class="company-name">${company.name}</div>
                        <div class="view-details">Viewed your profile ${company.viewCount} time${company.viewCount > 1 ? 's' : ''}</div>
                        <div class="view-date">Last viewed ${company.lastViewed}</div>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>`;
        });
    }

    // 🧪 ASSESSMENTS
    const assessmentsSection = document.getElementById('assessmentsSection');
    const assessmentsList = document.getElementById('assessmentsList');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');
    const viewAssessmentsBtn = document.createElement('button');
    viewAssessmentsBtn.className = 'btn-primary';
    viewAssessmentsBtn.innerHTML = '<i class="fas fa-laptop-code"></i> View Available Online Assessments';
    document.querySelector('.card').appendChild(viewAssessmentsBtn);

    viewAssessmentsBtn.addEventListener('click', function () {
        profileViewsSection.style.display = 'none';
        document.querySelector('.card').style.display = 'none';
        profileViewsBtn.style.display = 'none';
        assessmentsSection.style.display = 'block';
        loadAssessments();
    });

    backToDashboardBtn.addEventListener('click', function () {
        assessmentsSection.style.display = 'none';
        document.querySelector('.card').style.display = 'block';
        profileViewsBtn.style.display = 'block';
    });

    const assessmentData = {
        1: {
            title: "Frontend Developer Skills Test",
            duration: 60,
            questions: [
                { id: 1, text: "Which HTML5 element is used for sidebar content?", options: ["<sidebar>", "<aside>", "<nav>", "<div class='sidebar'>"], correct: 1 },
                { id: 2, text: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], correct: 2 },
                { id: 3, text: "Which JavaScript framework is developed by Facebook?", options: ["Angular", "Vue", "React", "Svelte"], correct: 2 }
            ]
        },
        2: {
            title: "Problem Solving Assessment",
            duration: 45,
            questions: [
                { id: 1, text: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correct: 2 }
            ]
        }
    };

    function loadAssessments() {
        assessmentsList.innerHTML = '';
        Object.entries(assessmentData).forEach(([id, data]) => {
            assessmentsList.innerHTML += `
                <div class="assessment-card">
                    <div class="assessment-header">
                        <div class="assessment-title">${data.title}</div>
                        <div class="assessment-due">Due soon</div>
                    </div>
                    <div class="assessment-company">GUC</div>
                    <div class="assessment-description">${data.questions.length} Questions - ${data.duration} mins</div>
                    <div class="assessment-actions">
                        <button class="btn-start" data-id="${id}"><i class="fas fa-play"></i> Start Assessment</button>
                    </div>
                </div>`;
        });
    }

    const takeAssessmentSection = document.getElementById('takeAssessmentSection');
    const assessmentResultsSection = document.getElementById('assessmentResultsSection');
    const assessmentTimer = document.getElementById('assessmentTimer');
    const assessmentContent = document.getElementById('assessmentContent');
    const assessmentTitle = document.getElementById('assessmentTitle');
    const resultsContainer = document.getElementById('resultsContainer');
    const shareToProfileBtn = document.getElementById('shareToProfileBtn');
    const submitAssessmentBtn = document.getElementById('submitAssessmentBtn');
    const backToAssessmentsBtn = document.getElementById('backToAssessmentsBtn');
    const backAfterResultsBtn = document.getElementById('backAfterResultsBtn');
    const postedScoreEl = document.getElementById('postedScore');

    let currentAssessmentId = null;
    let timeLeft = 0;
    let timerInterval = null;

    assessmentsList.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        const id = btn.dataset.id;
        startAssessment(id);
    });

    function escapeHTML(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function startAssessment(id) {
        const assessment = assessmentData[id];
        currentAssessmentId = id;
        assessmentsSection.style.display = 'none';
        takeAssessmentSection.style.display = 'block';

        assessmentTitle.textContent = assessment.title;
        assessmentContent.innerHTML = '';

        assessment.questions.forEach((q, i) => {
            const qEl = document.createElement('div');
            qEl.className = 'question-card';
            qEl.innerHTML = `
                <div class="question-text">${i + 1}. ${q.text}</div>
                <div class="options-group">
                    ${q.options.map((opt, idx) => `
                        <div class="option" data-value="${idx}" data-name="q${q.id}">
                            <strong>${String.fromCharCode(65 + idx)}.</strong> ${escapeHTML(opt)}
                        </div>
                    `).join('')}
                </div>`;
            assessmentContent.appendChild(qEl);
        });

        document.querySelectorAll('.option').forEach(opt => {
            opt.addEventListener('click', function () {
                const name = this.dataset.name;
                document.querySelectorAll(`.option[data-name="${name}"]`).forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        timeLeft = assessment.duration * 60;
        updateTimerDisplay();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAssessment();
        }
    }

    function updateTimerDisplay() {
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;
        assessmentTimer.textContent = `Time remaining: ${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    submitAssessmentBtn.addEventListener('click', submitAssessment);

    function submitAssessment() {
        clearInterval(timerInterval);
        const assessment = assessmentData[currentAssessmentId];
        let correct = 0;

        assessment.questions.forEach(q => {
            const selectedOption = document.querySelector(`.option[data-name="q${q.id}"].selected`);
            if (selectedOption && parseInt(selectedOption.dataset.value) === q.correct) correct++;
        });

        const score = Math.round((correct / assessment.questions.length) * 100);
        takeAssessmentSection.style.display = 'none';
        assessmentResultsSection.style.display = 'block';

        resultsContainer.innerHTML = `
            <div class="progress-circle">
                <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="75" cy="75" r="65" stroke="#e0e0e0" stroke-width="10" fill="none"/>
                    <circle cx="75" cy="75" r="65" stroke="${getScoreColor(score)}" 
                        stroke-width="10" fill="none" 
                        stroke-dasharray="${2 * Math.PI * 65}" 
                        stroke-dashoffset="${2 * Math.PI * 65 * (1 - score / 100)}"
                        stroke-linecap="round" transform="rotate(-90 75 75)"/>
                </svg>
            </div>
            <div class="score-display">${score}%</div>
            <div class="score-message">You answered ${correct} out of ${assessment.questions.length} questions correctly!</div>`;
    }

    function getScoreColor(score) {
        if (score >= 70) return 'var(--primary-medium)';
        if (score >= 40) return '#f39c12';
        return '#e74c3c';
    }

    shareToProfileBtn.addEventListener('click', function () {
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-check"></i> Score Posted to Profile';
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.innerHTML = `<i class="fas fa-check-circle"></i><p>Your assessment score has been successfully posted to your profile!</p>`;
        document.querySelector('.share-options').appendChild(msg);
        msg.style.display = 'block';
        postedScoreEl.textContent = `Assessment Score Posted: ${document.querySelector('.score-display').textContent}`;
        postedScoreEl.style.display = 'block';
    });

    backToAssessmentsBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        takeAssessmentSection.style.display = 'none';
        assessmentsSection.style.display = 'block';
    });

    backAfterResultsBtn.addEventListener('click', () => {
        assessmentResultsSection.style.display = 'none';
        assessmentsSection.style.display = 'block';
    });

    // 💼 CAREER WORKSHOPS
    const careerWorkshopsSection = document.getElementById('careerWorkshopsSection');
    const backToDashboardFromWorkshopsBtn = document.getElementById('backToDashboardFromWorkshopsBtn');
    const workshopNotification = document.getElementById('workshopNotification');
    const workshopList = document.getElementById('workshopList');
    const viewWorkshopsBtn = document.createElement('button');
    viewWorkshopsBtn.className = 'btn-primary';
    viewWorkshopsBtn.innerHTML = '<i class="fas fa-briefcase"></i> Career Workshops';
    document.querySelector('.card').appendChild(viewWorkshopsBtn);

    // Workshop viewer elements
    const toggleLiveBtn = document.getElementById('toggleLiveBtn');
    const toggleRecordedBtn = document.getElementById('toggleRecordedBtn');
    const videoSource = document.getElementById('videoSource');
    const workshopVideo = document.getElementById('workshopVideo');
    const workshopViewerSection = document.getElementById('workshopViewerSection');
    const workshopNotes = document.getElementById('workshopNotes');
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const backToWorkshopsBtn = document.getElementById('backToWorkshopsBtn');
    const liveControls = document.getElementById('liveControls');
    const notificationCenter = document.getElementById('notificationCenter');
    const notificationMessage = document.getElementById('notificationMessage');

   // Workshop data
const workshops = [
    { 
        id: 1,
        title: "CV & Resume Building", 
        date: "May 20", 
        time: "2:00 PM", 
        description: "Learn to build an impressive CV that stands out.",
        type: "live",
        registered: false,
        videoUrl: "resumebuilding.mp4" // Changed to your local file
    },
    { 
        id: 2,
        title: "Interview Tips & Tricks", 
        date: "May 22", 
        time: "11:00 AM", 
        description: "Ace your interviews with confidence.",
        type: "recorded",
        registered: true,
        videoUrl: "interviewtips.mp4" // Changed to your local file
    },
    { 
        id: 3,
        title: "Networking Essentials", 
        date: "May 25", 
        time: "4:00 PM", 
        description: "Master the art of professional networking.",
        type: "live",
        registered: false,
        videoUrl: "Networking.mp4" // Changed to your local file
    }
];

    // Chat simulation
    const chatParticipants = ["Ahmed", "Mariam", "Omar", "Yara", "Salma",];
    let chatInterval;

    viewWorkshopsBtn.addEventListener('click', function () {
        document.querySelector('.card').style.display = 'none';
        profileViewsSection.style.display = 'none';
        assessmentsSection.style.display = 'none';
        careerWorkshopsSection.style.display = 'block';
        loadWorkshops();
    });

    backToDashboardFromWorkshopsBtn.addEventListener('click', function () {
        careerWorkshopsSection.style.display = 'none';
        document.querySelector('.card').style.display = 'block';
    });

    backToWorkshopsBtn.addEventListener('click', function() {
        workshopViewerSection.style.display = 'none';
        careerWorkshopsSection.style.display = 'block';
        stopChatSimulation();
    });

    function loadWorkshops() {
    workshopList.innerHTML = '';
    
    workshops.forEach(workshop => {
        const buttonText = workshop.registered ? 
            (workshop.type === "live" ? '<i class="fas fa-video"></i> Join' : '<i class="fas fa-play"></i> Watch') : 
            '<i class="fas fa-sign-in-alt"></i> Register';
        
        const workshopCard = document.createElement('div');
        workshopCard.className = 'assessment-card';
        workshopCard.innerHTML = `
            <div class="assessment-header">
                <div class="assessment-title">${workshop.title}</div>
                <div class="assessment-due">${workshop.date} at ${workshop.time}</div>
            </div>
            <div class="assessment-company">${workshop.type === "live" ? "Live Workshop" : "Recorded Workshop"}</div>
            <div class="assessment-description">${workshop.description}</div>
            <div class="assessment-actions">
                <button class="btn-start" data-id="${workshop.id}">
                    ${buttonText}
                </button>
            </div>
        `;
        if (workshop.rated) {
    const ratingIndicator = document.createElement('div');
    ratingIndicator.className = 'rating-indicator';
    ratingIndicator.innerHTML = '<i class="fas fa-star" style="color: #f39c12;"></i> Rated';
    workshopCard.querySelector('.assessment-actions').appendChild(ratingIndicator);
}
        workshopList.appendChild(workshopCard);
    });

    // Set up workshop join buttons
    document.querySelectorAll('#workshopList .btn-start').forEach(btn => {
        btn.addEventListener('click', function() {
            const workshopId = parseInt(this.dataset.id);
            const workshop = workshops.find(w => w.id === workshopId);
            
            if (workshop) {
                if (!workshop.registered) {
                    // Register the user
                    workshop.registered = true;
                    showNotification(`Successfully registered for ${workshop.title}`);
                    loadWorkshops(); // Refresh the list
                    
                    // If it's a live workshop, show upcoming notification
                    if (workshop.type === "live") {
                        workshopNotification.innerHTML = `
                            <i class="fas fa-bell"></i>
                            <h3>Upcoming Workshop</h3>
                            <p>You are registered for <strong>${workshop.title}</strong> on ${workshop.date} at ${workshop.time}.</p>
                        `;
                        workshopNotification.style.display = 'block';
                    }
                } else {
                    // Already registered - start the workshop
                    startWorkshop(workshop);
                }
            }
        });
    });

    // Show notification for upcoming registered workshops
    const upcomingWorkshop = workshops.find(w => w.registered && w.type === "live");
    if (upcomingWorkshop) {
        workshopNotification.innerHTML = `
            <i class="fas fa-bell"></i>
            <h3>Upcoming Workshop</h3>
            <p>You are registered for <strong>${upcomingWorkshop.title}</strong> on ${upcomingWorkshop.date} at ${upcomingWorkshop.time}.</p>
        `;
        workshopNotification.style.display = 'block';
    } else {
        workshopNotification.style.display = 'none';
    }
}

   function startWorkshop(workshop) {
    careerWorkshopsSection.style.display = 'none';
    workshopViewerSection.style.display = 'block';
      currentWorkshopId = workshop.id;
    // Set video source
    videoSource.src = workshop.videoUrl;
    workshopVideo.load();

       // Reset feedback UI
    document.getElementById('ratingContainer').style.display = 'none';
    document.getElementById('certificateSection').style.display = 'none';
    document.getElementById('certificateSuccess').style.display = 'none';
    document.getElementById('showRatingBtn').style.display = 'block';
    // Add this new event listener for the show rating button
document.getElementById('showRatingBtn').addEventListener('click', function() {
    document.getElementById('ratingContainer').style.display = 'block';
    this.style.display = 'none';
});

// Update the submit rating button handler:
document.getElementById('submitRatingBtn').addEventListener('click', function() {
    if (workshopRating === 0) {
        showNotification('Please select a rating before submitting');
        return;
    }

    const feedback = document.getElementById('feedbackText').value.trim();
    showNotification(`Thank you for your ${workshopRating}-star rating!`);
    
    document.getElementById('ratingContainer').style.display = 'none';
    document.getElementById('certificateSection').style.display = 'block';
    
    const workshop = workshops.find(w => w.id === currentWorkshopId);
    if (workshop) {
        workshop.rated = true;
        workshop.rating = workshopRating;
        workshop.feedback = feedback;
    }
});
    // Only show rating button if not already rated
    if (workshop.rated) {
        document.getElementById('showRatingBtn').style.display = 'none';
        if (!workshop.certificateReceived) {
            document.getElementById('certificateSection').style.display = 'block';
        }
    }
    
    // Set up UI based on workshop type
    if (workshop.type === "live") {
        // Set up live workshop UI
        liveControls.style.display = 'block';
        chatContainer.style.display = 'block';
        
        // Only allow volume and fullscreen controls
        workshopVideo.controls = true;
        workshopVideo.addEventListener('loadedmetadata', function() {
            // Remove all controls except volume and fullscreen
            const controls = workshopVideo.controls;
            if (controls) {
                workshopVideo.removeAttribute('controls');
                workshopVideo.setAttribute('controlsList', 'nodownload noplaybackrate nofullscreen');
                workshopVideo.controls = true;
            }
        });
        
        // Prevent pausing
        workshopVideo.addEventListener('pause', function(e) {
            if (!e.target.ended) {
                e.target.play();
            }
        });
        
        // Auto-play and prevent right-click menu
        workshopVideo.autoplay = true;
        workshopVideo.addEventListener('contextmenu', e => e.preventDefault());
        
        startChatSimulation();
        showNotification("You joined the live workshop!");
    } else {
        // For recorded workshops - full controls
        liveControls.style.display = 'none';
        chatContainer.style.display = 'none';
        workshopVideo.controls = true;
        showNotification("You're watching a recorded workshop");
    }
    
    // Load saved notes
    loadWorkshopNotes(workshop.id);
    // Add this inside the startWorkshop function, after loadWorkshopNotes(workshop.id);
currentWorkshopId = workshop.id;
document.getElementById('workshopFeedback').style.display = 'block';
}
    

    // Chat functionality
  function startChatSimulation() {
    stopChatSimulation();
    
    // Initial welcome message
    addChatMessage('Workshop Host', 'Welcome to the live workshop! Please feel free to ask questions in the chat.', false);
    
    // Simulate incoming messages
    chatInterval = setInterval(() => {
        const randomParticipant = chatParticipants[Math.floor(Math.random() * chatParticipants.length)];
        const messages = [
            "Hello everyone!",
            "This is very helpful!",
            "Does anyone have questions?",
            "I'm learning so much from this",
            "Can you repeat that last point?",
            "Thanks for the great presentation!"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        addChatMessage(randomParticipant, randomMessage, false);
        
        // Show notification
        showNotification(`${randomParticipant} sent a message`);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 8000); // Changed to 8 seconds to avoid spamming
}

    function stopChatSimulation() {
        if (chatInterval) {
            clearInterval(chatInterval);
        }
    }

    function addChatMessage(sender, message, isCurrentUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isCurrentUser ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div class="sender">${sender}</div>
            <div class="message-text">${message}</div>
        `;
        chatMessages.appendChild(messageDiv);
        
        // Show notification for new messages (if not from current user)
        if (!isCurrentUser) {
            showNotification(`New message from ${sender}`);
        }
    }

    // Send message button
    sendChatBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addChatMessage("You", message, true);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    // Allow sending with Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatBtn.click();
        }
    });

    // Notification system
    function showNotification(message) {
        notificationMessage.textContent = message;
        notificationCenter.style.display = 'flex';
        
        setTimeout(() => {
            notificationCenter.style.display = 'none';
        }, 5000);
    }

    // Initialize workshops
    loadWorkshops();

    

});
// LIVE WORKSHOP VIEWING SECTION
const video = document.getElementById('workshopVideo');
const videoSource = document.getElementById('videoSource');
const liveControls = document.getElementById('liveControls');
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatInput = document.getElementById('chatInput');
const notificationCenter = document.getElementById('notificationCenter');
const notificationMessage = document.getElementById('notificationMessage');

function startLiveWorkshop() {
    document.getElementById('careerWorkshopsSection').style.display = 'none';
    document.getElementById('workshopViewerSection').style.display = 'block';

    video.removeAttribute('controls');
    videoSource.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Replace with more professional link
    video.load();
    video.play();

    video.addEventListener('contextmenu', e => e.preventDefault());
    video.addEventListener('pause', () => video.play());

    liveControls.style.display = 'block';
    chatContainer.style.display = 'block';
    simulateIncomingMessages();
}

document.getElementById('backToWorkshopsBtn').addEventListener('click', function () {
    document.getElementById('workshopViewerSection').style.display = 'none';
    document.getElementById('careerWorkshopsSection').style.display = 'block';
    video.pause();
    video.currentTime = 0;
});

sendChatBtn.addEventListener('click', function () {
    const text = chatInput.value.trim();
    if (!text) return;
    addChatMessage('You', text, 'sent');
    chatInput.value = '';
});

function addChatMessage(sender, text, type = 'received') {
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;
    msg.innerHTML = `<div class="sender">${sender}</div>${text}`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (type === 'received') {
        showNotification(`${sender} sent you a message.`);
    }
}

function simulateIncomingMessages() {
    setTimeout(() => addChatMessage('HR - GUC', 'Welcome to the Resume Building Workshop!'), 3000);
    setTimeout(() => addChatMessage('Attendee A', 'Is this workshop recorded?'), 6000);
}

function showNotification(message) {
    notificationMessage.textContent = message;
    notificationCenter.style.display = 'flex';
    setTimeout(() => {
        notificationCenter.style.display = 'none';
    }, 4000);
}

// Add this code at the bottom of the file, before the closing }); of DOMContentLoaded
// Star rating functionality
document.querySelectorAll('.star-rating i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = parseInt(this.dataset.rating);
        workshopRating = rating;
        
        // Update star display
        document.querySelectorAll('.star-rating i').forEach((s, idx) => {
            if (idx < rating) {
                s.classList.add('active');
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('active');
                s.classList.add('far');
                s.classList.remove('fas');
            }
        });
    });

    star.addEventListener('mouseover', function() {
        const rating = parseInt(this.dataset.rating);
        document.querySelectorAll('.star-rating i').forEach((s, idx) => {
            if (idx < rating) {
                s.classList.add('hover');
            } else {
                s.classList.remove('hover');
            }
        });
    });

    star.addEventListener('mouseout', function() {
        document.querySelectorAll('.star-rating i').forEach(s => {
            s.classList.remove('hover');
        });
    });
});

// Submit rating button
document.getElementById('submitRatingBtn').addEventListener('click', function() {
    if (workshopRating === 0) {
        showNotification('Please select a rating before submitting');
        return;
    }

    const feedback = document.getElementById('feedbackText').value.trim();
    
    // In a real system, we would send this to a backend
    showNotification(`Thank you for your ${workshopRating}-star rating!`);
    
    // Hide rating section, show certificate section
    document.getElementById('ratingContainer').style.display = 'none';
    document.getElementById('certificateSection').style.display = 'block';
    
    // Update workshop data to mark as rated
    const workshop = workshops.find(w => w.id === currentWorkshopId);
    if (workshop) {
        workshop.rated = true;
    }
});

// Generate certificate button
document.getElementById('generateCertificateBtn').addEventListener('click', function() {
    // Show certificate display
    document.getElementById('certificateDisplay').style.display = 'block';
    document.getElementById('certificateSuccess').style.display = 'block';
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-check"></i> Certificate Received';
    
    showNotification('Certificate has been added to your profile!');
    
    // Update workshop data to mark as certificate received
    const workshop = workshops.find(w => w.id === currentWorkshopId);
    if (workshop) {
        workshop.certificateReceived = true;
    }
});

// Download certificate button
document.getElementById('downloadCertificateBtn').addEventListener('click', function() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'certificate.pdf'; // Path to your PDF certificate
    link.download = 'GUC_Workshop_Certificate.pdf'; // Suggested filename
    // In a real system, this would trigger a download
    // For our prototype, we'll just show a message
    showNotification('Certificate download started!');
});
    
    // Update workshop data to mark as certificate received
    const workshop = workshops.find(w => w.id === currentWorkshopId);
    if (workshop) {
        workshop.certificateReceived = true;
    }

// Update the workshop data array to include rating and certificate status
workshops.forEach(workshop => {
    workshop.rated = false;
    workshop.certificateReceived = false;

    function downloadCertificate() {
    const link = document.createElement('a');
    link.href = 'certificate.pdf';
    link.download = 'Workshop_Certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Certificate download started!');
}
    
    // Show confirmation
    showNotification('Certificate download started!');
}
);