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

    // Android Button click
    document.querySelectorAll('.android-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Check if we need to scroll to download section
            const downloadSection = document.getElementById('download');
            if (downloadSection) {
                const headerOffset = 100;
                const elementPosition = downloadSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            const buttonsSection = document.getElementById('download-buttons-section');
            const regSection = document.getElementById('registration-section');
            const successSection = document.getElementById('success-section');

            if (buttonsSection && regSection && successSection) {
                buttonsSection.style.display = 'none';
                regSection.style.display = 'block';
                successSection.style.display = 'none';
            }
        });
    });

    // Back to buttons
    const backBtn = document.getElementById('back-to-buttons');
    if(backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('download-buttons-section').style.display = 'flex';
            document.getElementById('registration-section').style.display = 'none';
        });
    }

    // Email Form Submission
    const emailForm = document.getElementById('email-form');
    if(emailForm) {
        emailForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('user-email').value;
            const submitBtn = document.querySelector('.submit-btn');
            const btnContent = submitBtn.querySelector('.btn-content');

            if (email) {
                btnContent.innerText = 'Đang xử lý...';

                const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqeblwd';

                fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        message: 'Đăng ký nhận bản Tester FamiHub'
                    })
                })
                .then(response => {
                    if (response.ok) {
                        document.getElementById('registration-section').style.display = 'none';
                        document.getElementById('success-section').style.display = 'block';
                    } else {
                        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                        btnContent.innerText = 'Tiếp tục';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Lỗi kết nối mạng, vui lòng thử lại!");
                    btnContent.innerText = 'Tiếp tục';
                });
            }
        });
    }
});
