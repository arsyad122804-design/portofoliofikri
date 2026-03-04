// Guest Book System
const STORAGE_KEY = 'portfolioGuests';
const VISITOR_COUNT_KEY = 'visitorCount';

// Load total visitors
function loadVisitorCount() {
    const count = localStorage.getItem(VISITOR_COUNT_KEY) || 0;
    document.getElementById('totalVisitors').textContent = count;
}

// Save guest data
function saveGuest(guestData) {
    // Get existing guests
    let guests = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Add timestamp
    guestData.timestamp = new Date().toISOString();
    guestData.visitDate = new Date().toLocaleString('id-ID');
    
    // Add new guest
    guests.push(guestData);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
    
    // Update visitor count
    let count = parseInt(localStorage.getItem(VISITOR_COUNT_KEY) || 0);
    count++;
    localStorage.setItem(VISITOR_COUNT_KEY, count);
    
    // Save current guest to session
    sessionStorage.setItem('currentGuest', JSON.stringify(guestData));
}

// Check if already visited in this session
function checkSession() {
    const currentGuest = sessionStorage.getItem('currentGuest');
    if (currentGuest) {
        // Already filled form, redirect to portfolio
        window.location.href = 'index.html';
    }
}

// Form submission
document.getElementById('guestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('guestName').value.trim(),
        city: document.getElementById('guestCity').value.trim(),
        purpose: document.getElementById('guestPurpose').value || 'Tidak disebutkan'
    };
    
    if (formData.name && formData.city) {
        saveGuest(formData);
        
        // Show success animation
        const btn = document.querySelector('.submit-btn');
        btn.textContent = 'Berhasil! Mengalihkan...';
        btn.style.background = 'linear-gradient(135deg, #34a853, #0f9d58)';
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
});

// Initialize
checkSession();
loadVisitorCount();
