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
function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// ================= COURSES =================
function loadCourses() {
    const courses = [
        { title: "Java Programming", id: "CS101", desc: "Learn Java basics" },
        { title: "Web Development", id: "WD202", desc: "HTML, CSS, JS" }
    ];

    const container = document.getElementById("course-container");
    container.innerHTML = "";

    courses.forEach(c => {
        container.innerHTML += `
        <div class="course-card">
            <h3>${c.title}</h3>
            <p>Code: ${c.id}</p>
            <p>${c.desc}</p>
            <button onclick="alert('Entered')">Enter</button>
        </div>`;
    });
}
