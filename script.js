// --- REGISTRATION LOGIC (Local Storage Version) ---
function attemptRegister() {
    let user = document.getElementById("reg-username").value;
    let pass = document.getElementById("reg-password").value;
    let role = document.getElementById("reg-role").value;

    if(user === "" || pass === "") {
        alert("Please fill in all fields");
        return;
    }

    // Get existing users or start an empty list
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (users.find(u => u.username === user)) {
        let msgElement = document.getElementById("reg-msg");
        msgElement.style.display = "block";
        msgElement.style.color = "red";
        msgElement.innerText = "Username already exists!";
        return;
    }

    // Save new user
    users.push({ username: user, password: pass, role: role });
    localStorage.setItem("users", JSON.stringify(users));

    let msgElement = document.getElementById("reg-msg");
    msgElement.style.display = "block";
    msgElement.style.color = "green";
    msgElement.innerText = "Registration Successful! Redirecting to login...";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}

// --- LOGIN LOGIC (Local Storage Version) ---
function attemptLogin() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check local storage for the user
    let foundUser = users.find(u => u.username === user && u.password === pass);

    // Also allow the default hardcoded user
    if (foundUser || (user === "student1" && pass === "password123")) {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
}

// --- LOGOUT LOGIC ---
function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// --- FETCH COURSES (Static Version) ---
function loadCourses() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    // Static list since there is no Java backend running on GitHub
    const courses = [
        { title: "Java Programming", courseId: "CS101", description: "Learn the basics of Java." },
        { title: "Web Development", courseId: "WD202", description: "HTML, CSS, and JS." }
    ];

    let container = document.getElementById("course-container");
    container.innerHTML = ""; 
    courses.forEach(course => {
        let card = `
            <div class="course-card">
                <h3 style="color:#0056b3;">${course.title}</h3>
                <p style="color:gray; font-size:0.9rem;">Code: ${course.courseId}</p>
                <p>${course.description}</p>
                <button onclick="alert('Course Entered!')">Enter Course</button>
            </div>`;
        container.innerHTML += card;
    });
}
