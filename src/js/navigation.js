document.addEventListener('DOMContentLoaded', function() {
    const nextPageArrow = document.querySelector('.next-page-arrow');
    
    if (nextPageArrow) {
        function checkScroll() {
            // Get the total scrollable height
            const scrollHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            );
            
            // Get the current scroll position
            const scrollPosition = window.innerHeight + window.scrollY;
            
            // Show arrow when we're near the bottom (within 100px)
            if (scrollHeight - scrollPosition < 100) {
                nextPageArrow.classList.add('visible');
            } else {
                nextPageArrow.classList.remove('visible');
            }
        }
        
        // Check scroll position on load
        checkScroll();
        
        // Check scroll position on scroll
        window.addEventListener('scroll', checkScroll);

        // For pages with less content, show the arrow immediately
        if (document.body.scrollHeight <= window.innerHeight) {
            nextPageArrow.classList.add('visible');
        }
    }
}); 