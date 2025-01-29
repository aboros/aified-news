// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Track outbound link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't track internal links
            if (!this.href.includes(window.location.hostname)) {
                e.preventDefault();
                sa_event('outbound_link_click', function() {
                    window.location.href = link.href;
                });
            }
        });
    });

    // Track button clicks
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            sa_event('button_click_' + (this.id || 'unnamed'));
        });
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            sa_event('form_submit_' + (this.id || 'unnamed'));
        });
    });

    // Track scroll depth
    let scrollDepthTriggered = new Set();
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        
        [25, 50, 75, 90].forEach(threshold => {
            if (scrollPercent >= threshold && !scrollDepthTriggered.has(threshold)) {
                scrollDepthTriggered.add(threshold);
                sa_event('scroll_depth_' + threshold);
            }
        });
    });

    // Track time on page
    setTimeout(() => sa_event('time_on_page_30s'), 30000);
    setTimeout(() => sa_event('time_on_page_60s'), 60000);
    setTimeout(() => sa_event('time_on_page_180s'), 180000);
}); 