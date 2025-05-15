document.addEventListener('DOMContentLoaded', function() {
  // Simulated current date for application status logic
  const CURRENT_SIMULATED_DATE = new Date('2025-05-11');
  CURRENT_SIMULATED_DATE.setHours(0, 0, 0, 0); // Normalize to start of day

  // Sample student data
  const studentData = {
    name: "Mohamed Ahmed",
    major: "Computer Science",
    gpa: 3.7,
    graduationYear: 2025,
    jobInterests: ["Data Science", "Machine Learning", "Web Development"],
    workExperience: [
      {
        company: "Tech Solutions Inc.",
        position: "Software Developer Intern",
        duration: "Jun 2023 - Aug 2023",
        responsibilities: "Developed web applications using React and Node.js"
      },
      {
        company: "University Lab",
        position: "Research Assistant",
        duration: "Sep 2022 - May 2023",
        responsibilities: "Conducted research on machine learning algorithms"
      }
    ],
    collegeActivities: [
      {
        name: "Google Developer Student Club",
        role: "Core Team Member",
        duration: "2022-2023",
        description: "Organized tech workshops and hackathons"
      },
      {
        name: "ACM Programming Competition",
        role: "Participant",
        duration: "2023",
        description: "Competed in regional programming competition"
      }
    ]
  };
// Majors data with semester counts
const majorsData = [
  { name: "Computer Science", semesters: 8 },
  { name: "Engineering", semesters: 10 },
  { name: "Business Administration", semesters: 8 },
  { name: "Pharmacy", semesters: 10 },
  { name: "Biotechnology", semesters: 8 },
  { name: "Architecture", semesters: 10 },
  { name: "Applied Arts", semesters: 8 },
  { name: "Economics", semesters: 8 }
];


// Add to your existing studentData object:
studentData.major = "Computer Science";
studentData.currentSemester = 5;

// Add these functions to handle majors functionality
function setupMajorsSelection() {
  const majorSelect = document.getElementById('major-select');
  const semesterSelect = document.getElementById('semester-select');
  const selectedInfo = document.getElementById('selectedMajorInfo');
  const displayMajor = document.getElementById('displayMajor');
  const displaySemester = document.getElementById('displaySemester');

  // Populate majors dropdown
  majorsData.forEach(major => {
    const option = document.createElement('option');
    option.value = major.name;
    option.textContent = major.name;
    if (major.name === studentData.major) {
      option.selected = true;
    }
    majorSelect.appendChild(option);
  });

  // Set initial semester options if major is already selected
  if (studentData.major) {
    updateSemesterOptions(studentData.major);
    semesterSelect.value = studentData.currentSemester;
    displaySelectedInfo();
  }

  // Major selection change handler
  majorSelect.addEventListener('change', function() {
    const selectedMajor = this.value;
    studentData.major = selectedMajor;
    studentData.currentSemester = 1; // Reset to first semester when changing major
    updateSemesterOptions(selectedMajor);
    displaySelectedInfo();
  });

  // Semester selection change handler
  semesterSelect.addEventListener('change', function() {
    studentData.currentSemester = parseInt(this.value);
    displaySelectedInfo();
  });

  function updateSemesterOptions(majorName) {
    semesterSelect.innerHTML = '<option value="" disabled selected>Select semester</option>';
    const major = majorsData.find(m => m.name === majorName);
    
    if (major) {
      semesterSelect.disabled = false;
      for (let i = 1; i <= major.semesters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Semester ${i}`;
        if (i === studentData.currentSemester) {
          option.selected = true;
        }
        semesterSelect.appendChild(option);
      }
    } else {
      semesterSelect.disabled = true;
    }
  }

  function displaySelectedInfo() {
    if (studentData.major && studentData.currentSemester) {
      displayMajor.textContent = studentData.major;
      displaySemester.textContent = `Semester ${studentData.currentSemester}`;
      selectedInfo.style.display = 'block';
    } else {
      selectedInfo.style.display = 'none';
    }
  }
}

  // Sample companies data
  const companiesData = [
    {
      name: "NileTech Solutions",
      industry: "tech",
      description: "Leading AI and data science company in Egypt",
      matchReason: "Matches your interests in Data Science and Machine Learning",
      matchScore: 92,
      pastInterns: [
        { name: "Ahmed Ali", role: "Data Science Intern", review: "Great learning experience" },
        { name: "Mariam Mohamed", role: "Web Development Intern", review: "Excellent mentorship" }
      ]
    },
    {
      name: "Cairo FinTech",
      industry: "finance",
      description: "Innovative financial technology solutions provider",
      matchReason: "Matches your programming skills and interest in web technologies",
      matchScore: 85,
      pastInterns: [
        { name: "Omar Khaled", role: "Backend Developer Intern", review: "Challenging projects" }
      ]
    },
    {
      name: "Delta Health Systems",
      industry: "healthcare",
      description: "Healthcare technology and analytics company",
      matchReason: "Looking for developers with your skill set",
      matchScore: 78,
      pastInterns: [
        { name: "Yara Mahmoud", role: "Data Analyst Intern", review: "Great work environment" }
      ]
    }
  ];
  // Sample internships data
const internshipsData = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "NileTech Solutions",
    industry: "tech",
    description: "Join our engineering team to work on cutting-edge web applications.",
    location: "Cairo",
    duration: "3 months",
    stipend: "Paid",
    deadline: "2023-11-15",
    requirements: "Computer Science major, knowledge of JavaScript"
  },
  {
    id: 2,
    title: "Financial Analyst Intern",
    company: "Cairo FinTech",
    industry: "finance",
    description: "Assist our finance team with market research and data analysis.",
    location: "Giza",
    duration: "2 months",
    stipend: "Paid",
    deadline: "2023-12-01",
    requirements: "Business or Economics major, Excel skills"
  },
  {
    id: 3,
    title: "Biomedical Research Intern",
    company: "Delta Health Systems",
    industry: "healthcare",
    description: "Work with our research team on new medical technologies.",
    location: "Alexandria",
    duration: "6 months",
    stipend: "Unpaid",
    deadline: "2023-11-30",
    requirements: "Biotechnology or Pharmacy major"
  }
];


// Enhanced dummy data for applications
const applicationsData = [
  {
    id: 1,
    internshipId: 1,
    title: "Software Engineering Intern",
    company: "NileTech Solutions",
    position: "Frontend Developer",
    appliedDate: "2023-10-15", // More than 1 year ago
    startDate: "2023-11-01",
    endDate: "2024-02-01", // Completed long ago
    status: "completed", // Original status
    type: "Summer Internship",
    notes: "Great learning experience with React and Redux",
    location: "Cairo",
    stipend: "Paid"
  },
  {
    id: 2,
    internshipId: 3,
    title: "Biomedical Research Intern",
    company: "Delta Health Systems",
    position: "Research Assistant",
    appliedDate: "2023-10-10", // More than 1 year ago
    startDate: "2024-01-15",
    endDate: "2024-07-15", // Completed (endDate < CURRENT_SIMULATED_DATE)
    status: "current", // Original status, but should be seen as completed
    type: "Spring Internship",
    notes: "Ongoing research in machine learning for medical imaging",
    location: "Alexandria",
    stipend: "Paid"
  },
  {
    id: 3,
    internshipId: 2,
    title: "Financial Analyst Intern",
    company: "Cairo FinTech",
    position: "Data Analyst",
    appliedDate: "2023-09-01", // More than 1 year ago
    startDate: "2023-09-15",
    endDate: "2023-11-15", // Completed long ago
    status: "completed", // Original status
    type: "Fall Internship",
    notes: "Developed financial models for investment strategies",
    location: "Giza",
    stipend: "Paid"
  },
  {
    id: 4,
    internshipId: 4, // Assuming an internshipId 4 exists for this example
    title: "Marketing Intern",
    company: "Digital Marketing Agency",
    position: "Content Creator",
    appliedDate: "2023-08-20", // More than 1 year ago
    status: "pending", // No start/end dates, remains pending
    type: "Summer Internship",
    notes: "Awaiting response from HR department",
    location: "Remote",
    stipend: "Unpaid"
  },
  {
    id: 5,
    internshipId: 5, // Assuming an internshipId 5 exists
    title: "UX Design Intern",
    company: "Creative Solutions Ltd.",
    position: "UX Intern",
    appliedDate: "2025-04-15", // Applied last month (relative to May 11, 2025)
    startDate: "2025-05-01", // Started (relative to May 11, 2025)
    endDate: "2025-08-01",   // Ends in future
    status: "pending", // Original status, but should be 'current'
    type: "Summer Internship",
    notes: "Working on a new mobile app interface.",
    location: "Cairo",
    stipend: "Paid"
  },
  {
    id: 6,
    internshipId: 6, // Assuming an internshipId 6 exists
    title: "Data Science Intern",
    company: "Analytics Corp",
    position: "Junior Data Scientist",
    appliedDate: "2025-05-01", // Applied this month (relative to May 11, 2025)
    startDate: "2025-06-01", // Starts next month
    endDate: "2025-09-01",
    status: "pending", // Original status, should remain 'pending' (future start)
    type: "Summer Internship",
    notes: "Excited to start this role.",
    location: "Remote",
    stipend: "Paid"
  },
  {
    id: 7,
    internshipId: 7, // Assuming an internshipId 7 exists
    title: "Backend Developer Intern",
    company: "Server Masters Inc.",
    position: "Backend Intern",
    appliedDate: "2025-03-15", // Applied within last 3 months (relative to May 11, 2025)
    startDate: "2024-10-01",
    endDate: "2025-01-01",   // Completed this year, before CURRENT_SIMULATED_DATE
    status: "completed", // Original status
    type: "Winter Internship",
    notes: "Focused on API development.",
    location: "Giza",
    stipend: "Unpaid"
  },
  {
    id: 8,
    internshipId: 8,
    title: "Cloud Engineering Intern",
    company: "SkyHigh Cloud",
    position: "Cloud Intern",
    appliedDate: "2024-10-01", // Applied last year (relative to May 11, 2025)
    startDate: "2025-05-10", // Started yesterday (relative to May 11, 2025)
    // No endDate, so it's ongoing
    status: "current", // Original status, should be 'current'
    type: "Ongoing Internship",
    notes: "Learning AWS and Azure.",
    location: "Alexandria",
    stipend: "Paid"
  }
];

// Update studentData object
studentData.applications = applicationsData;

// Helper function to determine the effective status for filtering
function getEffectiveStatusForFiltering(application, currentDate) {
    const appStatusOriginal = application.status ? application.status.toLowerCase() : 'pending';
    const startDate = application.startDate ? new Date(application.startDate) : null;
    const endDate = application.endDate ? new Date(application.endDate) : null;

    // Normalize dates to start of day for consistent comparison
    if (startDate) startDate.setHours(0,0,0,0);
    if (endDate) endDate.setHours(0,0,0,0);
    // currentDate (CURRENT_SIMULATED_DATE) is already normalized at its definition

    // 1. Check for completion by end date
    if (endDate && endDate < currentDate) {
        return 'completed';
    }

    // 2. Check for current status by start date (and not yet ended)
    if (startDate && startDate <= currentDate && (!endDate || endDate >= currentDate)) {
        return 'current';
    }

    // 3. Check for future start (treat as pending for filtering regardless of original status)
    if (startDate && startDate > currentDate) {
        return 'pending'; // Internship hasn't started yet
    }

    // 4. Fallback to original status if dates are not definitive or not present
    if (appStatusOriginal === 'completed') return 'completed';
    if (appStatusOriginal === 'current') {
        if (!startDate) return 'pending';
        // If it was truly current by dates, rules 1-2 would have caught it.
        // If future start, rule 3 caught it.
        return 'pending'; // Default if marked 'current' but dates don't align as active
    }

    return 'pending'; // Default for all other cases (e.g. original 'pending')
}

// Helper function to get display status text, class, and date label
function getDisplayStatus(application, currentDate) {
    let statusText = '';
    let cssClass = '';
    let dateLabel = '';
    let isClickable = false;

    const effectiveStatus = getEffectiveStatusForFiltering(application, currentDate);

    switch (effectiveStatus) {
        case 'completed':
            statusText = 'Completed';
            cssClass = 'status-completed';
            if (application.endDate) {
                dateLabel = `Completed: ${new Date(application.endDate).toLocaleDateString()}`;
            } else if (application.startDate) {
                dateLabel = `Ended: ${new Date(application.startDate).toLocaleDateString()}`;
            } else {
                dateLabel = 'Completed';
            }
            isClickable = true;
            break;
        case 'current':
            statusText = 'Current';
            cssClass = 'status-current';
            if (application.startDate) {
                dateLabel = `Started: ${new Date(application.startDate).toLocaleDateString()}`;
                if (application.endDate && new Date(application.endDate) >= currentDate) {
                    dateLabel += ` - Ends: ${new Date(application.endDate).toLocaleDateString()}`;
                } else if (!application.endDate) {
                    dateLabel += " - Present";
                }
            } else {
                dateLabel = 'Current';
            }
            break;
        case 'pending':
        default:
            statusText = 'Pending';
            cssClass = 'status-pending';
            dateLabel = `Applied: ${new Date(application.appliedDate).toLocaleDateString()}`;
            if (application.startDate && new Date(application.startDate) > currentDate) {
                dateLabel += ` (Starts: ${new Date(application.startDate).toLocaleDateString()})`;
            }
            break;
    }
    return { text: statusText, cssClass, dateLabel, isClickable, effectiveStatus };
}

// Load applications with filters
function loadApplications(statusFilter = 'all', dateFilter = 'all') {
  const applicationsList = document.getElementById('applicationsList');
  if (!applicationsList) {
    console.error("applicationsList element not found");
    return;
  }
  
  let filteredApplications = studentData.applications;
  
  // Apply status filter using effective status
  if (statusFilter !== 'all') {
    filteredApplications = filteredApplications.filter(app => {
      const effectiveStatus = getEffectiveStatusForFiltering(app, CURRENT_SIMULATED_DATE);
      return effectiveStatus === statusFilter;
    });
  }
  
  // Apply date filter (by appliedDate, relative to simulated today)
  if (dateFilter !== 'all') {
    const todayForDateFilter = new Date(CURRENT_SIMULATED_DATE); // Use simulated 'today' for relative date filtering
    let cutoffDate = new Date(todayForDateFilter);
    
    switch(dateFilter) {
      case 'last-month': 
        cutoffDate.setMonth(todayForDateFilter.getMonth() - 1); 
        break;
      case 'last-3-months': 
        cutoffDate.setMonth(todayForDateFilter.getMonth() - 3); 
        break;
      case 'last-6-months': 
        cutoffDate.setMonth(todayForDateFilter.getMonth() - 6); 
        break;
      case 'last-year': 
        cutoffDate.setFullYear(todayForDateFilter.getFullYear() - 1); 
        break;
      default:
        // No change to cutoffDate, effectively no date filter if 'all' or unknown
        break; 
    }
    
    if (dateFilter !== 'all') { // Only filter if a specific date range is selected
        filteredApplications = filteredApplications.filter(app => {
            const appDate = new Date(app.appliedDate);
            return appDate >= cutoffDate;
        });
    }
  }
  
  if (!filteredApplications || filteredApplications.length === 0) {
    applicationsList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-file-alt"></i>
        <p>No applications match your criteria</p>
      </div>
    `;
    return;
  }

  applicationsList.innerHTML = filteredApplications.map(app => {
    const displayInfo = getDisplayStatus(app, CURRENT_SIMULATED_DATE);
    const clickableClass = displayInfo.isClickable ? 'application-item-clickable' : '';
    
    let dateDetailsHtml = `<div class="application-date main-date">${displayInfo.dateLabel}</div>`;
    // Always show applied date for context
    dateDetailsHtml += `<div class="application-date applied-on-date">Applied: ${new Date(app.appliedDate).toLocaleDateString()}</div>`;

    return `
      <div class="application-item ${clickableClass}" data-id="${app.id}" data-completed="${displayInfo.isClickable}">
        <div class="application-header">
          <h3>${app.title}</h3>
          <div class="application-company">${app.company}</div>
        </div>
        <div class="application-details">
          <div class="application-status ${displayInfo.cssClass}">${displayInfo.text}</div>
          ${dateDetailsHtml}
        </div>
      </div>
    `;
  }).join('');
  
  // Add event listeners to clickable application items
  document.querySelectorAll('.application-item-clickable').forEach(item => {
    item.addEventListener('click', function() {
      const appId = parseInt(this.dataset.id);
      showApplicationDetails(appId);
    });
  });
}

// Show application details
function showApplicationDetails(appId) {
  const application = studentData.applications.find(app => app.id === appId);
  if (!application) return;

  const displayInfo = getDisplayStatus(application, CURRENT_SIMULATED_DATE);

  // Create modal elements
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  modalContent.innerHTML = `
    <button class="modal-close-btn">&times;</button>
    <h3><i class="fas fa-info-circle"></i> Internship Details</h3>
    <div class="internship-details">
      <div class="detail-row">
        <span class="detail-label">Company:</span>
        <span class="detail-value">${application.company}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Position:</span>
        <span class="detail-value">${application.position || application.title}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Duration:</span>
        <span class="detail-value">
          ${application.startDate ? 
            `${new Date(application.startDate).toLocaleDateString()} - 
             ${application.endDate ? new Date(application.endDate).toLocaleDateString() : (displayInfo.effectiveStatus === 'current' ? 'Present' : 'N/A')}` : 
            'Not specified'}
        </span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status:</span>
        <span class="detail-value">${displayInfo.text}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Applied Date:</span>
        <span class="detail-value">${new Date(application.appliedDate).toLocaleDateString()}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Notes:</span>
        <span class="detail-value">${application.notes || 'No additional notes'}</span>
      </div>
    </div>
  `;

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Show modal with animation
  setTimeout(() => {
    modalOverlay.classList.add('visible');
    modalContent.classList.add('visible');
  }, 10); // Small delay to ensure transition is applied

  // Close modal functionality
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal(modalOverlay, modalContent);
    }
  });
  modalContent.querySelector('.modal-close-btn').addEventListener('click', () => {
    closeModal(modalOverlay, modalContent);
  });
}

function closeModal(modalOverlay, modalContent) {
  modalOverlay.classList.remove('visible');
  modalContent.classList.remove('visible');
  setTimeout(() => {
    if (document.body.contains(modalOverlay)) {
      document.body.removeChild(modalOverlay);
    }
  }, 300); // Match CSS transition duration
}

// Setup event listeners for filters
function setupApplicationFilters() {
  document.getElementById('status-filter').addEventListener('change', function() {
    loadApplications(this.value, document.getElementById('date-filter').value);
  });
  
  document.getElementById('date-filter').addEventListener('change', function() {
    loadApplications(document.getElementById('status-filter').value, this.value);
  });
}

// Fix the profile form submission handler
function fixProfileFormSubmission() {
  console.log("Setting up profile form submission handler");
  const profileFormElement = document.getElementById('profileForm');
  
  if (profileFormElement) {
    console.log("Profile form found, adding submit event listener");
    profileFormElement.addEventListener('submit', function(e) {
      console.log("Form submitted!");
      e.preventDefault();
      saveProfile();
    });
  } else {
    console.error("Could not find profile form element");
  }
}


  // DOM Elements
  const profileView = document.getElementById('profileView');
  const profileForm = document.getElementById('profileForm');
  const editProfileBtn = document.getElementById('editProfileBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const addExperienceBtn = document.getElementById('addExperienceBtn');
  const addActivityBtn = document.getElementById('addActivityBtn');
  const workExperienceForms = document.getElementById('workExperienceForms');
  const collegeActivityForms = document.getElementById('collegeActivityForms');
  const companiesList = document.getElementById('companiesList');
  const companySearch = document.getElementById('companySearch');
  const companyFilter = document.getElementById('companyFilter');
  const optionalUploadArea = document.getElementById('optionalUploadArea');
const optionalFileInput = document.getElementById('optionalFileInput');
const optionalFilesList = document.getElementById('optionalFilesList');
let optionalFiles = [];
// Add to your DOM elements
const courseYearFilter = document.getElementById('course-year-filter');
const courseSemesterFilter = document.getElementById('course-semester-filter');
const coursesList = document.getElementById('coursesList');
const saveCoursesBtn = document.getElementById('saveCoursesBtn');

// Add to your setupApplicationModal() function:




function handleDragOver(e) {
  e.preventDefault();
  optionalUploadArea.style.borderColor = 'var(--primary-medium)';
  optionalUploadArea.style.backgroundColor = 'rgba(212, 241, 244, 0.4)';
}

function handleDragLeave() {
  optionalUploadArea.style.borderColor = 'var(--primary-light)';
  optionalUploadArea.style.backgroundColor = '';
}

function handleOptionalDrop(e) {
  e.preventDefault();
  handleDragLeave();
  if (e.dataTransfer.files.length) {
    handleOptionalFiles(e.dataTransfer.files);
  }
}

function handleOptionalFileSelect() {
  if (optionalFileInput.files.length) {
    handleOptionalFiles(optionalFileInput.files);
  }
}

function handleOptionalFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!validateFile(file)) continue;
    
    // Check for duplicates
    if (!optionalFiles.some(f => f.name === file.name && f.size === file.size)) {
      // Simulate upload progress
      uploadFile(file, (progress) => {
        updateFileProgress(file.name, progress);
      }).then(() => {
        optionalFiles.push(file);
        renderOptionalFile(file);
      });
    }
  }
}

function validateFile(file) {
  const validTypes = ['application/pdf', 'application/msword', 
                     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                     'image/jpeg', 'image/png'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    alert(`File "${file.name}" is not a supported format. Please upload PDF, DOC, DOCX, JPG or PNG files.`);
    return false;
  }
  
  if (file.size > maxSize) {
    alert(`File "${file.name}" exceeds the 5MB size limit.`);
    return false;
  }
  
  return true;
}

function uploadFile(file, progressCallback) {
  return new Promise((resolve) => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        resolve();
      }
      progressCallback(progress);
    }, 200);
  });
}

function renderOptionalFile(file) {
  const fileCard = document.createElement('div');
  fileCard.className = 'file-card';
  fileCard.dataset.fileName = file.name;

  fileCard.innerHTML = `
    <div class="file-info">
      <i class="file-icon fas ${getFileIcon(file.type)}"></i>
      <div class="file-details">
        <span class="file-name">${file.name}</span>
        <span class="file-size">${formatFileSize(file.size)}</span>
        <div class="file-progress">
          <div class="file-progress-bar" style="width: 100%"></div>
        </div>
      </div>
    </div>
    <div class="file-actions">
      <button class="file-action-btn preview" title="Preview">
        <i class="fas fa-eye"></i>
      </button>
      <button class="file-action-btn delete" title="Remove">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;

  // Add event listeners
  fileCard.querySelector('.delete').addEventListener('click', () => removeOptionalFile(file.name));
  fileCard.querySelector('.preview').addEventListener('click', () => previewFile(file));

  optionalFilesList.appendChild(fileCard);
}

function updateFileProgress(fileName, progress) {
  const fileCard = document.querySelector(`.file-card[data-file-name="${fileName}"]`);
  if (fileCard) {
    const progressBar = fileCard.querySelector('.file-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }
}

function removeOptionalFile(fileName) {
  optionalFiles = optionalFiles.filter(f => f.name !== fileName);
  const fileCard = document.querySelector(`.file-card[data-file-name="${fileName}"]`);
  if (fileCard) {
    fileCard.remove();
  }
}

function previewFile(file) {
  // In a real app, this would open a preview modal
  alert(`Previewing file: ${file.name}`);
}

function getFileIcon(fileType) {
  if (fileType.includes('image')) return 'fa-image';
  if (fileType.includes('pdf')) return 'fa-file-pdf';
  if (fileType.includes('word')) return 'fa-file-word';
  return 'fa-file-alt';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
}

// Update your submitApplication function to include the files:
function submitApplication() {
  // ... existing validation code ...
  
  const applicationData = {
    company: selectedCompany.name,
    student: studentData.name,
    coverLetter: document.getElementById('coverLetter').value,
    requiredDocuments: {
      cv: true, // In real app, this would be the actual files
      transcript: true
    },
    optionalDocuments: optionalFiles.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size
    })),
    submittedAt: new Date().toISOString()
  };
  
  console.log('Application submitted:', applicationData);
  alert(`Your application to ${selectedCompany.name} has been submitted successfully with ${optionalFiles.length} additional documents!`);
  closeModal();
}
optionalUploadArea.addEventListener('click', () => optionalFileInput.click());
optionalUploadArea.addEventListener('dragover', handleDragOver);
optionalUploadArea.addEventListener('dragleave', handleDragLeave);
optionalUploadArea.addEventListener('drop', handleOptionalDrop);
optionalFileInput.addEventListener('change', handleOptionalFileSelect);

  // Initialize the page
  function init() { // THIS IS THE CONSOLIDATED init() FUNCTION TO BE USED
    loadProfileView();
    loadSuggestedCompanies();
    setupEventListeners();
    setupMajorsSelection();
    loadInternships();
    loadApplications(); // Load applications with default filters
    setupApplicationFilters(); // Setup filter event listeners
    setupCoursesSection();
    fixProfileFormSubmission();
  }

  // Load profile data into view mode
  function loadProfileView() {
    // Basic info
    document.getElementById('studentName').textContent = studentData.name;
    document.getElementById('studentMajor').textContent = studentData.major;
    document.getElementById('studentGPA').textContent = `GPA: ${studentData.gpa}`;
    
    // Job interests
    const interestsContainer = document.getElementById('interestsContainer');
    interestsContainer.innerHTML = studentData.jobInterests
      .map(interest => `<span class="interest-tag">${interest}</span>`)
      .join('');
    
    // Work experience
    const experienceContainer = document.getElementById('experienceContainer');
    experienceContainer.innerHTML = studentData.workExperience
      .map(exp => `
        <div class="experience-item">
          <div class="experience-header">
            <span class="experience-title">${exp.position}</span>
            <span class="experience-duration">${exp.duration}</span>
          </div>
          <div class="experience-company">${exp.company}</div>
          <div class="experience-description">${exp.responsibilities}</div>
        </div>
      `).join('');
    
    // College activities
    const activitiesContainer = document.getElementById('activitiesContainer');
    activitiesContainer.innerHTML = studentData.collegeActivities
      .map(activity => `
        <div class="activity-item">
          <div class="activity-header">
            <span class="activity-title">${activity.name}</span>
            <span class="activity-duration">${activity.duration}</span>
          </div>
          <div class="activity-organization">${activity.role}</div>
          <div class="activity-description">${activity.description}</div>
        </div>
      `).join('');
  }

  // Load profile data into edit form
  function loadProfileForm() {
    // Basic info
    document.getElementById('fullName').value = studentData.name;
    document.getElementById('major').value = studentData.major;
    document.getElementById('gpa').value = studentData.gpa;
    document.getElementById('gradYear').value = studentData.graduationYear;
    document.getElementById('jobInterests').value = studentData.jobInterests.join(', ');
    
    // Work experience forms
    workExperienceForms.innerHTML = studentData.workExperience
      .map((exp, index) => createExperienceForm(exp, index))
      .join('');
    
    // Activity forms
    collegeActivityForms.innerHTML = studentData.collegeActivities
      .map((activity, index) => createActivityForm(activity, index))
      .join('');
  }

  // Create work experience form
  function createExperienceForm(experience = {}, index) {
    return `
      <div class="experience-form" data-index="${index}">
        <button type="button" class="remove-btn" data-type="experience" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
        <div class="form-row">
          <div class="input-group">
            <label for="expCompany${index}">Company Name</label>
            <input type="text" id="expCompany${index}" value="${experience.company || ''}" required>
          </div>
          <div class="input-group">
            <label for="expPosition${index}">Position</label>
            <input type="text" id="expPosition${index}" value="${experience.position || ''}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="input-group">
            <label for="expDuration${index}">Duration</label>
            <input type="text" id="expDuration${index}" value="${experience.duration || ''}" required>
          </div>
        </div>
        <div class="input-group">
          <label for="expResponsibilities${index}">Responsibilities</label>
          <textarea id="expResponsibilities${index}" required>${experience.responsibilities || ''}</textarea>
        </div>
      </div>
    `;
  }
  

  // Create activity form
  function createActivityForm(activity = {}, index) {
    return `
      <div class="activity-form" data-index="${index}">
        <button type="button" class="remove-btn" data-type="activity" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
        <div class="form-row">
          <div class="input-group">
            <label for="actName${index}">Activity Name</label>
            <input type="text" id="actName${index}" value="${activity.name || ''}" required>
          </div>
          <div class="input-group">
            <label for="actRole${index}">Your Role</label>
            <input type="text" id="actRole${index}" value="${activity.role || ''}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="input-group">
            <label for="actDuration${index}">Duration</label>
            <input type="text" id="actDuration${index}" value="${activity.duration || ''}" required>
          </div>
        </div>
        <div class="input-group">
          <label for="actDescription${index}">Description</label>
          <textarea id="actDescription${index}" required>${activity.description || ''}</textarea>
        </div>
      </div>
    `;
  }

  // Load suggested companies
  function loadSuggestedCompanies(filter = 'all', searchTerm = '') {
    let filteredCompanies = companiesData;
    
    // Apply filter
    if (filter !== 'all') {
      filteredCompanies = filteredCompanies.filter(company => company.industry === filter);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredCompanies = filteredCompanies.filter(company => 
        company.name.toLowerCase().includes(term) ||
        company.description.toLowerCase().includes(term)
      );
    }
    
    // Sort by match score
    filteredCompanies.sort((a, b) => b.matchScore - a.matchScore);
    
    // Display companies
    companiesList.innerHTML = filteredCompanies.map(company => `
      <div class="company-card">
        <div class="company-header">
          <div>
            <div class="company-name">${company.name}</div>
            <div class="company-industry">${company.industry.charAt(0).toUpperCase() + company.industry.slice(1)}</div>
          </div>
          <div class="company-match">Match: ${company.matchScore}%</div>
        </div>
        <div class="company-description">${company.description}</div>
        <div class="company-reason">${company.matchReason}</div>
        <div class="past-interns">
          <strong>Past Interns:</strong>
          <ul>
            ${company.pastInterns.map(intern => `
              <li>${intern.name} (${intern.role}): "${intern.review}"</li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');
    
    if (filteredCompanies.length === 0) {
      companiesList.innerHTML = '<p class="no-results">No companies match your criteria</p>';
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    // Edit profile toggle
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => {
        profileView.style.display = 'none';
        profileForm.style.display = 'block';
        loadProfileForm();
      });
    }
    
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', () => {
        profileForm.style.display = 'none';
        profileView.style.display = 'block';
      });
    }
    
    // Add experience
    addExperienceBtn.addEventListener('click', () => {
      const newIndex = studentData.workExperience.length;
      workExperienceForms.insertAdjacentHTML('beforeend', createExperienceForm({}, newIndex));
    });
    
    // Add activity
    addActivityBtn.addEventListener('click', () => {
      const newIndex = studentData.collegeActivities.length;
      collegeActivityForms.insertAdjacentHTML('beforeend', createActivityForm({}, newIndex));
    });
    
    // Remove forms
    document.addEventListener('click', function(e) {
      if (e.target.closest('.remove-btn')) {
        const btn = e.target.closest('.remove-btn');
        const type = btn.dataset.type;
        const index = parseInt(btn.dataset.index);
        
        if (type === 'experience') {
          studentData.workExperience.splice(index, 1);
        } else if (type === 'activity') {
          studentData.collegeActivities.splice(index, 1);
        }
        
        loadProfileForm();
      }
    });
    
    // Company search and filter
    companySearch.addEventListener('input', () => {
      loadSuggestedCompanies(companyFilter.value, companySearch.value);
    });
    
    companyFilter.addEventListener('change', () => {
      loadSuggestedCompanies(companyFilter.value, companySearch.value);
    });

    // Internship search and filter
    document.getElementById('internshipSearch').addEventListener('input', () => {
      loadInternships(
        document.getElementById('internshipFilter').value,
        document.getElementById('internshipSearch').value
      );
    });

    document.getElementById('internshipFilter').addEventListener('change', () => {
      loadInternships(
        document.getElementById('internshipFilter').value,
        document.getElementById('internshipSearch').value
      );
    });

    // Application button clicks
    document.addEventListener('click', function(e) {
      if (e.target.closest('.apply-btn')) {
        const btn = e.target.closest('.apply-btn');
        const internshipId = parseInt(btn.dataset.id);
        handleApplication(internshipId);
      }
    });
  }
  

  // Save profile data
  function saveProfile() {
    // Basic info
    studentData.name = document.getElementById('fullName').value;
    studentData.major = document.getElementById('major').value;
    studentData.gpa = parseFloat(document.getElementById('gpa').value);
    studentData.graduationYear = parseInt(document.getElementById('gradYear').value);
    
    // Job interests
    const interestsText = document.getElementById('jobInterests').value;
    studentData.jobInterests = interestsText.split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Work experience
    const experienceForms = document.querySelectorAll('.experience-form');
    studentData.workExperience = Array.from(experienceForms).map((form, index) => ({
      company: document.getElementById(`expCompany${index}`).value,
      position: document.getElementById(`expPosition${index}`).value,
      duration: document.getElementById(`expDuration${index}`).value,
      responsibilities: document.getElementById(`expResponsibilities${index}`).value
    }));
    
    // College activities
    const activityForms = document.querySelectorAll('.activity-form');
    studentData.collegeActivities = Array.from(activityForms).map((form, index) => ({
      name: document.getElementById(`actName${index}`).value,
      role: document.getElementById(`actRole${index}`).value,
      duration: document.getElementById(`actDuration${index}`).value,
      description: document.getElementById(`actDescription${index}`).value
    }));
    
    // Return to view mode
    profileForm.style.display = 'none';
    profileView.style.display = 'block';
    loadProfileView();
    loadSuggestedCompanies();
  }

  // Load internships list
function loadInternships(filter = 'all', searchTerm = '') {
  let filteredInternships = internshipsData;

  // Apply filter
  if (filter !== 'all') {
    filteredInternships = filteredInternships.filter(internship => internship.industry === filter);
  }

  // Apply search
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredInternships = filteredInternships.filter(internship => 
      internship.title.toLowerCase().includes(term) ||
      internship.company.toLowerCase().includes(term)
    );
  }

  // Display internships
  const internshipsList = document.getElementById('internshipsList');
  internshipsList.innerHTML = filteredInternships.map(internship => {
    const hasApplied = studentData.applications.some(app => app.internshipId === internship.id);
    
    return `
      <div class="internship-card">
        <div class="internship-header">
          <div>
            <div class="internship-title">${internship.title}</div>
            <div class="internship-company">${internship.company}</div>
          </div>
          <div class="company-industry">${internship.industry.charAt(0).toUpperCase() + internship.industry.slice(1)}</div>
        </div>
        <div class="internship-details">
          <div class="internship-detail">
            <i class="fas fa-map-marker-alt"></i>
            <span>${internship.location}</span>
          </div>
          <div class="internship-detail">
            <i class="fas fa-clock"></i>
            <span>${internship.duration}</span>
          </div>
          <div class="internship-detail">
            <i class="fas fa-money-bill-wave"></i>
            <span>${internship.stipend}</span>
          </div>
          <div class="internship-detail">
            <i class="fas fa-calendar-times"></i>
            <span>Apply by: ${new Date(internship.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        <div class="internship-description">
          <p>${internship.description}</p>
          <p><strong>Requirements:</strong> ${internship.requirements}</p>
        </div>
        <div class="internship-actions">
          <button class="btn-primary ${hasApplied ? 'applied-btn' : 'apply-btn'}" 
                  data-id="${internship.id}"
                  ${hasApplied ? 'disabled' : ''}>
            ${hasApplied ? '<i class="fas fa-check"></i> Applied' : '<i class="fas fa-paper-plane"></i> Apply Now'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (filteredInternships.length === 0) {
    internshipsList.innerHTML = '<p class="empty-state">No internships match your criteria</p>';
  }
}

// Handle application submission
function handleApplication(internshipId) {
  const internship = internshipsData.find(i => i.id === internshipId);
  if (!internship) return;

  const newApplication = {
    id: studentData.applications.length + 1,
    internshipId: internship.id,
    title: internship.title,
    company: internship.company,
    appliedDate: new Date().toISOString().split('T')[0],
    status: "pending"
  };

  studentData.applications.push(newApplication);
  loadInternships();
  loadApplications();
}

// Sample course data (replace with your actual data)
const coursesData = {
  "Computer Science": [
    { code: "CS101", name: "Introduction to Programming", year: 1, semester: 1, credits: 3 },
    { code: "CS102", name: "Data Structures", year: 1, semester: 2, credits: 3 },
    { code: "CS201", name: "Algorithms", year: 2, semester: 1, credits: 3 },
    { code: "CS202", name: "Database Systems", year: 2, semester: 2, credits: 3 },
    { code: "CS301", name: "Operating Systems", year: 3, semester: 1, credits: 3 },
    { code: "CS302", name: "Computer Networks", year: 3, semester: 2, credits: 3 },
    { code: "CS401", name: "Software Engineering", year: 4, semester: 1, credits: 3 },
    { code: "CS402", name: "Artificial Intelligence", year: 4, semester: 2, credits: 3 }
  ],
  "Engineering": [
    // Add engineering courses here
  ],
  "Business Administration": [
    // Add business courses here
  ]
};

// Track selected courses
let selectedCourses = [];

function setupCoursesSection() {
  // Load courses based on student's major
  loadCourses();
  
  // Add event listeners
  courseYearFilter.addEventListener('change', loadCourses);
  courseSemesterFilter.addEventListener('change', loadCourses);
  saveCoursesBtn.addEventListener('click', saveSelectedCourses);
}

function loadCourses() {
  const yearFilter = courseYearFilter.value;
  const semesterFilter = courseSemesterFilter.value;
  const major = studentData.major || "Computer Science"; // Default to CS if not set
  
  let courses = coursesData[major] || [];
  
  // Apply filters
  if (yearFilter !== 'all') {
    courses = courses.filter(course => course.year == yearFilter);
  }
  
  if (semesterFilter !== 'all') {
    courses = courses.filter(course => course.semester == semesterFilter);
  }
  
  // Render courses
  renderCourses(courses);
}

function renderCourses(courses) {
  if (courses.length === 0) {
    coursesList.innerHTML = '<p class="empty-state">No courses found matching your criteria.</p>';
    return;
  }
  
  coursesList.innerHTML = courses.map(course => `
    <div class="course-item">
      <div class="course-info">
        <div class="course-code">${course.code}</div>
        <div class="course-name">${course.name}</div>
        <div class="course-meta">
          <span>Year ${course.year}</span>
          <span>•</span>
          <span>Semester ${course.semester}</span>
          <span>•</span>
          <span>${course.credits} credits</span>
        </div>
      </div>
      <div class="course-checkbox">
        <input type="checkbox" id="course-${course.code}" data-code="${course.code}" 
               ${selectedCourses.includes(course.code) ? 'checked' : ''}>
        <label for="course-${course.code}">Helpful</label>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to checkboxes
  document.querySelectorAll('.course-checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const courseCode = this.dataset.code;
      if (this.checked) {
        if (!selectedCourses.includes(courseCode)) {
          selectedCourses.push(courseCode);
        }
      } else {
        selectedCourses = selectedCourses.filter(code => code !== courseCode);
      }
    });
  });
}

function saveSelectedCourses() {
  // In a real app, you would save this to your database
  console.log("Selected helpful courses:", selectedCourses);
  alert(`Successfully saved ${selectedCourses.length} courses as helpful for your internship!`);
  
  // You might want to add this to studentData
  studentData.helpfulCourses = selectedCourses;
}

// Initialize the page
init();
fixProfileFormSubmission(); // Add this redundantly to be absolutely sure it's set up
})
