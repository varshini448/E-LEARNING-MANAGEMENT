// ================= REGISTER =================
function attemptRegister() {
    const user = document.getElementById("reg-username").value.trim();
    const pass = document.getElementById("reg-password").value.trim();
    const role = document.getElementById("reg-role").value;

    const msg = document.getElementById("reg-msg");

    if (!user || !pass) {
        msg.style.display = "block";
        msg.style.color = "red";
        msg.innerText = "Fill all fields!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === user)) {
        msg.style.display = "block";
        msg.style.color = "red";
        msg.innerText = "Username already exists!";
        return;
    }

    users.push({ username: user, password: pass, role: role });

    localStorage.setItem("users", JSON.stringify(users));

    msg.style.display = "block";
    msg.style.color = "green";
    msg.innerText = "Registered! Redirecting...";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

// ================= LOGIN =================
function attemptLogin() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
        u => u.username === user && u.password === pass
    );

    if (foundUser) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("currentUser", user);

        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
}

// ================= AUTH CHECK =================
function checkAuth() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

// ================= LOGOUT =================
// --- LOGOUT LOGIC ---
function logout() {
    localStorage.clear();    // This removes the registered users
    sessionStorage.clear();   // This removes the "loggedIn" status
    window.location.href = "index.html"; // Sends them back to login
}

// ================= COURSES =================
// ================= DASHBOARD =================
function loadDashboard() {
    const user = sessionStorage.getItem("currentUser");
    document.getElementById("user-name").innerText = user;

    loadCourses();
    loadEnrolledCourses();
}

// COURSE LIST
const courses = [
    { title: "Java Programming", id: "CS101", desc: "Learn Java basics" },
    { title: "Web Development", id: "WD202", desc: "HTML, CSS, JS" },
    { title: "Data Structures", id: "DS303", desc: "Stacks, Queues, Trees" }
];

// LOAD ALL COURSES
function loadCourses() {
    let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

    const container = document.getElementById("course-container");
    container.innerHTML = "";

    courses.forEach(c => {
        let isEnrolled = enrolled.includes(c.id);

        container.innerHTML += `
        <div class="course-card">
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <button onclick="enrollCourse('${c.id}')">
                ${isEnrolled ? "Enrolled" : "Enroll"}
            </button>
        </div>`;
    });
}

// ENROLL FUNCTION
function enrollCourse(courseId) {
    let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

    if (!enrolled.includes(courseId)) {
        enrolled.push(courseId);
        localStorage.setItem("enrolled", JSON.stringify(enrolled));
        alert("Enrolled Successfully!");
    } else {
        alert("Already Enrolled");
    }

    loadCourses();
    loadEnrolledCourses();
}

// SHOW ENROLLED COURSES
function loadEnrolledCourses() {
    let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

    const container = document.getElementById("enrolled-container");
    container.innerHTML = "";

    if (enrolled.length === 0) {
        container.innerHTML = "<p>No courses enrolled</p>";
        return;
    }

    enrolled.forEach(id => {
        let course = courses.find(c => c.id === id);

        let progress = Math.floor(Math.random() * 100);

        container.innerHTML += `
        <div class="course-card">
            <h3>${course.title}</h3>
            <p>Progress: ${progress}%</p>
        </div>`;
    });
}
