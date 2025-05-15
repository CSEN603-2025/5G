document.addEventListener('DOMContentLoaded', function() {
    // Time display
    function updateTime() {
        const now = new Date();
        document.getElementById('currentTime').textContent = now.toLocaleString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    const navItems = document.querySelectorAll('.sidebar li');
    const sections = document.querySelectorAll('.section');
    
    // Navigation functions
    function showSection(sectionId, updateHistory = true) {
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
        
        navItems.forEach(item => {
            const itemSection = item.getAttribute('data-section') + '-section';
            item.classList.toggle('active', itemSection === sectionId);
        });
        
        if (updateHistory) {
            window.history.pushState({ sectionId }, '', `#${sectionId}`);
        }
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section') + '-section';
            showSection(sectionId);
        });
    });
    
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.sectionId) {
            showSection(event.state.sectionId, false);
        } else {
            showSection('dashboard-section', false);
        }
    });
    
    // Handle initial load
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1);
        const validSections = Array.from(sections).map(s => s.id);
        showSection(hash && validSections.includes(hash) ? hash : 'dashboard-section', !hash);
    }
    
    handleInitialLoad();

    // Sample Data (same as SCAD)
    const sampleData = {
        reports: [
            { 
                id: 1, 
                student: "Ahmed Mohamed", 
                company: "TechCorp", 
                status: "Pending", 
                major: "BI",
                introduction: "During my internship at TechCorp, I worked as a software developer intern in the web development team. This report summarizes my experience and learnings.",
                tasks: [
                    "Developed responsive web components using React",
                    "Fixed bugs in the company's main product",
                    "Participated in daily stand-up meetings",
                    "Wrote unit tests for new features"
                ],
                skills: [
                    "Improved my React and Redux skills",
                    "Learned about CI/CD pipelines",
                    "Gained experience with Agile methodologies",
                    "Improved my problem-solving skills"
                ],
                conclusion: "This internship was a valuable experience that helped me bridge the gap between academic knowledge and real-world software development. I'm grateful for the opportunity and look forward to applying what I've learned in future projects."
            },
            { 
                id: 2, 
                student: "Mariam Ali", 
                company: "FinanceBank", 
                status: "Accepted", 
                major: "EMS",
                introduction: "My internship at FinanceBank provided me with hands-on experience in financial analysis and market research.",
                tasks: [
                    "Analyzed financial statements of client companies",
                    "Prepared reports on market trends",
                    "Assisted in creating financial models",
                    "Participated in client meetings"
                ],
                skills: [
                    "Improved Excel and financial modeling skills",
                    "Learned about financial regulations",
                    "Gained presentation skills",
                    "Improved analytical thinking"
                ],
                conclusion: "The internship exceeded my expectations and confirmed my interest in pursuing a career in finance. I particularly enjoyed the analytical aspects of the work."
            },
            { 
                id: 3, 
                student: "Youssef Ibrahim", 
                company: "Valu", 
                status: "Flagged", 
                major: "Management",
                introduction: "My internship at Valu as a management trainee gave me exposure to various business operations and strategic decision-making processes.",
                tasks: [
                    "Assisted in market research for new product lines",
                    "Participated in cross-departmental coordination meetings",
                    "Analyzed customer feedback data",
                    "Helped prepare business presentations for stakeholders"
                ],
                skills: [
                    "Developed strategic planning abilities",
                    "Improved data analysis skills using business intelligence tools",
                    "Enhanced team coordination and leadership skills",
                    "Gained understanding of product lifecycle management"
                ],
                conclusion: "This internship provided a comprehensive view of business management in a tech startup environment. The hands-on experience with strategic decision-making was particularly valuable for my career development."
            }
        ]
    };

    // Render functions
    function renderReports() {
        const statusFilter = document.getElementById('reportFilter').value;
        const filtered = sampleData.reports.filter(report => 
            statusFilter === '' || report.status === statusFilter
        );
        
        const container = document.getElementById('reportList');
        
        if (filtered.length === 0) {
            container.innerHTML = '<div class="no-results">No reports found matching your criteria</div>';
            return;
        }
        
        container.innerHTML = filtered.map(report => `
            <div class="report-card status-${report.status.toLowerCase()}">
                <h3>${report.student}'s Report</h3>
                <p><strong>Company:</strong> ${report.company}</p>
                <p><strong>Major:</strong> ${report.major}</p>
                <p><strong>Status:</strong> <span class="status-badge">${report.status}</span></p>
                <button class="btn-primary view-report" data-id="${report.id}">
                    <i class="fas fa-eye"></i> View Details
                </button>
            </div>
        `).join('');
    }

    function renderStatistics() {
        const stats = {
            total: sampleData.reports.length,
            accepted: sampleData.reports.filter(r => r.status === "Accepted").length,
            pending: sampleData.reports.filter(r => r.status === "Pending").length,
            flagged: sampleData.reports.filter(r => r.status === "Flagged").length,
            averageTime: "2.5 days",
            topCourses: ["BI", "EMS", "Management"],
            topCompanies: ["TechCorp", "FinanceBank", "Valu"]
        };

        document.getElementById("statisticsList").innerHTML = `
            <li><strong>Total Reports:</strong> ${stats.total}</li>
            <li><strong>Accepted:</strong> ${stats.accepted}</li>
            <li><strong>Pending Review:</strong> ${stats.pending}</li>
            <li><strong>Flagged:</strong> ${stats.flagged}</li>
            <li><strong>Average Review Time:</strong> ${stats.averageTime}</li>
            <li><strong>Top Majors:</strong> ${stats.topCourses.join(", ")}</li>
            <li><strong>Top Companies:</strong> ${stats.topCompanies.join(", ")}</li>
        `;
    }

    // Event listeners
    document.getElementById('reportFilter').addEventListener('change', renderReports);

    document.addEventListener('click', function(e) {
        // View report details
        if (e.target.closest('.view-report')) {
            const btn = e.target.closest('.view-report');
            const id = parseInt(btn.dataset.id);
            const report = sampleData.reports.find(r => r.id === id);
            
            if (report) {
                document.getElementById('modalReportTitle').textContent = `${report.student}'s Report - ${report.company}`;
                document.getElementById('modalReportIntroduction').textContent = report.introduction;
                document.getElementById('modalReportTasks').innerHTML = report.tasks.map(t => `<li>${t}</li>`).join('');
                document.getElementById('modalReportSkills').innerHTML = report.skills.map(s => `<li>${s}</li>`).join('');
                document.getElementById('modalReportConclusion').textContent = report.conclusion;
                document.getElementById('modalReportStatus').textContent = report.status;
                document.getElementById('modalReportStatus').className = `status-${report.status.toLowerCase()}`;
                
                // Setup PDF download
                document.getElementById('downloadSingleReportBtn').onclick = function() {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();
                    
                    doc.setFontSize(16);
                    doc.text(`${report.student}'s Internship Report`, 15, 20);
                    
                    let y = 30;
                    const addText = (text, isBold = false) => {
                        if (isBold) doc.setFont(undefined, 'bold');
                        doc.text(text, 15, y);
                        if (isBold) doc.setFont(undefined, 'normal');
                        y += 10;
                    };
                    
                    addText(`Company: ${report.company}`);
                    addText(`Major: ${report.major}`);
                    addText(`Status: ${report.status}`);
                    addText(' ', false);
                    addText('Introduction', true);
                    doc.text(report.introduction, 15, y, { maxWidth: 180 });
                    y += doc.splitTextToSize(report.introduction, 180).length * 7;
                    
                    addText('Tasks Performed', true);
                    report.tasks.forEach(task => {
                        doc.text(`• ${task}`, 20, y, { maxWidth: 165 });
                        y += doc.splitTextToSize(task, 165).length * 7;
                    });
                    
                    addText('Skills Learned', true);
                    report.skills.forEach(skill => {
                        doc.text(`• ${skill}`, 20, y, { maxWidth: 165 });
                        y += doc.splitTextToSize(skill, 165).length * 7;
                    });
                    
                    addText('Conclusion', true);
                    doc.text(report.conclusion, 15, y, { maxWidth: 180 });
                    
                    doc.save(`${report.student.replace(/\s+/g, '_')}_Report.pdf`);
                };
                
                document.getElementById('reportModal').style.display = 'flex';
            }
        }
        
        // Logout button
        if (e.target.closest('#logoutBtn')) {
            document.getElementById('logoutModal').style.display = 'flex';
        }
    });

    // Modal close buttons
    document.getElementById('closeReportModal').addEventListener('click', () => {
        document.getElementById('reportModal').style.display = 'none';
    });

    document.getElementById('cancelLogoutBtn').addEventListener('click', () => {
        document.getElementById('logoutModal').style.display = 'none';
    });

    // Confirm logout
    document.getElementById('confirmLogoutBtn').addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // Submit clarification
    document.getElementById('submitClarificationBtn').addEventListener('click', function() {
        const comment = document.getElementById('clarificationComment').value.trim();
        const statusEl = document.getElementById('clarificationStatus');
        
        if (comment) {
            statusEl.textContent = "Clarification submitted successfully!";
            statusEl.style.color = "#155724";
            statusEl.style.backgroundColor = "#d4edda";
            document.getElementById('clarificationComment').value = "";
            
            // In a real app, you would send this to the server
            setTimeout(() => {
                statusEl.textContent = "";
                statusEl.style.backgroundColor = "transparent";
            }, 3000);
        } else {
            statusEl.textContent = "Please enter your clarification before submitting.";
            statusEl.style.color = "#721c24";
            statusEl.style.backgroundColor = "#f8d7da";
        }
    });

    // Generate statistics PDF
    document.getElementById('generateReportBtn').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Internship Report Statistics', 15, 20);
        doc.setFontSize(12);
        
        let y = 30;
        const stats = document.querySelectorAll('#statisticsList li');
        stats.forEach(stat => {
            doc.text(stat.textContent, 15, y);
            y += 10;
        });
        
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, y + 10);
        doc.save('Internship_Statistics.pdf');
    });

    // Initial render
    renderReports();
    renderStatistics();
});
// Add this to your existing JavaScript
document.getElementById('closeReportModal').addEventListener('click', function() {
    document.getElementById('reportModal').style.display = 'none';
});

// Update the modal show function
function showReportModal(report) {
    document.getElementById('modalReportTitle').textContent = 
        `${report.student}'s Report - ${report.company}`;
    document.getElementById('modalReportIntroduction').textContent = report.introduction;
    
    const tasksList = document.getElementById('modalReportTasks');
    tasksList.innerHTML = report.tasks.map(task => `<li>${task}</li>`).join('');
    
    const skillsList = document.getElementById('modalReportSkills');
    skillsList.innerHTML = report.skills.map(skill => `<li>${skill}</li>`).join('');
    
    document.getElementById('modalReportConclusion').textContent = report.conclusion;
    document.getElementById('modalReportStatus').textContent = report.status;
    document.getElementById('modalReportStatus').className = `status-badge status-${report.status.toLowerCase()}`;
    
    // Reset and show modal
    document.getElementById('clarificationComment').value = '';
    document.getElementById('clarificationStatus').textContent = '';
    document.getElementById('reportModal').style.display = 'flex';
    document.getElementById('modal-content').scrollTo(0, 0);
}

// Update your existing view report click handler to use showReportModal
document.querySelectorAll('.view-report').forEach(btn => {
    btn.addEventListener('click', function() {
        const reportId = parseInt(this.getAttribute('data-id'));
        const report = sampleReports.find(r => r.id === reportId);
        if (report) showReportModal(report);
    });
});
// Add this to your existing JavaScript
function updateCurrentTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString() + ' • ' + now.toLocaleDateString();
}

// Update time every second
setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // Initial call