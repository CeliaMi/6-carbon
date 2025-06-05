// --- Juego tipo Wordle ---
const WORD = "lápiz";
const MAX_ATTEMPTS = 6;
let attempts = [];
let finished = false;

function normalizeWord(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderBoard() {
    const board = document.getElementById('wordle-board');
    board.innerHTML = '';
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        const guess = attempts[i] || '';
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'wordle-cell';
            cell.textContent = guess[j] ? guess[j].toUpperCase() : '';
            if (guess[j]) {
                const normalizedGuess = normalizeWord(guess[j]);
                const normalizedWord = normalizeWord(WORD[j]);
                if (normalizedGuess === normalizedWord) {
                    cell.classList.add('correct');
                } else if (normalizeWord(WORD).includes(normalizedGuess)) {
                    cell.classList.add('present');
                } else {
                    cell.classList.add('absent');
                }
            }
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    updateKeyboardState();
}

function playDinoSound() {
    const sound = document.getElementById('dino-sound');
    sound.currentTime = 0;
    const playPromise = sound.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Error reproduciendo el audio:", error);
            document.addEventListener('click', function playOnClick() {
                sound.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }
}

function playThunderstormSound() {
    const sound = document.getElementById('thunderstorm-sound');
    sound.currentTime = 0;
    const playPromise = sound.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Error reproduciendo el audio:", error);
            document.addEventListener('click', function playOnClick() {
                sound.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }
}

function showModal(message, showCelebration = false) {
    const modal = document.getElementById('result-modal');
    const modalMessage = document.getElementById('modal-message');
    const celebration = document.getElementById('dino-celebration');
    
    modalMessage.textContent = message;
    celebration.style.display = showCelebration ? 'block' : 'none';
    
    modal.style.display = 'flex';
    
    if (showCelebration) {
        playThunderstormSound();
    }
}

function closeResultModal() {
    const modal = document.getElementById('result-modal');
    const thunderstorm = document.getElementById('thunderstorm-sound');
    
    modal.style.display = 'none';
    thunderstorm.pause();
    thunderstorm.currentTime = 0;
}

function checkGuess() {
    if (finished) return;
    const input = document.getElementById('wordle-input');
    let guess = input.value.trim();
    
    if (guess.length !== 5) {
        showModal('La palabra debe tener 5 letras.');
        return;
    }
    
    attempts.push(guess);
    renderBoard();
    
    const normalizedGuess = normalizeWord(guess);
    const normalizedWord = normalizeWord(WORD);
    const isCorrect = normalizedGuess === normalizedWord;
    
    if (isCorrect) {
        finished = true;
        document.getElementById('wordle-btn').disabled = true;
        showModal('¡Correcto! La palabra es LÁPIZ ✏️', true);
    } else if (attempts.length >= MAX_ATTEMPTS) {
        finished = true;
        document.getElementById('wordle-btn').disabled = true;
        showModal(`¡Fin del juego! La palabra era: ${WORD.toUpperCase()}`);
    }
    
    input.value = '';
    input.focus();
}

// Función para mostrar/ocultar la leyenda
function toggleLegend() {
    const modal = document.getElementById('legend-modal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// Inicialización del juego
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('wordle-btn').addEventListener('click', checkGuess);
    document.getElementById('wordle-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') checkGuess();
    });
    
    // Cerrar modales al hacer clic en la X
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal.id === 'result-modal') {
                closeResultModal();
            } else if (modal.id === 'legend-modal') {
                modal.style.display = 'none';
            }
        });
    });
    
    // Cerrar modales al hacer clic fuera del contenido
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.id === 'result-modal') {
                    closeResultModal();
                } else if (this.id === 'legend-modal') {
                    this.style.display = 'none';
                }
            }
        });
    });

    // Crear teclado virtual para móviles
    if (window.innerWidth <= 768) {
        createVirtualKeyboard();
    }
    
    renderBoard();
});

function createVirtualKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.className = 'virtual-keyboard';
    
    const keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ',
        'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'
    ];
    
    keys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'key';
        if (key === 'ENTER') {
            keyElement.classList.add('enter');
            keyElement.textContent = 'Enter';
            keyElement.addEventListener('click', () => checkGuess());
        } else if (key === 'BACKSPACE') {
            keyElement.classList.add('backspace');
            keyElement.textContent = '⌫';
            keyElement.addEventListener('click', () => {
                const input = document.getElementById('wordle-input');
                input.value = input.value.slice(0, -1);
            });
        } else {
            keyElement.textContent = key;
            keyElement.addEventListener('click', () => {
                const input = document.getElementById('wordle-input');
                if (input.value.length < 5) {
                    input.value += key.toLowerCase();
                }
            });
        }
        keyboard.appendChild(keyElement);
    });
    
    document.querySelector('.wordle-container').appendChild(keyboard);
}

function updateKeyboardState() {
    if (window.innerWidth > 768) return;
    
    const keyboard = document.querySelector('.virtual-keyboard');
    if (!keyboard) return;
    
    const keys = keyboard.querySelectorAll('.key');
    keys.forEach(key => {
        if (key.classList.contains('enter') || key.classList.contains('backspace')) return;
        
        const letter = key.textContent.toLowerCase();
        const letterState = getLetterState(letter);
        
        key.className = 'key';
        if (letterState) {
            key.classList.add(letterState);
        }
    });
}

function getLetterState(letter) {
    let state = null;
    attempts.forEach(attempt => {
        const normalizedAttempt = normalizeWord(attempt);
        const normalizedWord = normalizeWord(WORD);
        
        for (let i = 0; i < 5; i++) {
            if (normalizedAttempt[i] === letter) {
                if (normalizedWord[i] === letter) {
                    state = 'correct';
                } else if (normalizedWord.includes(letter) && state !== 'correct') {
                    state = 'present';
                } else if (!state) {
                    state = 'absent';
                }
            }
        }
    });
    return state;
}

// Modificar la función renderBoard para actualizar el estado del teclado
const originalRenderBoard = renderBoard;
renderBoard = function() {
    originalRenderBoard();
    updateKeyboardState();
}; 