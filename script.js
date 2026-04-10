// ================= HELPERS =================
function hashPassword(password) {
    return btoa(password);
}

function showToast(msg, color = "green") {
    let toast = document.createElement("div");
    toast.innerText = msg;
    toast.className = "toast";
    toast.style.background = color;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

// ================= REGISTER =================
function attemptRegister() {
    const user = document.getElementById("reg-username").value.trim();
    const pass = document.getElementById("reg-password").value.trim();
    const role = document.getElementById("reg-role").value;
    const msg = document.getElementById("reg-msg");

    if (!user || !pass) {
        msg.innerText = "Fill all fields!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === user)) {
        msg.innerText = "Username exists!";
        return;
    }

    users.push({
        username: user,
        password: hashPassword(pass),
        role: role,
        enrolled: [],
        progress: {}
    });

    localStorage.setItem("users", JSON.stringify(users));

    msg.innerText = "Registered!";
    setTimeout(() => window.location.href = "index.html", 1000);
}

// ================= LOGIN =================
function attemptLogin() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
        u => u.username === user && u.password === hashPassword(pass)
    );

    if (foundUser) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("currentUser", user);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-msg").innerText = "Invalid login!";
    }
}

// ================= AUTH =================
function checkAuth() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

// ================= LOGOUT =================
function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// ================= COURSES =================
const courses = [
    { title: "Java Programming", id: "CS101", desc: "Learn Java basics" },
    { title: "Web Development", id: "WD202", desc: "HTML, CSS, JS" },
    { title: "Data Structures", id: "DS303", desc: "Stacks, Queues, Trees" }
];

// ================= USER DATA =================
function getCurrentUserData() {
    const username = sessionStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username);

    // 🔥 CRITICAL FIX
    if (!user) {
        showToast("User not found. Please login again", "red");
        logout();
        return null;
    }

    return user;
}

function updateUserData(updatedUser) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u =>
        u.username === updatedUser.username ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(users));
}

// ================= DASHBOARD =================
function loadDashboard() {
    const user = getCurrentUserData();
    if (!user) return;

    document.getElementById("user-name").innerText = user.username;

    loadCourses();
    loadEnrolledCourses();
}

// ================= LOAD COURSES =================
function loadCourses() {
    const user = getCurrentUserData();
    if (!user) return;

    const container = document.getElementById("course-container");
    if (!container) return; // DOM safety

    container.innerHTML = "";

    courses.forEach(c => {
        let isEnrolled = user.enrolled.includes(c.id);

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

// ================= ENROLL =================
function enrollCourse(courseId) {
    let user = getCurrentUserData();
    if (!user) return;

    if (!user.enrolled.includes(courseId)) {
        user.enrolled.push(courseId);
        user.progress[courseId] = 0;

        updateUserData(user);
        showToast("Enrolled!");
    } else {
        showToast("Already enrolled", "orange");
    }

    loadCourses();
    loadEnrolledCourses();
}

// ================= PROGRESS =================
function updateProgress(courseId) {
    let user = getCurrentUserData();
    if (!user) return;

    if (user.progress[courseId] < 100) {
        user.progress[courseId] += 10;
        updateUserData(user);
    }

    loadEnrolledCourses();
}

// ================= ENROLLED =================
function loadEnrolledCourses() {
    let user = getCurrentUserData();
    if (!user) return;

    const container = document.getElementById("enrolled-container");
    if (!container) return;

    container.innerHTML = "";

    if (user.enrolled.length === 0) {
        container.innerHTML = "<p>No courses</p>";
        return;
    }

    user.enrolled.forEach(id => {
        let course = courses.find(c => c.id === id);
        let progress = user.progress[id] || 0;

        container.innerHTML += `
        <div class="course-card">
            <h3>${course.title}</h3>
            <p>Progress: ${progress}%</p>
            <button onclick="updateProgress('${id}')">+ Progress</button>
        </div>`;
    });
}
