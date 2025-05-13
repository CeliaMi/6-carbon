// JavaScript para la página como-soy.html

document.addEventListener('DOMContentLoaded', () => {
    // Animación para los elementos al cargar la página
    const elementosAnimados = document.querySelectorAll('.como-soy p, .como-soy h2, .como-soy img, .como-soy iframe');
    
    elementosAnimados.forEach((elemento, index) => {
        // Añadir clase para animación con retraso escalonado
        setTimeout(() => {
            elemento.classList.add('fade-in');
        }, 100 * index);
    });
    
    // Función para mostrar el superpoder
    window.mostrarPoder = function() {
        const modal = document.getElementById('superpoderModal');
        const music = document.getElementById('mysticalMusic');
        
        modal.style.display = "block";
        music.play();
        
        // Prevent scrolling when modal is open
        document.body.style.overflow = "hidden";
        
        // Cambia el texto del botón
        const boton = document.querySelector('.como-soy button');
        boton.innerHTML = '✨ ¡Superpoder revelado! ✨ No seas avaricias solo se puede ver una vez';
        boton.disabled = true;
        
        // Efecto adicional después de mostrar el superpoder
        setTimeout(() => {
            boton.style.backgroundColor = '#FF8FA9';
        }, 300);
    };

    // Close modal when clicking the X
    document.querySelector('.close-modal').addEventListener('click', function() {
        const modal = document.getElementById('superpoderModal');
        const music = document.getElementById('mysticalMusic');
        
        modal.style.display = "none";
        music.pause();
        music.currentTime = 0;
        
        // Re-enable scrolling
        document.body.style.overflow = "auto";
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('superpoderModal');
        const music = document.getElementById('mysticalMusic');
        
        if (event.target === modal) {
            modal.style.display = "none";
            music.pause();
            music.currentTime = 0;
            document.body.style.overflow = "auto";
        }
    });
}); 