const pupil = document.querySelector('.pupil');
const eyeWrapper = document.querySelector('.eye-wrapper');
const changingText = document.getElementById('changing-text');

const words = ["logia.svg", "deliku.svg"]; // Только два SVG
let currentIndex = 0;

let moveX = 0; // Координата X основного зрачка
let moveY = 0; // Координата Y основного зрачка

// Динамически меняем текст
setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    changingText.src = `images/${words[currentIndex]}`;
}, 4000);

// Движение зрачка за курсором
function handleMouseMove(e) {
    const eyeRect = eyeWrapper.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const deltaX = e.clientX - eyeCenterX;
    const deltaY = e.clientY - eyeCenterY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxMove = 20;

    moveX = (deltaX / distance) * Math.min(distance, maxMove);
    moveY = (deltaY / distance) * Math.min(distance, maxMove);

    pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
}

// Добавляем обработчик события для движения мыши только на экранах, ширина которых больше 720px
if (window.innerWidth > 720) {
    document.addEventListener('mousemove', handleMouseMove);
}





// Моргаем раз в 5 секунд (Глаз + ТОЛЬКО правый текст)
setInterval(() => {
    eyeWrapper.style.transform = 'scaleY(0)';
    changingText.style.transform = 'scaleY(0)';

    setTimeout(() => {
        eyeWrapper.style.transform = 'scaleY(1)';
        changingText.style.transform = 'scaleY(1)';
    }, 200);
}, 4000);

// Функция для изменения масштаба пропорционально ширине экрана
function adjustScale() {
    const sloganContainer = document.querySelector('.slogan-container');
    const screenWidth = window.innerWidth;
    const scaleValue = Math.max(screenWidth * 0.0006, 0.5); // Минимальный масштаб 0.5

    sloganContainer.style.transform = `scale(${scaleValue})`;
    sloganContainer.style.transformOrigin = 'center';
}

adjustScale();
window.addEventListener('resize', adjustScale);
window.addEventListener('orientationchange', adjustScale);

// Поворот фона при прокрутке
let rotationAngle = 0;
new fullpage("#fullpage", {
    autoScrolling: true,
    scrollHorizontally: true,
    onLeave: function (origin, destination, direction) {
        const backgroundImage = document.querySelector(".background-image");

        if (direction === "down") {
            rotationAngle += 90;
        } else {
            rotationAngle -= 90;
        }

        backgroundImage.style.transform = `rotate(${rotationAngle}deg)`;
    },
});