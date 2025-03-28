// Show main content after the loading screen finishes
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
    }, 3000);  // 3 seconds loading screen
};
// Check if the user is logged in and show the "Post" button
function checkLoginStatus() {
    // For simplicity, assume user is logged in when the cookie exists
    const loggedIn = localStorage.getItem('loggedIn');
    
    if (loggedIn === 'true') {
        document.getElementById('post-button').style.display = 'block';
        document.getElementById('create-post-form').style.display = 'block';
        document.getElementById('login-container').innerHTML = 'Logged in as AugustOnline'; // Show logged-in name
    } else {
        document.getElementById('post-button').style.display = 'none';
        document.getElementById('create-post-form').style.display = 'none';
        document.getElementById('login-container').innerHTML = '<a href="login.html">Login</a>'; // Show login link
    }
}

// Run on page load
window.onload = checkLoginStatus;

