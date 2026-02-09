// esto es para que el carrusel de las pelis se mueva
// ojo que como el link del HTML falle, esto no hace nada
const swiper = new Swiper('.swiper', {
    speed: 800,
    spaceBetween: 20,
    slidesPerGroup: 1, // de uno en uno, que a saltos quedaba fatal

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // para que no se rompa en el movil. 
    // importante: me volvi loco y era porque me faltaba la S en breakpoints
    breakpoints: {
        300: { slidesPerView: 2 },
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
    }
});

// preparo el sonido de netflix para luego
const tudum = new Audio('Sonidos/Tudum.mp3');

// pillo los botones y los cuadros de texto
const botones = document.querySelectorAll('.start-btn');
const inputs = document.querySelectorAll('.start-input');

// hago un bucle para que funcionen los dos formularios (arriba y abajo)
botones.forEach(function(btn, num) {
    
    btn.onclick = function() {
        const correo = inputs[num].value;

        // esto del patron es un copiapega para saber si el email es real
        const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (correo === "") {
            alert("No has puesto nada, mete el correo anda.");
        } 
        else if (patron.test(correo)) {
            // si el email esta bien, que suene el Tudum antes del aviso
            tudum.play(); 
            btn.innerText = "Cargando...";
            
            setTimeout(function() {
                alert("¡Listo! Mira tu correo: " + correo);
                btn.innerText = "Comenzar";
                inputs[num].value = ""; 
            }, 1200); 
        } 
        else {
            alert("Ese correo esta mal puesto, revisalo.");
        }
    };
});

// lo del Enter, que por defecto el navegador refresca la pagina y me lo rompia
inputs.forEach(function(caja, num) {
    caja.onkeydown = function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // para que no se recargue la web
            botones[num].onclick(); // llamo al clic de arriba y listo
        }
    };
});