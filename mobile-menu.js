// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupMobileMenu();
        setupDesktopToggle();
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

function setupDesktopToggle() {
    if (window.innerWidth <= 768) return;

    const topBar = document.querySelector('.top-bar');
    const headerLeft = document.querySelector('.header-left');
    const sidebar = document.querySelector('.sidebar');
    if (!topBar || !sidebar) return;

    // Don't add duplicate
    if (document.querySelector('.sidebar-toggle-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'sidebar-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle Sidebar');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';

    // Restore saved state
    if (localStorage.getItem('sidebarCollapsed') === '1') {
        sidebar.classList.add('collapsed');
        btn.querySelector('svg').style.transform = 'scaleX(-1)';
    }

    btn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        btn.querySelector('svg').style.transform = isCollapsed ? 'scaleX(-1)' : '';
        localStorage.setItem('sidebarCollapsed', isCollapsed ? '1' : '0');

        // Resize charts during and after sidebar transition (280ms)
        function resizeCharts() {
            if (window.Chart && Chart.instances) {
                Object.values(Chart.instances).forEach(function(chart) {
                    chart.resize();
                });
            }
            window.dispatchEvent(new Event('resize'));
        }
        // Fire at multiple points: mid-transition, end, and a bit after
        setTimeout(resizeCharts, 100);
        setTimeout(resizeCharts, 200);
        setTimeout(resizeCharts, 310);
        setTimeout(resizeCharts, 500);
    });

    if (headerLeft) {
        headerLeft.insertBefore(btn, headerLeft.firstChild);
    } else {
        topBar.insertBefore(btn, topBar.firstChild);
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
