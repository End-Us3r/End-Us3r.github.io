document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    console.log(`Found ${navLinks.length} nav links`)

    navLinks.forEach((link) => {
        link.addEventListener('click', function ( event ) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);

            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
    });
});
