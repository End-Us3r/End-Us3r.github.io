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
