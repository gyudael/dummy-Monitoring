/* ==========================================
   PrintCare - Global JavaScript
   ========================================== */

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modals on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal[style*="display: flex"]');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Login form handler
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation
        if (username && password) {
            // Simulate login - redirect to dashboard
            localStorage.setItem('currentUser', username);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        }
    });
}

// Logout handler
const logoutBtn = document.querySelector('.btn-logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// Check if user is logged in
function checkAuth() {
    const currentPage = window.location.pathname;
    const isLoginPage = currentPage.includes('index.html') || currentPage.endsWith('/');
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser && !isLoginPage) {
        window.location.href = 'index.html';
    }
}

// Run auth check on page load
document.addEventListener('DOMContentLoaded', checkAuth);

// Utility function to format dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('id-ID', options);
}

// Utility function for form validation
function validateForm(formElement) {
    const formData = new FormData(formElement);
    const errors = [];

    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            const field = formElement.querySelector(`[name="${key}"]`);
            if (field && field.hasAttribute('required')) {
                errors.push(`${field.parentElement.querySelector('label')?.textContent || key} is required`);
            }
        }
    }

    return errors;
}

// Debounce function for search
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Export functions for use in other scripts
window.utils = {
    formatDate,
    validateForm,
    debounce
};

// Print function
function printPage() {
    window.print();
}

// Download as CSV (simple version)
function downloadTableAsCSV(tableId, filename = 'data.csv') {
    const table = document.getElementById(tableId);
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const csvRow = Array.from(cols).map(col => {
            let text = col.textContent.trim();
            // Escape quotes and wrap in quotes if contains comma
            if (text.includes(',') || text.includes('"')) {
                text = `"${text.replace(/"/g, '""')}"`;
            }
            return text;
        });
        csv.push(csvRow.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename);
    link.click();
}

// Toast notification
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#0066cc'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add CSS for toast animations
if (!document.getElementById('toastStyles')) {
    const style = document.createElement('style');
    style.id = 'toastStyles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// User role mapping
const userRoles = {
    'admin': { role: 'Administrator', avatar: 'A' },
    'teknisi': { role: 'Technician', avatar: 'T' },
    'manager': { role: 'Manager', avatar: 'M' }
};

// Initialize user profile in sidebar
function initializeUserProfile() {
    const currentUser = localStorage.getItem('currentUser') || 'admin';
    const userInfo = userRoles[currentUser] || userRoles['admin'];
    
    // Update avatar
    const avatars = document.querySelectorAll('.avatar');
    avatars.forEach(avatar => {
        avatar.textContent = userInfo.avatar;
    });
    
    // Update user name
    const userNames = document.querySelectorAll('.user-name');
    userNames.forEach(name => {
        name.textContent = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
    });
    
    // Update user role
    const userRoles_elem = document.querySelectorAll('.user-role');
    userRoles_elem.forEach(role => {
        role.textContent = userInfo.role;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Log current page info for debugging
    console.log('PrintCare System Initialized');
    console.log('Current User:', localStorage.getItem('currentUser'));
    
    // Initialize user profile
    initializeUserProfile();
});

/* ==========================================
   EXPORT FUNCTIONS
   ========================================== */

// Export chart as image (PNG)
function exportChartAsImage(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        showToast('Chart not found!', 'error');
        return;
    }

    // Get Chart.js instance
    const chartInstance = Chart.helpers.each(Chart.instances, (instance) => {
        if (instance.canvas.id === canvasId) return instance;
    });

    if (chartInstance) {
        const link = document.createElement('a');
        link.href = chartInstance.canvas.toDataURL('image/png');
        link.download = filename + '_' + new Date().toISOString().split('T')[0] + '.png';
        link.click();
        showToast('Chart exported as image!', 'success');
    }
}

// Download chart as PNG
function downloadChartAsPNG(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}.png`;
    link.click();
}

// Download chart as JPG
function downloadChartAsJPG(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.download = `${filename}.jpg`;
    link.click();
}

// Export chart data as CSV
function exportChartAsCSV(chartId, filename) {
    // Get chart data based on ID
    let csvContent = 'data:text/csv;charset=utf-8,';
    let rows = [];

    // Determine which chart data to export
    if (chartId === 'statusChartData') {
        rows = [
            ['Week', 'Plan Maintenance', 'Actual Maintenance'],
            ['Week 1', 40, 35],
            ['Week 2', 45, 42],
            ['Week 3', 50, 48],
            ['Week 4', 55, 62]
        ];
    } else if (chartId === 'activityChartData') {
        rows = [
            ['Day', 'Plan Maintenance', 'Actual Maintenance'],
            ['1', 3, 2],
            ['2', 5, 4],
            ['3', 7, 6],
            ['4', 8, 7],
            ['5', 7, 8],
            ['6', 6, 7],
            ['7', 5, 6],
            ['8', 6, 5],
            ['9', 8, 7],
            ['10', 9, 9],
            ['11', 8, 9],
            ['12', 6, 7],
            ['13', 5, 6],
            ['14', 4, 5],
            ['15', 3, 4],
            ['16', 4, 5],
            ['17', 6, 7],
            ['18', 8, 8],
            ['19', 9, 8],
            ['20', 8, 7],
            ['21', 7, 6],
            ['22', 5, 4],
            ['23', 4, 3],
            ['24', 3, 2],
            ['25', 2, 1],
            ['26', 3, 2],
            ['27', 5, 4],
            ['28', 7, 6],
            ['29', 8, 7],
            ['30', 7, 6]
        ];
    } else if (chartId === 'inkChartData') {
        rows = [
            ['Day', 'Plan Cartrige', 'Actual Cartrige'],
            ['1', 5, 5],
            ['2', 6, 6],
            ['3', 8, 8],
            ['4', 7, 7],
            ['5', 9, 8],
            ['6', 6, 7],
            ['7', 5, 6],
            ['8', 8, 8],
            ['9', 7, 8],
            ['10', 9, 9],
            ['11', 8, 7],
            ['12', 7, 8],
            ['13', 6, 7],
            ['14', 5, 6],
            ['15', 7, 8],
            ['16', 8, 7],
            ['17', 9, 9],
            ['18', 7, 8],
            ['19', 6, 7],
            ['20', 8, 8],
            ['21', 7, 8],
            ['22', 9, 8],
            ['23', 8, 7],
            ['24', 6, 7],
            ['25', 9, 8],
            ['26', 7, 8],
            ['27', 8, 7],
            ['28', 6, 6],
            ['29', 7, 8],
            ['30', 8, 8]
        ];
    }

    rows.forEach(row => {
        csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename.replace('.csv', '') + '_' + new Date().toISOString().split('T')[0] + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data exported as CSV!', 'success');
}
