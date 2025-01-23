let isScrolling = false; // Состояние прокрутки
const carousel = document.querySelector('.carousel');
const videoCardsContainer = document.querySelector('.video-cards');
let currentCardIndex = 0;
const videoCardsWidth = 360; // Пример ширины карточки видео
const videoCardsCount = videoCardsContainer.children.length;

videoCardsContainer.style.transform = `translateX(0px)`;
videoCardsContainer.style.transition = 'transform 0.5s ease-in-out';

// Обработчик событий для прокрутки мыши
window.addEventListener('wheel', (event) => {
    // Получаем положение карусели на странице
    const carouselRect = carousel.getBoundingClientRect();

    // Проверяем, находится ли курсор в блоке карусели
    const isInCarousel = carouselRect.top <= event.clientY && carouselRect.bottom >= event.clientY;

    if (isInCarousel && !isScrolling) {
        isScrolling = true; // Устанавливаем состояние прокрутки в true
        
        // Определяем направление прокрутки
        if (event.deltaY > 0 && currentCardIndex < (videoCardsCount - 1)) {
            currentCardIndex++;
        } else if (event.deltaY < 0 && currentCardIndex > 0) {
            currentCardIndex--;
        }

        // Прокручиваем к выбранной карточке
        const scrollPosition = currentCardIndex * videoCardsWidth;
        videoCardsContainer.style.transform = `translateX(${-scrollPosition}px)`;

        setTimeout(() => {
            isScrolling = false; // Вернуть состояние после завершения прокрутки
        }, 500); // Тайм-аут в зависимости от времени перехода
    }
});

// Инициализация AOS
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000,
        easing: 'ease',
        once: true,
        offset: 200,
    });
});