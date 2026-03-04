// Guest Book System
const STORAGE_KEY = 'portfolioGuests';
const VISITOR_COUNT_KEY = 'visitorCount';
const VALID_PASSWORDS = ['28'];

// Load total visitors
function loadVisitorCount() {
    const count = localStorage.getItem(VISITOR_COUNT_KEY) || 0;
    document.getElementById('totalVisitors').textContent = count;
}

// Toggle fields based on user type
document.getElementById('userType').addEventListener('change', function() {
    const userType = this.value;
    const guestFields = document.getElementById('guestFields');
    const developerFields = document.getElementById('developerFields');
    
    if (userType === 'tamu') {
        guestFields.style.display = 'block';
        developerFields.style.display = 'none';
        // Set required
        document.getElementById('guestName').required = true;
        document.getElementById('guestCity').required = true;
        document.getElementById('devName').required = false;
        document.getElementById('devPassword').required = false;
    } else if (userType === 'developer') {
        guestFields.style.display = 'none';
        developerFields.style.display = 'block';
        // Set required
        document.getElementById('guestName').required = false;
        document.getElementById('guestCity').required = false;
        document.getElementById('devName').required = true;
        document.getElementById('devPassword').required = true;
    } else {
        guestFields.style.display = 'none';
        developerFields.style.display = 'none';
    }
});

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
        window.location.href = 'portfolio.html';
    }
}

// Form submission
document.getElementById('guestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userType = document.getElementById('userType').value;
    const btn = document.querySelector('.submit-btn');
    
    if (userType === 'tamu') {
        const formData = {
            type: 'Tamu',
            name: document.getElementById('guestName').value.trim(),
            city: document.getElementById('guestCity').value.trim(),
            purpose: 'Mengunjungi Portfolio'
        };
        
        if (formData.name && formData.city) {
            saveGuest(formData);
            btn.textContent = 'Berhasil! Mengalihkan...';
            btn.style.background = 'linear-gradient(135deg, #34a853, #0f9d58)';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    } else if (userType === 'developer') {
        const devName = document.getElementById('devName').value.trim();
        const devPassword = document.getElementById('devPassword').value;
        
        // Validate password
        if (!VALID_PASSWORDS.includes(devPassword)) {
            btn.textContent = 'Password Salah!';
            btn.style.background = 'linear-gradient(135deg, #dc143c, #ff1744)';
            
            setTimeout(() => {
                btn.innerHTML = '<span>Masuk Portfolio</span><span class="arrow">→</span>';
                btn.style.background = 'linear-gradient(135deg, #dc143c, #ff1744)';
            }, 2000);
            return;
        }
        
        if (devName) {
            // Developer tidak masuk ke data pengunjung
            sessionStorage.setItem('isDeveloper', 'true');
            sessionStorage.setItem('currentGuest', JSON.stringify({
                type: 'Developer',
                name: devName
            }));
            btn.textContent = 'Berhasil! Mengalihkan...';
            btn.style.background = 'linear-gradient(135deg, #34a853, #0f9d58)';
            
            setTimeout(() => {
                window.location.href = 'guestbook.html';
            }, 1000);
        }
    } else {
        alert('Silakan pilih Tamu atau Developer');
    }
});

// Initialize
checkSession();
loadVisitorCount();
