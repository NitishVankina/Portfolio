document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    if (username === "AugustOnline" && password === "#h.g.wells9182") {
        localStorage.setItem("loggedInUser", "AugustOnline");
        window.location.href = "index.html";
    } else {
        alert("Incorrect username or password.");
    }
});
