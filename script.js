// --- LOGIN LOGIC ---
function attemptLogin() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();
    let errorMsg = document.getElementById("error-msg");

    // 1. Get users registered in this browser
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // 2. Check for a match
    let foundUser = users.find(u => u.username === user && u.password === pass);

    // 3. Allow foundUser OR the default student
    if (foundUser || (user === "student1" && pass === "password123")) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("currentUser", user); 
        window.location.href = "dashboard.html";
    } else {
        errorMsg.style.display = "block";
        errorMsg.style.color = "red";
    }
}

// --- REGISTRATION LOGIC ---
function attemptRegister() {
    let user = document.getElementById("reg-username").value.trim();
    let pass = document.getElementById("reg-password").value.trim();
    let role = document.getElementById("reg-role").value;
    let msgElement = document.getElementById("reg-msg");

    if(user === "" || pass === "") {
        alert("Please fill in all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if taken
    if (users.find(u => u.username === user) || user === "student1") {
        msgElement.style.display = "block";
        msgElement.style.color = "red";
        msgElement.innerText = "Username already exists!";
        return;
    }

    // Save user locally
    users.push({ username: user, password: pass, role: role });
    localStorage.setItem("users", JSON.stringify(users));

    msgElement.style.display = "block";
    msgElement.style.color = "green";
    msgElement.innerText = "Registration Successful! Redirecting...";

    setTimeout(() => { window.location.href = "index.html"; }, 2000);
}

// --- DASHBOARD FUNCTIONS ---
function checkAuth() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }
}
function loadCourses() {
    checkAuth();

    const nameSpan = document.getElementById("user-name");
    if (nameSpan) {
        nameSpan.innerText = sessionStorage.getItem("currentUser") || "Student";
    }

    const courses = [
        { id: "CS101", title: "Java Programming", desc: "Basic to Advanced Java." },
        { id: "WD202", title: "Web Development", desc: "HTML, CSS, JS basics." }
    ];

    let container = document.getElementById("course-container");

    if (!container) {
        console.error("course-container not found ❌");
        return;
    }

    container.innerHTML = "";

    courses.forEach(course => {
        container.innerHTML += `
        <div style="border:1px solid #ccc; padding:15px; margin:10px;">
            <h3>${course.title}</h3>
            <p>${course.desc}</p>
            <button onclick="alert('Enrolled!')">Enroll</button>
        </div>
        `;
    });
}

function updateProgress(courseId) {
    let current = localStorage.getItem("progress_" + courseId) || 0;
    current = parseInt(current) + 10;

    if (current > 100) current = 100;

    localStorage.setItem("progress_" + courseId, current);

    loadCourses(); // refresh UI
}


function logout() {
    sessionStorage.clear(); // Ends the session
    window.location.href = "index.html";
}
