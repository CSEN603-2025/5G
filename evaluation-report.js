document.addEventListener('DOMContentLoaded', function() {
  // Student data
  const studentData = {
    companyEvaluations: [],
    internshipReports: [
      {
        id: 1,
        title: "Summer Internship at TechCorp",
        company: "TechCorp",
        introduction: "During my summer internship at TechCorp, I worked as a software developer intern in the web development team. This experience provided me with valuable insights into professional software development practices and team collaboration in a corporate environment.",
        tasks: [
            "Developed responsive web components using React",
            "Fixed bugs in the company's main product",
            "Participated in daily stand-up meetings",
            "Wrote unit tests for new features",
            "Collaborated with UX designers to implement new interfaces"
        ],
        skills: [
            "Improved my React and Redux skills",
            "Learned about CI/CD pipelines",
            "Gained experience with Agile methodologies",
            "Improved my problem-solving skills",
            "Enhanced my teamwork and communication abilities"
        ],
        conclusion: "This internship was a valuable experience that helped me bridge the gap between academic knowledge and real-world software development. I gained confidence in my technical abilities and learned how to work effectively in a professional team environment. I'm grateful for the opportunity and look forward to applying what I've learned in future projects and career opportunities.",
        date: "2024-11-12"
      },
      {
        id: 2,
        title: "Winter Internship at DataSystems",
        company: "DataSystems",
        introduction: "My engineering internship at DataSystems focused on network infrastructure and telecommunications systems maintenance. This hands-on experience allowed me to apply my theoretical knowledge to real-world networking challenges.",
        tasks: [
            "Assisted in routine maintenance of network equipment",
            "Participated in site surveys for network expansion",
            "Helped troubleshoot connectivity issues",
            "Documented technical procedures and processes",
            "Assisted in network performance monitoring"
        ],
        skills: [
            "Gained hands-on experience with telecom hardware",
            "Learned network monitoring and diagnostic techniques",
            "Improved technical documentation skills",
            "Developed problem-solving approaches for network issues",
            "Enhanced my understanding of network security principles"
        ],
        conclusion: "This internship provided practical experience that complemented my theoretical knowledge. Working with experienced engineers gave me insights into real-world challenges in telecommunications infrastructure. The exposure to different network configurations and troubleshooting scenarios has significantly improved my technical skills and prepared me for future roles in network engineering.",
        date: "2024-01-10"
      }
    ],
    selectedFinalReportId: null,
    submittedFinalReport: null
  };

  // Show loading overlay
  function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }

  // Hide loading overlay
  function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }

  // Generate PDF for a report
  function generateReportPDF(reportId) {
    const report = studentData.internshipReports.find(r => r.id == reportId);
    if (!report) return;

    showLoading();
    
    // Use jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(5, 68, 94); // Primary dark color
    doc.text(report.title, 105, 20, { align: 'center' });
    
    // Add metadata
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Company: ${report.company}`, 105, 30, { align: 'center' });
    doc.text(`Date: ${new Date(report.date).toLocaleDateString()}`, 105, 36, { align: 'center' });
    
    // Add introduction
    doc.setFontSize(14);
    doc.setTextColor(5, 68, 94);
    doc.text('Introduction', 14, 50);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const introLines = doc.splitTextToSize(report.introduction, 180);
    doc.text(introLines, 14, 60);
    
    // Add tasks
    let yPosition = introLines.length * 6 + 70;
    doc.setFontSize(14);
    doc.setTextColor(5, 68, 94);
    doc.text('Tasks Performed', 14, yPosition);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    
    report.tasks.forEach(task => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text('• ' + task, 20, yPosition);
      yPosition += 7;
    });
    
    // Add skills
    yPosition += 5;
    doc.setFontSize(14);
    doc.setTextColor(5, 68, 94);
    doc.text('Skills Learned', 14, yPosition);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    
    report.skills.forEach(skill => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text('• ' + skill, 20, yPosition);
      yPosition += 7;
    });
    
    // Add conclusion
    yPosition += 5;
    doc.setFontSize(14);
    doc.setTextColor(5, 68, 94);
    doc.text('Conclusion', 14, yPosition);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    
    const conclusionLines = doc.splitTextToSize(report.conclusion, 180);
    doc.text(conclusionLines, 14, yPosition);
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
      doc.text('GUC Internship System', 200, 285, { align: 'right' });
    }
    
    // Save the PDF
    setTimeout(() => {
      doc.save(`${report.title.replace(/ /g, '_')}_Report.pdf`);
      hideLoading();
    }, 500);
  }

  // Load evaluations
  function loadEvaluations() {
    const container = document.getElementById('evaluationsContainer');
    
    if (studentData.companyEvaluations.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-star"></i>
          <p>No evaluations submitted yet</p>
        </div>
      `;
      return;
    }

    container.innerHTML = studentData.companyEvaluations.map(eval => `
      <div class="evaluation-item" data-id="${eval.id}">
        <div class="evaluation-header">
          <div>
            <h3>${eval.company}</h3>
            <p class="evaluation-date">${new Date(eval.date).toLocaleDateString()}</p>
          </div>
          <div class="evaluation-rating">
            ${'<i class="fas fa-star"></i>'.repeat(eval.rating)}
            ${'<i class="far fa-star"></i>'.repeat(5 - eval.rating)}
          </div>
        </div>
        <div class="evaluation-recommend">
          <strong>Recommend to others:</strong> ${eval.recommend ? 'Yes' : 'No'}
        </div>
        <div class="evaluation-comments">
          <p>${eval.comments}</p>
        </div>
        <div class="evaluation-actions">
          <button class="btn-primary edit-evaluation-btn" data-id="${eval.id}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn-secondary delete-evaluation-btn" data-id="${eval.id}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `).join('');
  }

  // Load reports
  function loadReports() {
    const container = document.getElementById('reportsContainer');
    
    if (studentData.internshipReports.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-file-alt"></i>
          <p>No reports created yet</p>
        </div>
      `;
      return;
    }

    container.innerHTML = studentData.internshipReports.map(report => `
      <div class="report-item" data-id="${report.id}">
        <div class="report-header">
          <h3>${report.title}</h3>
          <p class="report-meta">${report.company} • ${new Date(report.date).toLocaleDateString()}</p>
        </div>
        <div class="report-preview">
          <p>${report.introduction.substring(0, 100)}...</p>
        </div>
        <div class="report-actions">
          <button class="btn-primary view-report-btn" data-id="${report.id}">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="btn-primary edit-report-btn" data-id="${report.id}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn-secondary download-report-btn" data-id="${report.id}">
            <i class="fas fa-download"></i> PDF
          </button>
          <button class="btn-secondary delete-report-btn" data-id="${report.id}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `).join('');
  }

  // Load final report selection dropdown
  function loadFinalReportSelection() {
    const select = document.getElementById('selectFinalReport');
    
    // Clear existing options except the first one
    while (select.options.length > 1) {
      select.remove(1);
    }
    
    // Add reports to dropdown
    studentData.internshipReports.forEach(report => {
      const option = new Option(`${report.title} (${report.company})`, report.id);
      select.add(option);
    });
    
    // Update UI based on current selection
    updateFinalReportUI();
  }

  // Update final report UI elements
  function updateFinalReportUI() {
    const previewBtn = document.getElementById('previewFinalReportBtn');
    const submitBtn = document.getElementById('submitFinalReportBtn');
    const statusDiv = document.getElementById('submissionStatus');
    
    const hasSelection = studentData.selectedFinalReportId !== null;
    const isSubmitted = studentData.submittedFinalReport !== null;
    
    previewBtn.disabled = !hasSelection || isSubmitted;
    submitBtn.disabled = !hasSelection || isSubmitted;
    
    if (isSubmitted) {
      statusDiv.innerHTML = `
        <div class="submission-status success">
          <i class="fas fa-check-circle"></i> 
          Final report submitted: ${studentData.submittedFinalReport.title}
        </div>
      `;
    } else if (hasSelection) {
      const selectedReport = studentData.internshipReports.find(
        r => r.id == studentData.selectedFinalReportId
      );
      statusDiv.innerHTML = `
        <div class="submission-status info">
          <i class="fas fa-info-circle"></i> 
          Selected report: <strong>${selectedReport.title}</strong>
        </div>
      `;
    } else {
      statusDiv.innerHTML = studentData.internshipReports.length > 0 ? `
        <div class="submission-status">
          <i class="fas fa-exclamation-circle"></i> 
          Please select a report to submit
        </div>
      ` : `
        <div class="submission-status">
          <i class="fas fa-exclamation-circle"></i> 
          No reports available
        </div>
      `;
    }
  }

  // Show evaluation form
  function showEvaluationForm(evaluation = null) {
    const container = document.getElementById('evaluationFormContainer');
    
    container.innerHTML = `
      <h3><i class="fas fa-edit"></i> ${evaluation ? 'Edit Evaluation' : 'New Evaluation'}</h3>
      <form id="evaluationForm" ${evaluation ? `data-id="${evaluation.id}"` : ''}>
        <div class="form-group">
          <label for="evaluationCompany">Company Name *</label>
          <input type="text" id="evaluationCompany" value="${evaluation ? evaluation.company : ''}" required>
        </div>
        
        <div class="form-group">
          <label>Rating *</label>
          <div class="rating-stars">
            ${[1, 2, 3, 4, 5].map(i => `
              <i class="${evaluation && i <= evaluation.rating ? 'fas' : 'far'} fa-star" data-rating="${i}"></i>
            `).join('')}
          </div>
          <input type="hidden" id="evaluationRating" value="${evaluation ? evaluation.rating : 0}" required>
        </div>
        
        <div class="form-group">
          <label>Would you recommend this company? *</label>
          <div class="recommend-options">
            <label>
              <input type="radio" name="recommend" value="yes" 
                ${evaluation && evaluation.recommend ? 'checked' : ''} required> Yes
            </label>
            <label>
              <input type="radio" name="recommend" value="no"
                ${evaluation && !evaluation.recommend ? 'checked' : ''}> No
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="evaluationComments">Comments *</label>
          <textarea id="evaluationComments" required>${evaluation ? evaluation.comments : ''}</textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-primary">
            <i class="fas fa-save"></i> Save
          </button>
          <button type="button" class="btn-secondary" id="cancelEvaluationBtn">
            Cancel
          </button>
        </div>
      </form>
    `;
    
    container.style.display = 'block';
    document.getElementById('addEvaluationBtn').style.display = 'none';
    
    // Setup star rating interaction
    document.querySelectorAll('.rating-stars i').forEach(star => {
      star.addEventListener('click', function() {
        const rating = parseInt(this.dataset.rating);
        document.getElementById('evaluationRating').value = rating;
        
        // Update star display
        document.querySelectorAll('.rating-stars i').forEach((s, i) => {
          s.classList.toggle('fas', i < rating);
          s.classList.toggle('far', i >= rating);
        });
      });
    });
  }

  // Show report form
  function showReportForm(report = null) {
    const container = document.getElementById('reportFormContainer');
    
    container.innerHTML = `
      <h3><i class="fas fa-edit"></i> ${report ? 'Edit Report' : 'New Report'}</h3>
      <form id="reportForm" ${report ? `data-id="${report.id}"` : ''}>
        <div class="form-group">
          <label for="reportTitle">Title *</label>
          <input type="text" id="reportTitle" value="${report ? report.title : ''}" required>
        </div>
        
        <div class="form-group">
          <label for="reportCompany">Company *</label>
          <input type="text" id="reportCompany" value="${report ? report.company : ''}" required>
        </div>
        
        <div class="form-group">
          <label for="reportIntroduction">Introduction *</label>
          <textarea id="reportIntroduction" required>${report ? report.introduction : ''}</textarea>
        </div>
        
        <div class="form-group">
          <label for="reportTasks">Tasks (one per line) *</label>
          <textarea id="reportTasks" required>${report ? report.tasks.join('\n') : ''}</textarea>
        </div>
        
        <div class="form-group">
          <label for="reportSkills">Skills Learned (one per line) *</label>
          <textarea id="reportSkills" required>${report ? report.skills.join('\n') : ''}</textarea>
        </div>
        
        <div class="form-group">
          <label for="reportConclusion">Conclusion *</label>
          <textarea id="reportConclusion" required>${report ? report.conclusion : ''}</textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-primary">
            <i class="fas fa-save"></i> Save
          </button>
          <button type="button" class="btn-secondary" id="cancelReportBtn">
            Cancel
          </button>
        </div>
      </form>
    `;
    
    container.style.display = 'block';
    document.getElementById('addReportBtn').style.display = 'none';
  }

  // Show report in modal
  function showReportModal(reportId) {
    const report = studentData.internshipReports.find(r => r.id == reportId);
    if (!report) return;
    
    document.getElementById('modalReportTitle').textContent = report.title;
    document.getElementById('modalReportMeta').textContent = `${report.company} • ${new Date(report.date).toLocaleDateString()}`;
    document.getElementById('modalReportIntro').textContent = report.introduction;
    
    // Clear previous tasks and skills
    const tasksList = document.getElementById('modalReportTasks');
    const skillsList = document.getElementById('modalReportSkills');
    tasksList.innerHTML = '';
    skillsList.innerHTML = '';
    
    // Add tasks
    report.tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      tasksList.appendChild(li);
    });
    
    // Add skills
    report.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });
    
    document.getElementById('modalReportConclusion').textContent = report.conclusion;
    
    document.getElementById('reportModal').style.display = 'block';
  }

  // Setup event listeners
  function setupEventListeners() {
    // Add evaluation button
    document.getElementById('addEvaluationBtn').addEventListener('click', () => {
      showEvaluationForm();
    });
    
    // Cancel evaluation form
    document.addEventListener('click', function(e) {
      if (e.target.closest('#cancelEvaluationBtn')) {
        document.getElementById('evaluationFormContainer').style.display = 'none';
        document.getElementById('addEvaluationBtn').style.display = 'block';
      }
    });
    
    // Evaluation form submission
    document.addEventListener('submit', function(e) {
      if (e.target.closest('#evaluationForm')) {
        e.preventDefault();
        showLoading();
        
        const form = e.target;
        const company = document.getElementById('evaluationCompany').value;
        
        // Check if evaluation already exists for this company
        if (!form.dataset.id && studentData.companyEvaluations.some(e => e.company === company)) {
          hideLoading();
          alert('You have already submitted an evaluation for this company. You can only submit one evaluation per company.');
          return;
        }
        
        const evaluation = {
          id: form.dataset.id || Date.now(),
          company: company,
          rating: parseInt(document.getElementById('evaluationRating').value),
          recommend: document.querySelector('input[name="recommend"]:checked').value === 'yes',
          comments: document.getElementById('evaluationComments').value,
          date: new Date().toISOString()
        };
        
        // Update or add evaluation
        if (form.dataset.id) {
          const index = studentData.companyEvaluations.findIndex(e => e.id == form.dataset.id);
          studentData.companyEvaluations[index] = evaluation;
        } else {
          studentData.companyEvaluations.push(evaluation);
        }
        
        // Simulate API call delay
        setTimeout(() => {
          loadEvaluations();
          document.getElementById('evaluationFormContainer').style.display = 'none';
          document.getElementById('addEvaluationBtn').style.display = 'block';
          hideLoading();
        }, 500);
      }
    });
    
    // Add report button
    document.getElementById('addReportBtn').addEventListener('click', () => {
      showReportForm();
    });
    
    // Cancel report form
    document.addEventListener('click', function(e) {
      if (e.target.closest('#cancelReportBtn')) {
        document.getElementById('reportFormContainer').style.display = 'none';
        document.getElementById('addReportBtn').style.display = 'block';
      }
    });
    
    // Report form submission
    document.addEventListener('submit', function(e) {
      if (e.target.closest('#reportForm')) {
        e.preventDefault();
        showLoading();
        
        const form = e.target;
        const tasks = document.getElementById('reportTasks').value.split('\n').filter(task => task.trim() !== '');
        const skills = document.getElementById('reportSkills').value.split('\n').filter(skill => skill.trim() !== '');
        
        const report = {
          id: form.dataset.id || Date.now(),
          title: document.getElementById('reportTitle').value,
          company: document.getElementById('reportCompany').value,
          introduction: document.getElementById('reportIntroduction').value,
          tasks: tasks,
          skills: skills,
          conclusion: document.getElementById('reportConclusion').value,
          date: new Date().toISOString()
        };
        
        // Update or add report
        if (form.dataset.id) {
          const index = studentData.internshipReports.findIndex(r => r.id == form.dataset.id);
          studentData.internshipReports[index] = report;
        } else {
          studentData.internshipReports.push(report);
        }
        
        // Simulate API call delay
        setTimeout(() => {
          loadReports();
          loadFinalReportSelection();
          document.getElementById('reportFormContainer').style.display = 'none';
          document.getElementById('addReportBtn').style.display = 'block';
          hideLoading();
        }, 500);
      }
    });
    
    // Evaluation actions
    document.addEventListener('click', function(e) {
      if (e.target.closest('.edit-evaluation-btn')) {
        const evalId = e.target.closest('button').dataset.id;
        const evaluation = studentData.companyEvaluations.find(e => e.id == evalId);
        showEvaluationForm(evaluation);
      }
      
      if (e.target.closest('.delete-evaluation-btn')) {
        if (confirm('Are you sure you want to delete this evaluation?')) {
          showLoading();
          const evalId = e.target.closest('button').dataset.id;
          studentData.companyEvaluations = studentData.companyEvaluations.filter(e => e.id != evalId);
          
          setTimeout(() => {
            loadEvaluations();
            hideLoading();
          }, 300);
        }
      }
    });
    
    // Report actions
    document.addEventListener('click', function(e) {
      if (e.target.closest('.view-report-btn')) {
        const reportId = e.target.closest('button').dataset.id;
        showReportModal(reportId);
      }
      
      if (e.target.closest('.edit-report-btn')) {
        const reportId = e.target.closest('button').dataset.id;
        const report = studentData.internshipReports.find(r => r.id == reportId);
        showReportForm(report);
      }
      
      if (e.target.closest('.download-report-btn')) {
        const reportId = e.target.closest('button').dataset.id;
        generateReportPDF(reportId);
      }
      
      if (e.target.closest('.delete-report-btn')) {
        if (confirm('Are you sure you want to delete this report?')) {
          showLoading();
          const reportId = e.target.closest('button').dataset.id;
          studentData.internshipReports = studentData.internshipReports.filter(r => r.id != reportId);
          
          setTimeout(() => {
            loadReports();
            loadFinalReportSelection();
            hideLoading();
          }, 300);
        }
      }
    });
    
    // Close modals
    document.getElementById('closeReportModal').addEventListener('click', function() {
      document.getElementById('reportModal').style.display = 'none';
    });
    
    document.getElementById('closeFinalReportModal').addEventListener('click', function() {
      document.getElementById('finalReportModal').style.display = 'none';
    });
    
    // Final report selection
    document.getElementById('selectFinalReport').addEventListener('change', function() {
      studentData.selectedFinalReportId = this.value ? parseInt(this.value) : null;
      updateFinalReportUI();
    });
    
    // Preview final report button
    document.getElementById('previewFinalReportBtn').addEventListener('click', function() {
      if (!studentData.selectedFinalReportId) return;
      
      const report = studentData.internshipReports.find(
        r => r.id == studentData.selectedFinalReportId
      );
      
      if (report) {
        showReportModal(report.id);
      }
    });
    
    // Submit final report button
    document.getElementById('submitFinalReportBtn').addEventListener('click', function() {
      if (!studentData.selectedFinalReportId) return;
      
      const report = studentData.internshipReports.find(
        r => r.id == studentData.selectedFinalReportId
      );
      
      if (report) {
        // Show confirmation modal
        document.getElementById('finalReportTitlePreview').textContent = report.title;
        document.getElementById('finalReportCompanyPreview').textContent = `Company: ${report.company}`;
        document.getElementById('finalReportDatePreview').textContent = `Created: ${new Date(report.date).toLocaleDateString()}`;
        document.getElementById('finalReportModal').style.display = 'block';
      }
    });
    
    // Confirm submission button
    document.getElementById('confirmSubmitBtn').addEventListener('click', function() {
      const report = studentData.internshipReports.find(
        r => r.id == studentData.selectedFinalReportId
      );
      
      if (report) {
        showLoading();
        
        // Simulate submission
        setTimeout(() => {
          studentData.submittedFinalReport = {
            ...report,
            submissionDate: new Date().toISOString()
          };
          
          document.getElementById('finalReportModal').style.display = 'none';
          updateFinalReportUI();
          hideLoading();
          
          alert('Final report submitted successfully!');
        }, 1000);
      }
    });
    
    // Cancel submission button
    document.getElementById('cancelSubmitBtn').addEventListener('click', function() {
      document.getElementById('finalReportModal').style.display = 'none';
    });
  }

  // Initialize the page
  function init() {
    showLoading();
    
    // Simulate loading data
    setTimeout(() => {
      loadEvaluations();
      loadReports();
      loadFinalReportSelection();
      setupEventListeners();
      hideLoading();
    }, 800);
  }

  init();
});