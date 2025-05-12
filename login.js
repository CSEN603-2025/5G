document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // Dummy credentials with roles
  const users = {
    "scadadmin": { password: "scad123", role: "scad" },
    "companyuser": { password: "comp456", role: "company" },
    "student1": { password: "stud123", role: "student1" }, // Redirect to pro-student2.html
    "student2": { password: "stud456", role: "student2" }  // Redirect to PROSTUDENT.html
  };

  const user = users[username];

  if (user && user.password === password) {
    switch (user.role) {
      case "scad":
        window.location.href = "SCAD.html";
        break;
      case "company":
        window.location.href = "company.html";
        break;
      case "student1":
        window.location.href = "pro-student2.html";
        break;
      case "student2":
        window.location.href = "PROSTUDENT.html";
        break;
    }
  } else {
    document.getElementById("loginError").style.display = "block";
  }
});
