// Handle Login and Registration
// Handle Registration
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const gender = document.getElementById('reg-gender').value;
    const dob = document.getElementById('reg-dob').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }

    const newUser = {
        username,
        email,
        phone,
        gender,
        dob,
        password,
        dateRegistered: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
    window.location.href = 'index.html';
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (rememberMe) {
            localStorage.setItem('rememberedUser', username);
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'home.html';
    } else {
        alert('Invalid username or password!');
    }
}

// Check for remembered user
document.addEventListener('DOMContentLoaded', function() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser && document.getElementById('username')) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember-me').checked = true;
    }
});

// Profile Management
function showUserProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;

    const profileModal = document.createElement('div');
    profileModal.className = 'modal';
    profileModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>User Profile</h2>
            <div class="profile-info">
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Gender:</strong> ${user.gender}</p>
                <p><strong>Date of Birth:</strong> ${user.dob}</p>
                <p><strong>Member Since:</strong> ${new Date(user.dateRegistered).toLocaleDateString()}</p>
            </div>
            <button onclick="signOut()" class="logout-btn">Sign Out</button>
        </div>
    `;
    document.body.appendChild(profileModal);
}

// Sign Out
function signOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check Authentication
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
    }
    return currentUser;
}

// Update Username in Header
function updateUserHeader() {
    const currentUser = checkAuth();
    if (currentUser) {
        const userNameElement = document.querySelector('.user-info span');
        if (userNameElement) {
            userNameElement.textContent = currentUser.username;
        }
    }
}

// Initialize Home Page
if (window.location.pathname.includes('home.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        checkAuth();
        updateUserHeader();
    });
}
