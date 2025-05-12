document.addEventListener('DOMContentLoaded', function() {
  // File Upload Interactions
  const logoUpload = document.getElementById('logoUpload');
  const docsUpload = document.getElementById('docsUpload');

  logoUpload.addEventListener('click', () => document.getElementById('companyLogo').click());
  docsUpload.addEventListener('click', () => document.getElementById('legalDocs').click());

  // Form Elements
  const form = document.getElementById('registrationForm');
  const successMsg = document.querySelector('.success-message');
  const jobPostForm = document.getElementById('jobPostForm');
  let currentCompany = null;
  let editingJobId = null;
  let currentUserRole = "company"; // or "scad" — switch to "student" to simulate student view
  let jobToDeleteId = null;

  document.querySelector('.persistent-search').style.display = 'none';

  // ==================== PERSISTENT SEARCH FUNCTIONALITY ====================
 // ===== REPLACE YOUR EXISTING SEARCH FUNCTION WITH THIS =====
function setupGlobalSearch() {
  const searchInput = document.getElementById('globalSearch');
  const searchButton = document.getElementById('searchButton');
  const clearBtn = document.getElementById('clearSearch');

  // Search when button clicked
  searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      if (document.getElementById('companyDashboard').style.display !== 'none') {
        document.getElementById('viewInternshipsBtn').click();
      }
      applyGlobalSearch(searchTerm);
    }

    clearBtn.style.display = 'block'; // Always show it (optional)

  });

  // Search when pressing Enter
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });

  // Clear search
 clearBtn.addEventListener('click', function () {
  searchInput.value = '';
  applyGlobalSearch('');
});

  // Show/hide clear button
  searchInput.addEventListener('input', function() {
    clearBtn.style.display = this.value.length > 0 ? 'block' : 'none';
  });
}
// ===========================================================

document.getElementById('jobFilter').addEventListener('change', function() {
  applyFilters();
  scrollToJobResults();
});

function applyFilters() {
  const filterValue = document.getElementById('jobFilter').value;
  const searchTerm = document.getElementById('globalSearch').value.toLowerCase();

  let filteredJobs = currentCompany.jobs;

  // Apply search filter first
  if (searchTerm) {
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm)))
  }

  // Apply job type filter
  switch(filterValue) {
    case 'active':
      filteredJobs = filteredJobs.filter(job => job.status === 'active');
      break;
    case 'paid':
      filteredJobs = filteredJobs.filter(job => job.isPaid);
      break;
    case 'unpaid':
      filteredJobs = filteredJobs.filter(job => !job.isPaid);
      break;
    // 'all' shows everything
  }

  renderJobPosts(filteredJobs);
}

// Modify your existing searchJobs function to use applyFilters
function searchJobs(searchTerm) {
  document.getElementById('jobFilter').value = 'all'; // Reset filter when searching
  applyFilters();
}

  function applyGlobalSearch(searchTerm) {
    if (!currentCompany) return;

    if (document.getElementById('internshipsPage').style.display === 'block') {
      searchInternships(searchTerm);
    } else {
      searchJobs(searchTerm);
    }
  }

function searchJobs(searchTerm) {
  const filteredJobs = currentCompany.jobs.filter(job =>
    searchTerm === '' ||
    job.title.toLowerCase().includes(searchTerm) ||
    job.description.toLowerCase().includes(searchTerm) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
  );

  renderJobPosts(filteredJobs);
}

function goBackToLogin() {
  window.location.href = "login.html";
}
window.goBackToLogin = goBackToLogin; // ✅ expose globally for inline onclick


  function searchInternships(searchTerm) {
    const filteredApplications = applications.filter(app =>
      searchTerm === '' ||
      app.jobTitle.toLowerCase().includes(searchTerm) ||
      app.applicantName.toLowerCase().includes(searchTerm) ||
      app.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    renderFilteredApplications(filteredApplications);
  }

  function renderFilteredApplications(apps) {
    const container = document.getElementById('applicationsList');
    if (!container) return;

    if (apps.length === 0) {
 container.innerHTML = `
  <div class="no-results">
    <i class="fas fa-search"></i>
    <p>No matching job posts found</p>
  </div>
`;

      return;
    }
    container.innerHTML = apps.map(app => `
<div class="application-card" data-id="${app.id}">
  <div class="application-header">
    <h3>${app.jobTitle}</h3>
    <span class="status-${app.status}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
  </div>
  <p><strong>Applicant:</strong> ${app.applicantName}</p>
  <p><strong>Date:</strong> ${app.applicationDate}</p>

  <button class="btn-secondary" onclick="openModal(${app.id})">
    <i class="fas fa-user"></i> View Details
  </button>
</div>

          <button class="btn-primary" onclick="updateApplicationStatus(${app.id}, 'reviewed')">
            <i class="fas fa-check"></i> Mark as Reviewed
          </button>
          <button class="btn-primary btn-delete" onclick="updateApplicationStatus(${app.id}, 'rejected')">
            <i class="fas fa-times"></i> Reject
          </button>
          <a href="mailto:${app.applicantEmail}" class="btn-secondary">
            <i class="fas fa-envelope"></i> Contact
          </a>

        </div>
      </div>
    `).join('');
  }

  function clearSearch() {
    document.getElementById('globalSearch').value = '';
    document.getElementById('clearSearch').style.display = 'none';
    applyGlobalSearch('');
  }
  // ==================== END SEARCH FUNCTIONALITY ====================

  // Initialize search
  setupGlobalSearch();

  // Form Submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Create company profile
    currentCompany = {
      name: document.getElementById('companyName').value,
      email: document.getElementById('email').value,
      status: "pending",
      jobs: []
    };

    // Hide form, show success and dashboard
    form.style.display = 'none';
    successMsg.style.display = 'block';
    document.getElementById('companyDashboard').style.display = 'block';
    document.getElementById('registrationSection').style.display = 'none';
window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simulate admin approval after 3 seconds
approveCompany(); // call immediately

  });

  // Approval system
  function approveCompany() {
    currentCompany.status = "approved";
    currentCompany.approvalDate = new Date().toLocaleDateString();

    document.querySelector('.persistent-search').style.display = 'block';

    addNotification(
      "Your company registration was approved!",
      "accepted"
    );

    // Enable job posting
    document.getElementById('jobPostForm').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('.persistent-search').style.display = 'block';

  }

  function scrollToJob(jobId) {
    const jobElement = document.querySelector(`.job-post[data-id="${jobId}"]`);
    if (jobElement) {
      jobElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center' // Scrolls to center of viewport
      });

            jobElement.style.boxShadow = '0 0 0 3px var(--primary-light)';
      setTimeout(() => {
        jobElement.style.boxShadow = 'none';
      }, 2000);
    }
  }

  function scrollToJobResults() {
  const jobList = document.getElementById('jobPostsList');
  if (jobList) {
    jobList.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

document.getElementById('clearSearchBtn')?.addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  renderJobPosts(currentCompany.jobs);
});

document.getElementById('searchInput')?.addEventListener('input', function () {
  const term = this.value.toLowerCase();
  const filtered = currentCompany.jobs.filter(job =>
    job.title.toLowerCase().includes(term)
  );

  renderJobPosts(filtered); // show only matching jobs
});

  // Rejection system
  function rejectCompany() {
    currentCompany.status = "rejected";

    addNotification(
      "Your registration requires additional verification",
      "rejected"
    );
  }

  // Notification system
  function addNotification(message, type) {
    const notificationList = document.getElementById('notificationList');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'accepted' ? 'check-circle' : 'exclamation-circle'}"></i>
      <div>
        <p><strong>${message}</strong></p>
        <small>${new Date().toLocaleString()}</small>
      </div>
    `;
    notificationList.prepend(notification);

    // Simulate email
    console.log(`Email sent to ${currentCompany.email}: ${message}`);
  }

  // Job Post Form Submission
  jobPostForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const jobData = {
      title: document.getElementById('jobTitle').value,
      duration: document.getElementById('jobDuration').value,
      isPaid: document.querySelector('input[name="compensation"]:checked').value === 'paid',
      salary: document.getElementById('salary').value || 0,
      skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
      description: document.getElementById('description').value
    };

    if (editingJobId) {
      updateJobPost(editingJobId, jobData);
      showToast("✅ Job post edited successfully!");

    } else {
      createJobPost(jobData);
      showToast("✅ Job post published successfully!");

    }

    this.reset();
    editingJobId = null;
  });

  // Create Job Post
  function createJobPost(jobData) {
    const newJob = {
      id: Date.now(),
      ...jobData,
      date: new Date().toLocaleDateString(),
      status: "active"

    };

    currentCompany.jobs.push(newJob);
    renderJobPosts(currentCompany.jobs);

    addNotification(
      `New job posted: ${newJob.title}`,
      "accepted"
    );
  }

  // Update Job Post
  function updateJobPost(jobId, updatedData) {
    const jobIndex = currentCompany.jobs.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
      currentCompany.jobs[jobIndex] = {
        ...currentCompany.jobs[jobIndex],
        ...updatedData
      };
      renderJobPosts(currentCompany.jobs);

      addNotification(
        `Job post updated: ${updatedData.title}`,
        "accepted"
      );
    }
  }

  // Delete Job Post
  /*function deleteJobPost(jobId) {
    if (confirm('Are you sure you want to delete this job post?')) {
      const jobIndex = currentCompany.jobs.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        const deletedTitle = currentCompany.jobs[jobIndex].title;
        currentCompany.jobs.splice(jobIndex, 1);
        renderJobPosts(currentCompany.jobs);
        showToast("🗑️ Job post deleted.");

        addNotification(
          `Job post deleted: ${deletedTitle}`,
          "rejected"
        );
      }
    }
  }*/
function deleteJobPost(jobId) {
  jobToDeleteId = jobId;
  document.getElementById('confirmModal').style.display = 'flex';
}

function closeConfirmModal() {
  document.getElementById('confirmModal').style.display = 'none';
  jobToDeleteId = null;
}

window.closeConfirmModal = closeConfirmModal;

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
  if (jobToDeleteId !== null) {
    const jobIndex = currentCompany.jobs.findIndex(job => job.id === jobToDeleteId);
    if (jobIndex !== -1) {
      const deletedTitle = currentCompany.jobs[jobIndex].title;
      currentCompany.jobs.splice(jobIndex, 1);
      renderJobPosts(currentCompany.jobs);
      showToast("🗑️ Job post deleted.");
      addNotification(`Job post deleted: ${deletedTitle}`, "rejected");
    }
    closeConfirmModal();
  }
});

  // Edit Job Post
  function editJobPost(jobId) {
    const job = currentCompany.jobs.find(job => job.id === jobId);
    if (!job) return;

    editingJobId = jobId;

    // Fill form with job data
    document.getElementById('jobTitle').value = job.title;
    document.getElementById('jobDuration').value = job.duration;
    document.querySelector(`input[name="compensation"][value="${job.isPaid ? 'paid' : 'unpaid'}"]`).checked = true;
    document.getElementById('salary').value = job.salary;
    document.getElementById('skills').value = job.skills.join(', ');
    document.getElementById('description').value = job.description;

    // Scroll to form
    document.getElementById('jobPostForm').scrollIntoView({ behavior: 'smooth' });
  }

  // Render Job Posts (modified to work with search)
function renderJobPosts(jobs) {
  const container = document.getElementById('jobPostsList');
  container.innerHTML = '';

  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-post job-card';
    card.dataset.id = job.id;

    card.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.description}</p>
      <div class="job-post-actions" style="display: flex; gap: 10px; margin-top: 1rem;">
        <button class="btn-edit" onclick="editJobPost(${job.id})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn-delete" onclick="deleteJobPost(${job.id})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `;

    // Reapply consistent styles immediately to buttons in this card
    const buttons = card.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.classList.add('btn-primary');
      btn.style.minWidth = '120px';
      btn.style.padding = '10px 15px';
      btn.style.borderRadius = '6px';
    });

    container.appendChild(card);
  });

  // Final global re-apply (fallback in case of async DOM delay)
  setTimeout(() => {
    document.querySelectorAll('.btn-edit, .btn-delete').forEach(btn => {
      btn.classList.add('btn-primary');
      btn.style.minWidth = '120px';
      btn.style.padding = '10px 15px';
      btn.style.borderRadius = '6px';
    });
  }, 0);

   if (typeof FontAwesome !== 'undefined' && FontAwesome.dom && FontAwesome.dom.i2svg) {
    FontAwesome.dom.i2svg();  // Re-render icons after DOM change
  };
}

  // Navigation between pages
document.getElementById('viewInternshipsBtn').addEventListener('click', function () {
  showPage('internshipsPage');
  document.getElementById('registrationSection').style.display = 'none';
  loadInternshipApplications();

  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('backToJobsBtn').addEventListener('click', function () {
  showPage('companyDashboard');
  document.getElementById('registrationSection').style.display = 'none';
});

document.getElementById('viewInternshipsBtn').addEventListener('click', function() {
  document.getElementById('companyDashboard').style.display = 'none';
  document.getElementById('registrationSection').style.display = 'none';
  document.getElementById('internshipsPage').style.display = 'block';
  loadInternshipApplications();
});

  document.getElementById('backToJobsBtn').addEventListener('click', function() {
    document.getElementById('internshipsPage').style.display = 'none';
    document.getElementById('companyDashboard').style.display = 'block';
  });

  // Simulated applications data
 let applications = [
  {
    id: 1,
    jobId: 101,
    applicantName: "Ahmed Mohamed",
    applicantEmail: "ahmed@student.guc.edu.eg",
    applicationDate: "2023-05-15",
    status: "current intern",
    skills: ["JavaScript", "React", "HTML/CSS"],
    coverLetter: "I'm excited to apply for this position...",
    jobTitle: "Frontend Developer Intern"
  },
  {
    id: 2,
    jobId: 102,
    applicantName: "Mariam Ali",
    applicantEmail: "mariam@student.guc.edu.eg",
    applicationDate: "2023-05-16",
    status: "reviewed",
    skills: ["Python", "Django", "SQL"],
    coverLetter: "I have experience with backend development...",
    jobTitle: "Backend Developer Intern"
  },
  {
    id: 3,
    jobId: 103,
    applicantName: "Youssef Kamal",
    applicantEmail: "youssef@student.guc.edu.eg",
    applicationDate: "2023-06-01",
    status: "current intern",
    skills: ["Node.js", "MongoDB", "Express"],
    coverLetter: "Looking forward to contributing to your backend team...",
    jobTitle: "Backend Developer Intern"
  },
  {
    id: 4,
    jobId: 104,
    applicantName: "Farah Said",
    applicantEmail: "farah@student.guc.edu.eg",
    applicationDate: "2023-06-10",
    status: "internship complete",
    skills: ["UI/UX", "Figma", "Design Systems"],
    coverLetter: "Design is my passion...",
    jobTitle: "UI/UX Designer Intern"
  },
  {
    id: 5,
    jobId: 105,
    applicantName: "Omar Elsharkawy",
    applicantEmail: "omar@student.guc.edu.eg",
    applicationDate: "2023-06-15",
    status: "pending",
    skills: ["C++", "OOP", "Algorithms"],
    coverLetter: "I have a solid foundation in C++...",
    jobTitle: "Software Engineering Intern"
  }
];

let evaluations = {}; // appId -> evaluation text
let selectedEvalAppId = null;

  // Load applications
  function loadInternshipApplications() {
    const container = document.getElementById('applicationsList');
    container.innerHTML = applications.map(app => `
      <div class="application-card" data-id="${app.id}">
        <div class="application-header">
          <h3>${app.jobTitle}</h3>
          <span class="status-${app.status}">
            ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}
          </span>
        </div>
        <p><strong>Applicant:</strong> ${app.applicantName}</p>
        <p><strong>Applied on:</strong> ${app.applicationDate}</p>

        <div class="application-details">
          <div>
            <h4>Skills</h4>
            <ul>${app.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
          </div>
          <div>
            <h4>Cover Letter</h4>
            <p>${app.coverLetter}</p>
          </div>
        </div>

        <div class="application-actions">
        <button class="btn-primary" onclick="openModal(${app.id})">
  <i class="fas fa-user"></i> View Details
</button>
          <button class="btn-primary" onclick="updateApplicationStatus(${app.id}, 'reviewed')">
            <i class="fas fa-check"></i> Mark as Reviewed
          </button>
          <button class="btn-primary btn-delete" onclick="updateApplicationStatus(${app.id}, 'rejected')">
            <i class="fas fa-times"></i> Reject
          </button>
          <a href="mailto:${app.applicantEmail}" class="btn-secondary">
            <i class="fas fa-envelope"></i> Contact
          </a>

${(app.status === 'internship complete' && currentUserRole !== 'student') ? `
  <button class="btn-primary" onclick="openEvaluationModal(${app.id})">
    <i class="fas fa-star"></i> Evaluate
  </button>
` : ''}

        </div>
      </div>
    `).join('');
  }

  // Update application status
  function updateApplicationStatus(appId, newStatus) {
    const appIndex = applications.findIndex(a => a.id === appId);
    if (appIndex !== -1) {
      applications[appIndex].status = newStatus;
      loadInternshipApplications();

      // Simulate email notification
      const app = applications[appIndex];
      console.log(`Email sent to ${app.applicantEmail}: Your application for ${app.jobTitle} has been ${newStatus}`);

      // System notification
      addNotification(
        `Updated status for ${app.applicantName}'s application to ${newStatus}`,
        newStatus === 'rejected' ? 'rejected' : 'accepted'
      );
    }
  }

  // Make functions available globally
  window.editJobPost = editJobPost;
  window.deleteJobPost = deleteJobPost;
  window.updateApplicationStatus = updateApplicationStatus;
  window.clearSearch = clearSearch;

  // Toggle salary field visibility
  document.querySelectorAll('input[name="compensation"]').forEach(radio => {
    radio.addEventListener('change', function() {
      document.getElementById('salaryField').style.display =
        this.value === 'paid' ? 'block' : 'none';
    });
  });

const applicationCounts = {
    'internship-1': 5,
    'internship-2': 12,
    'internship-3': 8
};

function viewApplicationCount(postId) {
    const count = applicationCounts[postId] || 0;
    document.getElementById(`app-count-${postId}`).innerText =
        `Applications submitted: ${count}`;
}

window.viewApplicationCount = viewApplicationCount;
window.showAllApplications = showAllApplications;

document.getElementById('toggleApplicantsBtn')?.addEventListener('click', function () {
  const container = document.getElementById('applicantsContainer');
  container.classList.toggle('hidden');
  const isHidden = container.classList.contains('hidden');

  this.innerHTML = isHidden
    ? '<i class="fas fa-users"></i> Show Applicants'
    : '<i class="fas fa-users"></i> Hide Applicants';
});

const allApplications = [
    { name: 'Alice', post: 'internship-1' },
    { name: 'Bob', post: 'internship-2' },
    { name: 'Charlie', post: 'internship-1' }
];

function showAllApplications() {
    const list = document.getElementById('application-list');
    list.innerHTML = '';
    allApplications.forEach(app => {
        const item = document.createElement('li');
        item.textContent = `${app.name} - ${app.post}`;
        list.appendChild(item);
    });
}

window.viewApplicationCount = viewApplicationCount;
window.showAllApplications = showAllApplications;

function filterApplications() {
    const selected = document.getElementById('post-filter').value;
    const list = document.getElementById('application-list');
    list.innerHTML = '';
    allApplications
        .filter(app => !selected || app.post === selected)
        .forEach(app => {
            const item = document.createElement('li');
            item.textContent = `${app.name} - ${app.post}`;
            list.appendChild(item);
        });
}

let selectedApplicationId = null;

  function openModal(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    selectedApplicationId = appId;
    document.getElementById('modalName').innerText = `Name: ${app.applicantName}`;
    document.getElementById('modalEmail').innerText = `Email: ${app.applicantEmail}`;
    document.getElementById('modalSkills').innerText = `Skills: ${app.skills.join(', ')}`;
    document.getElementById('modalCoverLetter').innerText = `Cover Letter: ${app.coverLetter}`;
    document.getElementById('statusSelect').value = app.status;

    document.getElementById('applicantModal').style.display = 'flex';
  }

  function openEvaluationModal(appId) {
    if (currentUserRole === 'student') return; // deny access for students

  const app = applications.find(a => a.id === appId);
  if (!app) return;

  selectedEvalAppId = appId;
  document.getElementById('evalInternName').textContent = `Intern: ${app.applicantName}`;
  document.getElementById('evaluationText').value = evaluations[appId] || '';
  document.getElementById('evaluationModal').style.display = 'flex';
}

function closeEvaluationModal() {
  document.getElementById('evaluationModal').style.display = 'none';
  selectedEvalAppId = null;
}

function saveEvaluation() {
  const textArea = document.getElementById('evaluationText');
  const errorMsg = document.getElementById('evaluationError');
  const text = textArea.value.trim();

  if (!selectedEvalAppId) return;

  if (text === '') {
    errorMsg.style.display = 'block';
    textArea.style.borderColor = '#e53935';
    return;
  }

  // Clear error
  errorMsg.style.display = 'none';
  textArea.style.borderColor = '';

  evaluations[selectedEvalAppId] = text;
  closeEvaluationModal();
  showToast("✅ Evaluation saved!");
}


function deleteEvaluation() {
  if (!selectedEvalAppId) return;
  document.getElementById('deleteConfirmPopup').style.display = 'flex';
}
window.deleteEvaluation = deleteEvaluation;

function closeDeleteConfirm() {
  document.getElementById('deleteConfirmPopup').style.display = 'none';
}
window.closeDeleteConfirm = closeDeleteConfirm;

function confirmDeleteEvaluation() {
  if (!selectedEvalAppId) return;

  delete evaluations[selectedEvalAppId];
  closeDeleteConfirm();
  closeEvaluationModal();
  showToast("🗑️ Evaluation deleted.");
}
window.confirmDeleteEvaluation = confirmDeleteEvaluation;



function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000); // Hide after 3 seconds
}

window.openEvaluationModal = openEvaluationModal;
window.closeEvaluationModal = closeEvaluationModal;
window.saveEvaluation = saveEvaluation;
window.deleteEvaluation = deleteEvaluation;

// Make globally available
window.openEvaluationModal = openEvaluationModal;
window.closeEvaluationModal = closeEvaluationModal;

  function closeModal() {
    document.getElementById('applicantModal').style.display = 'none';
    selectedApplicationId = null;
  }

  function saveStatusChange() {
    const newStatus = document.getElementById('statusSelect').value;
    const index = applications.findIndex(app => app.id === selectedApplicationId);
    if (index !== -1) {
      applications[index].status = newStatus;
      closeModal();
      loadInternshipApplications();
      addNotification(
        `Status updated to "${newStatus}" for ${applications[index].applicantName}`,
        newStatus === 'rejected' ? 'rejected' : 'accepted'
      );
    }
  }

  window.openModal = openModal;
  window.closeModal = closeModal;
  window.saveStatusChange = saveStatusChange;

  // Internship filter/search
document.getElementById('internshipSearch').addEventListener('input', applyInternFilters);
document.getElementById('internStatusFilter').addEventListener('change', applyInternFilters);

function applyInternFilters() {
  const searchTerm = document.getElementById('internshipSearch').value.toLowerCase();
  const statusFilter = document.getElementById('internStatusFilter').value;

  const filtered = applications.filter(app => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm) ||
      app.jobTitle.toLowerCase().includes(searchTerm);

    const matchesStatus =
      !statusFilter || app.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // This renders full application cards
  renderFilteredApplications(filtered);
}

document.getElementById('clearInternSearch').addEventListener('click', function () {
  document.getElementById('internshipSearch').value = '';
  document.getElementById('internStatusFilter').value = '';
  applyInternFilters();
});

function clearInternshipFilters() {
  document.getElementById('internshipSearch').value = '';
  document.getElementById('internStatusFilter').value = '';
  applyInternFilters();
}

/*document.getElementById('backToRegistrationBtn').addEventListener('click', function () {
  document.getElementById('internshipsPage').style.display = 'none';
  document.getElementById('companyDashboard').style.display = 'none';

  // Restore form and/or success message
  document.getElementById('registrationSection').style.display = 'block';

  // Optional: show form if previously submitted
  const form = document.getElementById('registrationForm');
  const success = document.querySelector('.success-message');

  if (form && currentCompany && currentCompany.status !== "approved") {
    form.style.display = 'block';
    success.style.display = 'none';
  }
});*/

const backToRegistrationBtn = document.getElementById('backToRegistrationBtn');
if (backToRegistrationBtn) {
  backToRegistrationBtn.addEventListener('click', function () {
    document.getElementById('internshipsPage').style.display = 'none';
    document.getElementById('companyDashboard').style.display = 'none';

    // Restore form and/or success message
    document.getElementById('registrationSection').style.display = 'block';

    const form = document.getElementById('registrationForm');
    const success = document.querySelector('.success-message');

    if (form && currentCompany && currentCompany.status !== "approved") {
      form.style.display = 'block';
      success.style.display = 'none';
    }
  });
}

/*document.getElementById('viewCurrentInternsBtn').addEventListener('click', function () {
  showPage('internshipsPage');
  document.getElementById('registrationSection').style.display = 'none';

  setTimeout(() => {
    const statusFilter = document.getElementById('internStatusFilter');
    if (statusFilter) {
      statusFilter.value = 'current intern';
      applyInternFilters();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
});*/

const viewCurrentInternsBtn = document.getElementById('viewCurrentInternsBtn');
if (viewCurrentInternsBtn) {
  viewCurrentInternsBtn.addEventListener('click', function () {
    showPage('internshipsPage');
    document.getElementById('registrationSection').style.display = 'none';

    setTimeout(() => {
      const statusFilter = document.getElementById('internStatusFilter');
      if (statusFilter) {
        statusFilter.value = 'current intern';
        applyInternFilters();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  });
}

let pageHistory = [];

function showPage(sectionId) {
  const sections = ['registrationSection', 'companyDashboard', 'internshipsPage'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const currentVisible = sections.find(id => {
    const el = document.getElementById(id);
    return el && el.style.display === 'block';
  });

  if (currentVisible && currentVisible !== sectionId) {
    pageHistory.push(currentVisible);
  }

  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';
}

function showPage(sectionId) {
  const sections = ['registrationSection', 'companyDashboard', 'internshipsPage'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const currentVisible = sections.find(id => {
    const el = document.getElementById(id);
    return el && el.style.display === 'block';
  });

  if (currentVisible && currentVisible !== sectionId) {
    pageHistory.push(currentVisible);
  }

  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';

  // 🔽 ADD THIS BLOCK RIGHT HERE 🔽
  if (sectionId !== 'registrationSection') {
    const reg = document.getElementById('registrationSection');
    if (reg) reg.style.display = 'none';
  }
}

function goBackToRegistration() {
  // Hide everything else
  document.getElementById('companyDashboard').style.display = 'none';
  document.getElementById('internshipsPage').style.display = 'none';

  // Show the registration section
  document.getElementById('registrationSection').style.display = 'block';

  // Always show the form and hide success message (resetting)
  const form = document.getElementById('registrationForm');
  const successMsg = document.getElementById('registrationSuccessMessage');
  if (form) form.style.display = 'block';
  if (successMsg) successMsg.style.display = 'none';

  // Reset the form content
  form?.reset();

  // Optional: scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.goBackToRegistration = goBackToRegistration;

function goBack() {
  const previous = pageHistory.pop();
  if (previous) showPage(previous);
}
window.goBack = goBack;

});
