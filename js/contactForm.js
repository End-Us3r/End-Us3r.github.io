// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const contactLink = document.querySelector('#contactLink'); // adjust this selector to match your link
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal'); // button or element to close

    contactLink?.addEventListener('click', (e) => {
        e.preventDefault();
        modal?.classList.add('show');
    });

    closeModal?.addEventListener('click', () => {
        modal?.classList.remove('show');
    });

    // Optional: Close modal when clicking outside form
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
