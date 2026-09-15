
// Hamburguer menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Carousel para projetos
let currentProjectSlide = 0;

function initProjectsCarousel() {
    const wrapper = document.querySelector("#projectsCarouselWrapper");
    const slides = document.querySelectorAll(".carousel-slide");

    if (!wrapper || slides.length === 0) return;

    // Criar dots
    createCarouselDots(slides.length);

    // Adicionar clique aos cards
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            currentProjectSlide = index;
            updateCarousel();
        });
        slide.style.cursor = 'pointer';
    });

    // Scroll inicial para o primeiro card
    setTimeout(() => {
        currentProjectSlide = 0;
        updateCarousel();
    }, 100);

    // Atualizar ao redimensionar
    window.addEventListener('resize', () => {
        updateCarousel();
    });
}

function createCarouselDots(totalSlides) {
    const projects = document.querySelector("#projects");
    let dotsContainer = document.getElementById("projectsDotsContainer");

    // Remover dots antigos se existirem
    if (dotsContainer) {
        dotsContainer.remove();
    }

    dotsContainer = document.createElement("div");
    dotsContainer.id = "projectsDotsContainer";
    dotsContainer.className = "carousel-dots";

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.className = "carousel-dot";
        if (i === 0) dot.classList.add("active");
        dot.addEventListener('click', () => {
            currentProjectSlide = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }

    projects.appendChild(dotsContainer);
}

function moveProjectsCarousel(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;

    currentProjectSlide += direction;

    // Loop infinito
    if (currentProjectSlide >= totalSlides) {
        currentProjectSlide = 0;
    } else if (currentProjectSlide < 0) {
        currentProjectSlide = totalSlides - 1;
    }

    updateCarousel();
}

function updateCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const wrapper = document.querySelector("#projectsCarouselWrapper");
    const track = document.querySelector("#projectsCarouselTrack");

    if (!wrapper || !track || slides.length === 0) return;

    slides.forEach((slide, index) => {
        slide.classList.toggle("center", index === currentProjectSlide);
    });

    const activeSlide = slides[currentProjectSlide];
    if (!activeSlide) return;

    const activeCenter = activeSlide.offsetLeft + (activeSlide.offsetWidth / 2);
    const wrapperCenter = wrapper.offsetWidth / 2;
    const translate = wrapperCenter - activeCenter;

    track.style.transform = `translate3d(${translate}px, 0, 0)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentProjectSlide);
    });
}

// Inicializar carousel quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsCarousel);
} else {
    initProjectsCarousel();
}
