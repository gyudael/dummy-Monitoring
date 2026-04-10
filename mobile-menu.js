// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupMobileMenu();
    }, 100);

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        } else {
            if (!document.querySelector('.mobile-toggle')) {
                setupMobileMenu();
            }
        }
    });
});

function setupMobileMenu() {
    const topBar = document.querySelector('.top-bar');
    const layout = document.querySelector('.layout');
    const sidebar = document.querySelector('.sidebar');
    
    if (!topBar || !layout || !sidebar) {
        console.warn('Required elements not found');
        return;
    }

    // Check if mobile view
    if (window.innerWidth > 768) {
        return;
    }

    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        layout.appendChild(overlay);
        overlay.addEventListener('click', closeSidebar);
    }

    // Create mobile toggle button if it doesn't exist
    if (!document.querySelector('.mobile-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-toggle';
        toggleBtn.innerHTML = '☰';
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('aria-label', 'Toggle Menu');
        
        // Insert at the very beginning of top-bar
        topBar.insertBefore(toggleBtn, topBar.firstChild);
        
        // Add click handler
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // Add close handlers for nav items
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => {
        item.removeEventListener('click', closeSidebar);
        item.addEventListener('click', closeSidebar);
    });
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
        if (overlay) {
            overlay.classList.toggle('open');
        }
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
        if (overlay) {
            overlay.classList.remove('open');
        }
    }
}

// Improve touch interactions
document.addEventListener('touchstart', function() {}, false);

// Viewport meta tag warning
function ensureViewportMeta() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        document.head.appendChild(viewport);
    }
}

ensureViewportMeta();

// Free movement when zoomed, vertical-only when not zoomed
(function() {
    function checkZoom() {
        const layout = document.querySelector('.layout');
        const zoomed = window.visualViewport && window.visualViewport.scale > 1.05;
        if (layout) layout.classList.toggle('is-zoomed', !!zoomed);
        document.documentElement.classList.toggle('is-zoomed', !!zoomed);
    }

    // Run on load
    checkZoom();

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', checkZoom);
        window.visualViewport.addEventListener('scroll', checkZoom);
    }
})();
