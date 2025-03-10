// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    updateUserHeader();
    loadSubmittedRequests();
});

// Request Support Functions
function showRequestSupport() {
    document.getElementById('requestSupportModal').style.display = 'block';
}

function handleSupportRequest(event) {
    event.preventDefault();
    const helpType = document.getElementById('helpType').value;
    const story = document.getElementById('userStory').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const request = {
        id: Date.now(),
        type: helpType,
        story: story,
        userId: currentUser.username,
        date: new Date().toISOString(),
        status: 'pending'
    };

    saveRequest(request);
    closeModal('requestSupportModal');
    loadSubmittedRequests();
}

function saveRequest(request) {
    let requests = JSON.parse(localStorage.getItem('requests') || '[]');
    requests.push(request);
    localStorage.setItem('requests', JSON.stringify(requests));
}

function loadSubmittedRequests() {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    const container = document.getElementById('requestsList');
    
    container.innerHTML = requests.map(request => `
        <div class="request-card">
            <div class="request-header">
                <h3>${request.type}</h3>
                <span class="status ${request.status}">${request.status}</span>
            </div>
            <p class="request-story">${request.story}</p>
            <div class="request-footer">
                <span>By: ${request.userId}</span>
                <span>Posted: ${new Date(request.date).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

// Volunteer Functions
function showDisasterResponse() {
    const opportunities = [
        { title: 'Flood Relief', location: 'Downtown Area', urgency: 'High' },
        { title: 'Fire Response', location: 'North District', urgency: 'Critical' },
        { title: 'Medical Camp', location: 'South Zone', urgency: 'Medium' }
    ];
    showVolunteerModal(opportunities);
}

function showVolunteerModal(opportunities) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Volunteer Opportunities</h2>
            <div class="opportunities-grid">
                ${opportunities.map(opp => `
                    <div class="opportunity-card ${opp.urgency.toLowerCase()}">
                        <h3>${opp.title}</h3>
                        <p>Location: ${opp.location}</p>
                        <p class="urgency">Urgency: ${opp.urgency}</p>
                        <button onclick="applyForVolunteer('${opp.title}', '${opp.location}')">
                            Volunteer Now
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Donation Functions
function handleDonation(type) {
    const donationTypes = {
        financial: { title: 'Financial Aid', description: 'Support with monetary assistance' },
        food: { title: 'Food Aid', description: 'Provide food supplies' },
        healthcare: { title: 'Healthcare Aid', description: 'Medical support and supplies' }
    };

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${donationTypes[type].title}</h2>
            <p>${donationTypes[type].description}</p>
            <form onsubmit="processDonation(event, '${type}')">
                <div class="form-group">
                    <label>Amount/Items</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Message (Optional)</label>
                    <textarea></textarea>
                </div>
                <button type="submit" class="submit-btn">Donate Now</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

// Fundraiser Functions
function showFundraisers() {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    const fundraisers = requests.filter(req => req.type === 'fundraiser');
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Active Fundraisers</h2>
            <div class="fundraisers-grid">
                ${fundraisers.map(fund => `
                    <div class="fundraiser-card">
                        <h3>${fund.story.substring(0, 50)}...</h3>
                        <p>By: ${fund.userId}</p>
                        <button onclick="supportFundraiser(${fund.id})">Support</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Utility Functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function joinInitiative() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    let initiatives = JSON.parse(localStorage.getItem('initiatives') || '[]');
    if (!initiatives.includes(currentUser.username)) {
        initiatives.push(currentUser.username);
        localStorage.setItem('initiatives', JSON.stringify(initiatives));
        alert('Thank you for joining our initiative!');
    } else {
        alert('You are already part of this initiative!');
    }
}

// Update the loadSubmittedRequests function to handle different request types
function loadSubmittedRequests() {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    
    // Filter requests by type
    const supportRequests = requests.filter(req => req.type !== 'volunteer' && req.type !== 'fundraiser');
    const volunteerRequests = requests.filter(req => req.type === 'volunteer');
    const fundraiserRequests = requests.filter(req => req.type === 'fundraiser');

    // Update Support Requests
    document.getElementById('supportRequestsList').innerHTML = supportRequests.map(request => `
        <div class="request-card">
            <h3>${request.type}</h3>
            <p class="request-details">${request.story}</p>
            <div class="request-meta">
                <span>By: ${request.userId}</span>
                <span>${new Date(request.date).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');

    // Update Volunteer Requests
    document.getElementById('volunteerRequestsList').innerHTML = volunteerRequests.map(request => `
        <div class="request-card">
            <h3>Volunteer Needed</h3>
            <div class="request-details">
                <p><strong>Location:</strong> ${request.place}</p>
                <p><strong>Gender:</strong> ${request.gender}</p>
                <p><strong>Age Range:</strong> ${request.age}</p>
                <p><strong>Reason:</strong> ${request.reason}</p>
            </div>
            <div class="request-meta">
                <span>By: ${request.userId}</span>
                <span>${new Date(request.date).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');

    // Update Fundraiser Requests
    document.getElementById('fundraiserRequestsList').innerHTML = fundraiserRequests.map(request => `
        <div class="request-card">
            <h3>Fundraiser Request</h3>
            <div class="request-amount">Target: $${request.amount}</div>
            <p class="request-details">${request.reason}</p>
            <div class="request-meta">
                <span>By: ${request.userId}</span>
                <span>${new Date(request.date).toLocaleDateString()}</span>
            </div>
            <button class="support-btn" onclick="supportFundraiser(${request.id})">Support</button>
        </div>
    `).join('');
}

// Handle Volunteer Request
function showVolunteerNeeded() {
    document.getElementById('volunteerNeededModal').style.display = 'block';
}

function handleVolunteerRequest(event) {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const request = {
        id: Date.now(),
        type: 'volunteer',
        place: document.getElementById('place').value,
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        reason: document.getElementById('volunteerReason').value,
        userId: currentUser.username,
        date: new Date().toISOString(),
        status: 'active'
    };

    saveRequest(request);
    closeModal('volunteerNeededModal');
    document.getElementById('volunteerRequestForm').reset();
    loadSubmittedRequests();
}

// Handle Fundraiser Request
function showFundraiserRequest() {
    document.getElementById('fundraiserModal').style.display = 'block';
}

function handleFundraiserRequest(event) {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const request = {
        id: Date.now(),
        type: 'fundraiser',
        amount: document.getElementById('amount').value,
        reason: document.getElementById('fundraiserReason').value,
        userId: currentUser.username,
        date: new Date().toISOString(),
        status: 'active',
        amountRaised: 0
    };

    saveRequest(request);
    closeModal('fundraiserModal');
    document.getElementById('fundraiserForm').reset();
    loadSubmittedRequests();
}

// Support Fundraiser
function supportFundraiser(requestId) {
    const amount = prompt('Enter the amount you want to donate:');
    if (!amount || isNaN(amount)) return;

    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    const requestIndex = requests.findIndex(req => req.id === requestId);
    
    if (requestIndex !== -1) {
        requests[requestIndex].amountRaised = (parseFloat(requests[requestIndex].amountRaised) || 0) + parseFloat(amount);
        localStorage.setItem('requests', JSON.stringify(requests));
        loadSubmittedRequests();
        alert('Thank you for your support!');
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    updateUserHeader();
    loadSubmittedRequests();
});
