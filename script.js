document.addEventListener("DOMContentLoaded", function() {
    // Reveal function for scroll animations
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100; // threshold
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);
    
    // Trigger immediately to show hero sections
    setTimeout(reveal, 100);

    // Smooth scrolling logic for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position if there is a fixed header
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple interaction on phone mockup task items
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) translateX(10px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) translateX(0)';
        });
    });

    // iOS Button click
    document.querySelectorAll('.ios-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Phiên bản iOS hiện chưa được hỗ trợ. Mong bạn thông cảm!');
        });
    });


});
