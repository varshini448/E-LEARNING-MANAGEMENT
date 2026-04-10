// --- LOGIN LOGIC ---
function attemptLogin() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // Send data to Java Backend using POST
    fetch(`/api/login?username=${user}&password=${pass}`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        if (data.startsWith("SUCCESS")) {
            // Save login state in browser session
            sessionStorage.setItem("loggedIn", "true");
            window.location.href = "dashboard.html"; // Move to dashboard
        } else {
            // Show error in HTML
            document.getElementById("error-msg").style.display = "block";
        }
    });
}

// --- LOGOUT LOGIC ---
function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// --- FETCH COURSES FROM JAVA ---
function loadCourses() {
    // Check if user is logged in
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    // Ask Java backend for the course list
    fetch('/api/courses')
    .then(response => response.json())
    .then(courses => {
        let container = document.getElementById("course-container");
        container.innerHTML = ""; // Clear loading state

        // Loop through the array of courses returned by Java
        courses.forEach(course => {
            // Build HTML cards dynamically using JavaScript Template Literals
            let card = `
                <div class="course-card">
                    <h3 style="color:#0056b3;">${course.title}</h3>
                    <p style="color:gray; font-size:0.9rem; margin-top:5px;">Code: ${course.courseId}</p>
                    <p style="margin-top:10px;">${course.description}</p>
                    <button style="margin-top:15px;">Enter Course</button>
                </div>
            `;
            container.innerHTML += card;
        });
    });
}
