
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // Dummy credentials
  const users = {
    "scadadmin": { password: "scad123", role: "scad" },
    "companyuser": { password: "comp456", role: "company" }
  };

  const user = users[username];

  if (user && user.password === password) {
    if (user.role === "scad") {
      window.location.href = "SCAD.html";
    } else if (user.role === "company") {
      window.location.href = "company.html";
    }
  } else {
    document.getElementById("loginError").style.display = "block";
  }
});
