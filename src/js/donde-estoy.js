document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover la clase flipped de todas las tarjetas
            cards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('flipped');
                }
            });
            // Alternar la clase flipped de la tarjeta clickeada
            this.classList.toggle('flipped');
        });
    });
});