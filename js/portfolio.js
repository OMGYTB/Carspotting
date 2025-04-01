document.addEventListener('DOMContentLoaded', function() {
    // Gestion des filtres
    const filters = document.querySelectorAll('.brand-filter');
    const photos = document.querySelectorAll('.photo-card');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            photos.forEach(photo => {
                if (filterValue === 'all' || photo.getAttribute('data-filter') === filterValue) {
                    photo.style.display = 'block';
                } else {
                    photo.style.display = 'none';
                }
            });
        });
    });

    // Modal pour l'affichage en plein écran
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const zoomButtons = document.querySelectorAll('.action-btn.zoom');

    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const photoCard = this.closest('.photo-card');
            const img = photoCard.querySelector('img');
            modal.style.display = 'block';
            modalImg.src = img.src;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fermer le modal en cliquant en dehors de l'image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
