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
    
    // Function to show a section and update history
    function showSection(sectionId, updateHistory = true) {
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Show the requested section
        document.getElementById(sectionId).classList.add('active');
        
        // Update active nav item
        navItems.forEach(item => {
            const itemSection = item.getAttribute('data-section') + '-section';
            item.classList.toggle('active', itemSection === sectionId);
        });
        
        // Update browser history if needed
        if (updateHistory) {
            window.history.pushState({ sectionId }, '', `#${sectionId}`);
        }
    }
    
    // Handle sidebar navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section') + '-section';
            showSection(sectionId);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.sectionId) {
            showSection(event.state.sectionId, false);
        } else {
            // Default to dashboard if no state
            showSection('dashboard-section', false);
        }
    });
    
    // Handle initial load with hash
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1);
        const validSections = Array.from(sections).map(s => s.id);
        
        if (hash && validSections.includes(hash)) {
            showSection(hash, false);
        } else {
            // Initialize with dashboard
            showSection('dashboard-section', true);
        }
    }
    
    handleInitialLoad();

    // Form submission
    document.getElementById('cycleForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        alert(`Internship cycle set from ${startDate} to ${endDate}`);
    });

    // Sample Data
    const sampleData = {
        internships: [
            { id: 1, company: "TechCorp", title: "Software Developer", duration: "3 months", paid: true, industry: "Technology" },
            { id: 2, company: "FinanceBank", title: "Financial Analyst", duration: "6 months", paid: true, industry: "Finance" },
            { id: 3, company: "HealthPlus", title: "Medical Intern", duration: "2 months", paid: false, industry: "Healthcare" },
            { id: 4, company: "Vodafone", title: "Supply Chain Intern", duration: "2 months", paid: false, industry: "Supply Chain" },
            { id: 5, company: "Valu", title: "Frontend Intern", duration: "5 months", paid: true, industry: "Technology" }
        ],
        students: [
            { id: 1, name: "Ahmed Mohamed", status: "Applied", major: "BI", gpa: 2.4 },
            { id: 2, name: "Mariam Ali", status: "Internship Started", major: "EMS", gpa: 1.7 },
            { id: 3, name: "Youssef Ibrahim", status: "Pending", major: "Management", gpa: 3.2 },
            { id: 4, name: "Lina Samir", status: "Pending", major: "Applied Arts", gpa: 1.9 },
            { id: 5, name: "Ahmed Ali", status: "Internship Started", major: "MET", gpa: 1.5 }
        ],
        reports: [
            { id: 1, student: "Ahmed Mohamed", company: "TechCorp", status: "Pending", major: "CS" },
            { id: 2, student: "Mariam Ali", company: "FinanceBank", status: "Accepted", major: "EM" },
            { id: 3, student: "Youssef Ibrahim", company: "TechCorp", status: "Pending", major: "CS" },
            { id: 4, student: "Lina Samir", company: "HealthPlus", status: "Flagged", major: "EM" },
            { id: 5, student: "Ahmed Ali", company: "Valu", status: "Accepted", major: "MET" }
        ],
        workshops: [
            {
                id: 1,
                name: "Career Preparation Workshop",
                description: "Learn how to prepare for job interviews and build your professional profile",
                startDateTime: "2023-06-15T10:00",
                endDateTime: "2023-06-15T12:00",
                speakerBio: "John Smith with 10 years experience in HR at multinational companies",
                agenda: "1. Resume building\n2. Interview techniques\n3. Networking strategies"
            },
            {
                id: 2,
                name: "Technical Skills Workshop",
                description: "Hands-on session for improving your technical skills",
                startDateTime: "2023-06-20T14:00",
                endDateTime: "2023-06-20T17:00",
                speakerBio: "Dr. Sarah Johnson, Professor of Computer Science",
                agenda: "1. Coding best practices\n2. Debugging techniques\n3. Code optimization"
            }
        ]
    };


    let selectedCompanyId = null;


    // Workshop Management
    let editingWorkshopId = null;
    const workshopFormContainer = document.getElementById('workshopFormContainer');
    const workshopForm = document.getElementById('workshopForm');
    const addWorkshopBtn = document.getElementById('addWorkshopBtn');
    const cancelWorkshopBtn = document.getElementById('cancelWorkshopBtn');

    // Render Functions
    function renderWorkshops() {
        const container = document.getElementById('workshopList');
        
        if (sampleData.workshops.length === 0) {
            container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i> No workshops found</div>';
            return;
        }
        
        container.innerHTML = sampleData.workshops.map(workshop => `
            <div class="workshop-card">
                <h3>${workshop.name}</h3>
                <p class="date">${formatWorkshopDate(workshop.startDateTime)} - ${formatWorkshopTime(workshop.endDateTime)}</p>
                <p class="description">${workshop.description}</p>
                <div class="actions">
                    <button class="btn-primary edit-workshop" data-id="${workshop.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-secondary delete-workshop" data-id="${workshop.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }


    // Dummy companies data
sampleData.companies = [
    { id: 1, name: "TechCorp", industry: "Technology", description: "Leading tech solutions provider" },
    { id: 2, name: "FinanceBank", industry: "Finance", description: "Global banking services" },
    { id: 3, name: "HealthPlus", industry: "Healthcare", description: "Advanced medical research" },
    { id: 4, name: "LogiTrack", industry: "Supply Chain", description: "Innovative logistics platform" }
];

function renderCompanies() {
    const search = document.getElementById('companySearch').value.toLowerCase();
    const industry = document.getElementById('industryFilter').value;

    const filtered = sampleData.companies.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search);
        const matchesIndustry = industry === "" || c.industry === industry;
        return matchesSearch && matchesIndustry;
    });

    const container = document.getElementById('companyList');
    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i> No companies found</div>';
        return;
    }

    container.innerHTML = filtered.map(c => `
        <div class="internship-card">
            <h3>${c.name}</h3>
            <p><strong>Industry:</strong> ${c.industry}</p>
            <p>${c.description}</p>
            <button class="btn-secondary view-company" data-id="${c.id}">View Details</button>
            <button class="btn-primary accept-company" data-id="${c.id}">Accept</button>
            <button class="btn-secondary reject-company" data-id="${c.id}">Reject</button>
        </div>
    `).join('');
}


    function formatWorkshopDate(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    function formatWorkshopTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    function showWorkshopForm(workshop = null) {
        if (workshop) {
            editingWorkshopId = workshop.id;
            document.getElementById('workshopName').value = workshop.name;
            document.getElementById('workshopDescription').value = workshop.description;
            document.getElementById('startDateTime').value = workshop.startDateTime;
            document.getElementById('endDateTime').value = workshop.endDateTime;
            document.getElementById('speakerBio').value = workshop.speakerBio;
            document.getElementById('workshopAgenda').value = workshop.agenda;
        } else {
            editingWorkshopId = null;
            workshopForm.reset();
        }
        workshopFormContainer.style.display = 'block';
    }

    function hideWorkshopForm() {
        workshopFormContainer.style.display = 'none';
        editingWorkshopId = null;
    }

    function saveWorkshop(formData) {
        const workshop = {
            id: editingWorkshopId || sampleData.workshops.length + 1,
            name: formData.get('workshopName'),
            description: formData.get('workshopDescription'),
            startDateTime: formData.get('startDateTime'),
            endDateTime: formData.get('endDateTime'),
            speakerBio: formData.get('speakerBio'),
            agenda: formData.get('workshopAgenda')
        };

        if (editingWorkshopId) {
            // Update existing workshop
            const index = sampleData.workshops.findIndex(w => w.id === editingWorkshopId);
            if (index !== -1) {
                sampleData.workshops[index] = workshop;
            }
        } else {
            // Add new workshop
            sampleData.workshops.push(workshop);
        }

        renderWorkshops();
        hideWorkshopForm();
    }

    function deleteWorkshop(id) {
        if (confirm('Are you sure you want to delete this workshop?')) {
            sampleData.workshops = sampleData.workshops.filter(workshop => workshop.id !== id);
            renderWorkshops();
        }
    }

    // Workshop Event Listeners
    addWorkshopBtn.addEventListener('click', () => showWorkshopForm());
    cancelWorkshopBtn.addEventListener('click', hideWorkshopForm);

    workshopForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        saveWorkshop(formData);
    });

    document.addEventListener('click', function(e) {
        if (e.target.matches('.edit-workshop, .edit-workshop *')) {
            const btn = e.target.closest('.edit-workshop');
            const id = parseInt(btn.getAttribute('data-id'));
            const workshop = sampleData.workshops.find(w => w.id === id);
            if (workshop) showWorkshopForm(workshop);
        }

        if (e.target.matches('.delete-workshop, .delete-workshop *')) {
            const btn = e.target.closest('.delete-workshop');
            const id = parseInt(btn.getAttribute('data-id'));
            deleteWorkshop(id);
        }
    });

    // Other render functions (internships, students, reports) remain the same as before
    function renderInternships() {
        const searchTerm = document.getElementById('internshipSearch').value.toLowerCase();
        const industryFilter = document.getElementById('internshipFilter').value;
        
        const filtered = sampleData.internships.filter(int => {
            const matchesSearch = int.title.toLowerCase().includes(searchTerm) || 
                                 int.company.toLowerCase().includes(searchTerm);
            const matchesIndustry = industryFilter === '' || int.industry === industryFilter;
            return matchesSearch && matchesIndustry;
        });
        
        const container = document.getElementById('internshipList');
        
        if (filtered.length === 0) {
            container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i> No internships found</div>';
            return;
        }
        
        container.innerHTML = filtered.map(int => `
            <div class="internship-card">
                <h3>${int.title} at ${int.company}</h3>
                <p><strong>Industry:</strong> ${int.industry} • <strong>Duration:</strong> ${int.duration}</p>
                <p>${int.paid ? '💰 Paid position' : '❌ Unpaid position'}</p>
                <button class="btn-secondary view-details" data-id="${int.id}">
                    View Details
                </button>
            </div>
        `).join('');
    }

    function renderStudents() {
        const statusFilter = document.getElementById('studentStatusFilter').value;
        const filtered = sampleData.students.filter(student => 
            statusFilter === '' || student.status === statusFilter
        );
        
        const container = document.getElementById('studentTable');
        
        if (filtered.length === 0) {
            container.innerHTML = '<tr><td colspan="6" class="no-results"><i class="fas fa-search"></i> No students found</td></tr>';
            return;
        }
        
        container.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Major</th>
                <th>GPA</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            ${filtered.map(student => `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.major}</td>
                    <td>${student.gpa}</td>
                    <td class="status-${student.status.toLowerCase().replace(' ', '-')}">
                        ${student.status}
                    </td>
                    <td>
                        <button class="btn-secondary view-profile" data-id="${student.id}">
                            View Profile
                        </button>
                    </td>
                </tr>
            `).join('')}
        `;
    }

    function renderReports() {
        const statusFilter = document.getElementById('reportFilter').value;
        const filtered = sampleData.reports.filter(report => 
            statusFilter === '' || report.status === statusFilter
        );
        
        const container = document.getElementById('reportList');
        
        if (filtered.length === 0) {
            container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i> No reports found</div>';
            return;
        }
        
        container.innerHTML = filtered.map(report => `
            <div class="report-card status-${report.status.toLowerCase()}">
                <h3>${report.student}'s Report for ${report.company}</h3>
                <p><strong>Major:</strong> ${report.major}</p>
                <p>Status: <span class="status-badge">${report.status}</span></p>
                <button class="btn-primary view-report" data-id="${report.id}">
                    View Full Report
                </button>
            </div>
        `).join('');
    }

    // Event Listeners for Filters
    document.getElementById('internshipSearch').addEventListener('input', renderInternships);
    document.getElementById('internshipFilter').addEventListener('change', renderInternships);
    document.getElementById('studentStatusFilter').addEventListener('change', renderStudents);
    document.getElementById('reportFilter').addEventListener('change', renderReports);
    document.getElementById('companySearch').addEventListener('input', renderCompanies);
    document.getElementById('industryFilter').addEventListener('change', renderCompanies);
    renderCompanies();


    // Initial render
    renderInternships();
    renderStudents();
    renderReports();
    renderWorkshops();

    // Event delegation for dynamic buttons
    document.addEventListener('click', function(e) {
        // Handle view details button
        if (e.target.matches('.view-details, .view-details *')) {
            const btn = e.target.closest('.view-details');
            const id = btn.getAttribute('data-id');
            const internship = sampleData.internships.find(i => i.id == id);
            if (internship) {
                alert(`Internship Details\n\nTitle: ${internship.title}\nCompany: ${internship.company}\nDuration: ${internship.duration}\nIndustry: ${internship.industry}\nStatus: ${internship.paid ? 'Paid' : 'Unpaid'}`);
            }
        }
        
        // Handle view profile button
        if (e.target.matches('.view-profile, .view-profile *')) {
            const btn = e.target.closest('.view-profile');
            const id = btn.getAttribute('data-id');
            const student = sampleData.students.find(s => s.id == id);
            if (student) {
                alert(`Student Profile\n\nName: ${student.name}\nMajor: ${student.major}\nGPA: ${student.gpa}\nStatus: ${student.status}`);
            }
        }
        
        // Handle view report button
        if (e.target.matches('.view-report, .view-report *')) {
            const btn = e.target.closest('.view-report');
            const id = btn.getAttribute('data-id');
            const report = sampleData.reports.find(r => r.id == id);
            if (report) {
                alert(`Evaluation Report\n\nStudent: ${report.student}\nCompany: ${report.company}\nMajor: ${report.major}\nStatus: ${report.status}`);
            }
        }
        
        // Handle logout button
        if (e.target.id === 'logoutBtn' || e.target.closest('#logoutBtn')) {
            if (confirm('Are you sure you want to logout?')) {
                // Redirect to login page or perform logout
                window.location.href = 'login.html';
            }
        }

// View Company
if (e.target.matches('.view-company, .view-company *')) {
    const id = parseInt(e.target.closest('.view-company').dataset.id);
    const company = sampleData.companies.find(c => c.id === id);
    if (company) {
        selectedCompanyId = company.id;
        document.getElementById('modalCompanyName').textContent = company.name;
        document.getElementById('modalCompanyIndustry').textContent = company.industry;
        document.getElementById('modalCompanyDescription').textContent = company.description;
        document.getElementById('companyModal').style.display = 'flex';
        document.getElementById('companyActionMessage').textContent = "";
    }
}



// Accept Company
// Accept Company from card
if (e.target.matches('.accept-company, .accept-company *')) {
    const id = parseInt(e.target.closest('.accept-company').dataset.id);
    const company = sampleData.companies.find(c => c.id === id);
    if (company) {
        selectedCompanyId = company.id;
        document.getElementById('modalCompanyName').textContent = company.name;
        document.getElementById('modalCompanyIndustry').textContent = company.industry;
        document.getElementById('modalCompanyDescription').textContent = company.description;
        document.getElementById('companyActionMessage').textContent = `${company.name} has been accepted.`;
        document.getElementById('companyActionMessage').style.color = 'green';
        document.getElementById('companyModal').style.display = 'flex';
    }
}


// Reject Company
// Accept Company from card
if (e.target.matches('.accept-company, .accept-company *')) {
    const id = parseInt(e.target.closest('.accept-company').dataset.id);
    const company = sampleData.companies.find(c => c.id === id);
    if (company) {
        selectedCompanyId = company.id;
        document.getElementById('modalCompanyName').textContent = company.name;
        document.getElementById('modalCompanyIndustry').textContent = company.industry;
        document.getElementById('modalCompanyDescription').textContent = company.description;
        document.getElementById('companyActionMessage').textContent = "";
        document.getElementById('companyModal').style.display = 'flex';

    }  
  }  // Pre-fill modal with accept action


    });


    // Modal buttons
document.getElementById('closeCompanyModal').addEventListener('click', () => {
    document.getElementById('companyModal').style.display = 'none';
    selectedCompanyId = null;
    document.getElementById('companyActionMessage').textContent = "";
});


document.getElementById('acceptCompanyBtn').addEventListener('click', () => {
    const company = sampleData.companies.find(c => c.id === selectedCompanyId);
    if (company) {
        document.getElementById('companyActionMessage').textContent = `${company.name} has been accepted.`;
        document.getElementById('companyActionMessage').style.color = 'green';
    }
});

document.getElementById('rejectCompanyBtn').addEventListener('click', () => {
    const company = sampleData.companies.find(c => c.id === selectedCompanyId);
    if (company) {
        document.getElementById('companyActionMessage').textContent = `${company.name} has been rejected.`;
        document.getElementById('companyActionMessage').style.color = 'red';
    }
});





});
