document.addEventListener('DOMContentLoaded', function() {
    // Only run on post pages
    if (document.querySelector('article')) {
        // Track post category if available
        const category = document.querySelector('.post-category');
        if (category) {
            sa_event('post_category_' + category.textContent.toLowerCase().replace(/\s+/g, '_'));
        }

        // Track post reading completion
        const article = document.querySelector('article');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sa_event('post_read_complete');
                    observer.disconnect();
                }
            });
        });

        // Observe the last paragraph of the article
        const lastParagraph = article.querySelector('p:last-of-type');
        if (lastParagraph) {
            observer.observe(lastParagraph);
        }
    }
}); 