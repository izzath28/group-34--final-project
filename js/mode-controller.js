/**
 * SportSphere Mode Controller
 * Manages Online/Offline project state
 */
(function() {
    const MODE_KEY = 'ss_system_mode';
    
    // Initialize mode if not set
    if (!localStorage.getItem(MODE_KEY)) {
        localStorage.setItem(MODE_KEY, 'online');
    }

    window.SS_MODE = {
        isOffline: () => localStorage.getItem(MODE_KEY) === 'offline',
        isOnline: () => localStorage.getItem(MODE_KEY) === 'online',
        
        toggle: () => {
            const current = localStorage.getItem(MODE_KEY);
            const next = current === 'online' ? 'offline' : 'online';
            localStorage.setItem(MODE_KEY, next);
            
            // Clear sessions when switching modes to prevent data cross-contamination
            localStorage.removeItem('user_data');
            localStorage.removeItem('center_data');
            
            window.location.reload();
        }
    };

    // Global UI adjustments based on mode
    document.addEventListener('DOMContentLoaded', () => {
        if (window.SS_MODE.isOffline()) {
            console.log("🚀 SportSphere running in OFFLINE mode (LocalStorage only)");
            document.documentElement.classList.add('ss-offline');
            
            // Hide all external-dependent elements
            const hideList = [
                '.google-btn', 
                '.divider', 
                '#ai-widget', // AI usually needs APIs
                '#grounds-map', // Maps need internet
                '.clinical-note'
            ];
            
            hideList.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
            });

            // If we are on the home page, update the toggle state
            const toggle = document.getElementById('mode-toggle-checkbox');
            if (toggle) toggle.checked = window.SS_MODE.isOffline();
        }
    });
})();
