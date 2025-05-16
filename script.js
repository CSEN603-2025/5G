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
  });

  // Search when pressing Enter
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });

  // Clear search
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    this.style.display = 'none';
    applyGlobalSearch('');
  });

  // Show/hide clear button
  searchInput.addEventListener('input', function() {
    clearBtn.style.display = this.value.length > 0 ? 'block' : 'none';
  });
}
// ===========================================================

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

     // Scroll to first match
    if (matches && searchTerm && filteredJobs.length === 0) {
      setTimeout(() => scrollToJob(job.id), 100);
    }
    
    return matches;
    renderJobPosts(filteredJobs);
  }

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
          <p>No matching applications found</p>
          <button class="btn-primary" onclick="clearSearch()">
            <i class="fas fa-times"></i> Clear search
          </button>
        </div>
      `;
      return;
    }
    container.innerHTML = apps.map(app => `
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
    
    // Simulate admin approval after 3 seconds
    setTimeout(() => {
      approveCompany();
    }, 3000);
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
  }

  function scrollToJob(jobId) {
    const jobElement = document.querySelector(`.job-post[data-id="${jobId}"]`);
    if (jobElement) {
      jobElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' // Scrolls to center of viewport
      });
      
      // Add temporary highlight
      jobElement.style.boxShadow = '0 0 0 3px var(--primary-light)';
      setTimeout(() => {
        jobElement.style.boxShadow = 'none';
      }, 2000);
    }
  }

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
    } else {
      createJobPost(jobData);
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
  function deleteJobPost(jobId) {
    if (confirm('Are you sure you want to delete this job post?')) {
      const jobIndex = currentCompany.jobs.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        const deletedTitle = currentCompany.jobs[jobIndex].title;
        currentCompany.jobs.splice(jobIndex, 1);
        renderJobPosts(currentCompany.jobs);
        
        addNotification(
          `Job post deleted: ${deletedTitle}`,
          "rejected"
        );
      }
    }
  }

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
  function renderJobPosts(jobs = currentCompany.jobs) {
    const container = document.getElementById('jobPostsList');
    if (!container) return;

    const searchTerm = document.getElementById('globalSearch')?.value.trim().toLowerCase() || '';
    const filteredJobs = searchTerm 
      ? jobs.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchTerm)))
      : jobs;

    if (filteredJobs.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>No matching job posts found</p>
          <button class="btn-primary" onclick="clearSearch()">
            <i class="fas fa-times"></i> Clear search
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredJobs.map(job => `
      <div class="job-post" data-id="${job.id}">
        <div class="job-post-header">
          <h3>${job.title}</h3>
          <span class="badge">${job.status}</span>
        </div>
        <p><strong>Duration:</strong> ${job.duration} months</p>
        <p><strong>Compensation:</strong> ${job.isPaid ? `Paid (${job.salary} EGP)` : 'Unpaid'}</p>
        <p><strong>Skills Required:</strong> ${job.skills.join(', ')}</p>
        <p>${job.description}</p>
        <div class="job-post-actions">
          <button class="btn-primary btn-edit" onclick="editJobPost(${job.id})">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn-primary btn-delete" onclick="deleteJobPost(${job.id})">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `).join('');
  }

  // Navigation between pages
  document.getElementById('viewInternshipsBtn').addEventListener('click', function() {
    document.getElementById('companyDashboard').style.display = 'none';
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
      status: "pending",
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
    }
  ];

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
});