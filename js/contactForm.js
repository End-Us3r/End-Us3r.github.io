document.addEventListener('DOMContentLoaded', () => {
    const contactLink = document.querySelector('#contactLink');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    const formContainer = document.querySelector('.form-container');

    contactLink?.addEventListener('click', (e) => {
        e.preventDefault();
        modal?.classList.add('show');
    });

    closeModal?.addEventListener('click', () => {
        modal?.classList.remove('show');
    });

    // Close when clicking outside the form
    modal?.addEventListener('click', (e) => {
        if (!formContainer.contains(e.target)) {
            modal.classList.remove('show');
        }
    });

    // Close on Esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal?.classList.remove('show');
        }
    });
});
