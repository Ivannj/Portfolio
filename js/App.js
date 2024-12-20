const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 120);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
};

gsap.to(".cube", {
    rotationX: 360, // Rotación completa en X
    rotationY: 360, // Rotación completa en Y
    duration: 6, // Tiempo para un giro completo
    ease: "linear", // Movimiento constante
    repeat: -1, // Animación infinita
});

// Rotación individual de los satélites
gsap.to(".satellite1", {
    rotationX: 360,
    rotationY: 360,
    duration: 10,
    repeat: -1,
    ease: "linear",
});

gsap.to(".satellite2", {
    rotationX: -360,
    rotationY: -360,
    duration: 8,
    repeat: -1,
    ease: "linear",
});

// Radio de la órbita
const orbitRadius = 100; // Ajusta el tamaño según la necesidad

// Satélite 1: Movimiento vertical, cruzando completamente el cubo principal
gsap.to(".satellite1", {
    y: "450px", // Cruzará completamente el cubo (200px hacia arriba y abajo)
    duration: 3, // Ajusta la duración
    repeat: -1,
    yoyo: true, // Vuelve al punto inicial
    ease: "linear", // Movimiento constante
    onUpdate: function () {
        const satellite1 = document.querySelector(".satellite1");
        const zIndex = satellite1.getBoundingClientRect().top < window.innerHeight / 2 ? -1 : 1;
        satellite1.style.zIndex = zIndex;
    },
});

// Satélite 2: Movimiento horizontal, cruzando completamente el cubo principal
gsap.to(".satellite2", {
    x: "450px", // Cruzará completamente el cubo (200px hacia izquierda y derecha)
    duration: 3, // Ajusta la duración
    repeat: -1,
    yoyo: true, // Vuelve al punto inicial
    ease: "linear", // Movimiento constante
    onUpdate: function () {
        const satellite2 = document.querySelector(".satellite2");
        const zIndex = satellite2.getBoundingClientRect().left < window.innerWidth / 2 ? -1 : 1;
        satellite2.style.zIndex = zIndex;
    },
});

// Selecciona el ícono del tema
const themeToggle = document.querySelector("#theme-icon");
const body = document.body;

// Detecta el tema guardado en localStorage y ajusta el estado inicial
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeToggle.classList.replace("ri-sun-line", "ri-moon-line"); // Muestra el Sol
} else {
    body.classList.remove("light-mode");
    themeToggle.classList.replace("ri-moon-line", "ri-sun-line"); // Muestra la Luna
}

// Alterna entre temas al hacer clic en el ícono
themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        themeToggle.classList.replace("ri-moon-line", "ri-sun-line"); // Cambia a Luna
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.add("light-mode");
        themeToggle.classList.replace("ri-sun-line", "ri-moon-line"); // Cambia a Sol
        localStorage.setItem("theme", "light");
    }
});


document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Capturar valores del formulario
    const name = document.querySelector('input[name="user_name"]').value;
    const email = document.querySelector('input[name="user_email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Inicializar EmailJS
    emailjs.init("5NBlUwnSMTPSgN-J9"); // Sustituye con tu API Key

    // Enviar datos manualmente
    emailjs.send("service_8z7fs0p", "template_97bm505", {
        user_name: name,
        user_email: email,
        message: message,
    }).then(
        function () {
            alert("Message sent successfully!");
            e.target.reset();
        },
        function (error) {
            alert("Failed to send message. Please try again.");
            console.error("EmailJS Error:", error);
        }
    );
});






