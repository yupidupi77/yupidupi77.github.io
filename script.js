const pupil = document.querySelector('.pupil');
const eyeWrapper = document.querySelector('.eye-wrapper');
const changingText = document.getElementById('changing-text');

const words = ["logia.svg", "atria.svg", "deliku.svg"];
let currentIndex = 0;

let moveX = 0; // Координата X основного зрачка
let moveY = 0; // Координата Y основного зрачка

let duplicatePupil;

// Динамически меняем размер зрачка в зависимости от текста
setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    changingText.src = `images/${words[currentIndex]}`;
    
    // Если слово "atria", показываем второй зрачок и тянем его
    if (words[currentIndex] === "atria.svg") {
        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        pupil.style.width = "30px";  // Исходный размер
        pupil.style.height = "30px"; // Исходный размер

        if (!duplicatePupil) {
            duplicatePupil = document.createElement('div');
            duplicatePupil.classList.add('pupil');
            duplicatePupil.style.position = "absolute";
            duplicatePupil.style.width = "30px"; 
            duplicatePupil.style.height = "120px"; 
            duplicatePupil.style.backgroundColor = "rgb(39, 39, 39)"; 
            duplicatePupil.style.borderRadius = "20px"; 
            eyeWrapper.appendChild(duplicatePupil);
        }
        duplicatePupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY + 74}px))`;
    } else {
        pupil.style.transform = "translate(-50%, -50%)"; 
        pupil.style.width = "30px";  
        pupil.style.height = "30px"; 

        if (duplicatePupil) {
            duplicatePupil.remove(); 
            duplicatePupil = null;
        }
    }
}, 3000);

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

    if (words[currentIndex] === "atria.svg") {
        const eyeHeight = eyeRect.height;
        const pupilHeight = pupil.offsetHeight * 2; 
        const maxVerticalMove = eyeHeight / 1.5 - pupilHeight / 2; 
        moveY = Math.min(Math.max(moveY, -maxVerticalMove), maxVerticalMove);
    }

    pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;

    if (words[currentIndex] === "atria.svg" && duplicatePupil) {
        duplicatePupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY + 74}px))`;
    }
}

// Добавляем обработчик события для движения мыши только на экранах, ширина которых больше 720px
if (window.innerWidth > 720) {
    document.addEventListener('mousemove', handleMouseMove);
} else {
    document.removeEventListener('mousemove', handleMouseMove);
}

// Плавное движение зрачка при ширине экрана меньше 720px (если тач)
function smoothMovePupil() {
    if (window.innerWidth < 720) {
        moveX += (eyeCenterX - moveX) / 10;
        moveY += (eyeCenterY - moveY) / 10;

        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        if (duplicatePupil) {
            duplicatePupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY + 74}px))`;
        }
    }

    requestAnimationFrame(smoothMovePupil); 
}

smoothMovePupil(); // Стартуем плавное движение для мобильных устройств

// Моргаем раз в 5 секунд (Глаз + ТОЛЬКО правый текст)
setInterval(() => {
    eyeWrapper.style.transform = 'scaleY(0)';
    changingText.style.transform = 'scaleY(0)';
    
    setTimeout(() => {
        eyeWrapper.style.transform = 'scaleY(1)';
        changingText.style.transform = 'scaleY(1)';
    }, 200);
}, 3000); 

// Функция для изменения масштаба пропорционально ширине экрана
function adjustScale() {
    const sloganContainer = document.querySelector('.slogan-container');
    const screenWidth = window.innerWidth;
    const scaleValue = screenWidth * 0.00075; 

    sloganContainer.style.transform = `scale(${scaleValue})`;
    sloganContainer.style.transformOrigin = 'center'; 
}

adjustScale();
window.addEventListener('resize', adjustScale);

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



const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const videoCards = document.querySelector('.video-cards');

prevBtn.addEventListener('click', () => {
  videoCards.scrollBy({
    left: -window.innerWidth * 0.35, // Прокрутка на ширину одного элемента
    behavior: 'smooth',
  });
});

nextBtn.addEventListener('click', () => {
  videoCards.scrollBy({
    left: window.innerWidth * 0.35, // Прокрутка на ширину одного элемента
    behavior: 'smooth',
  });
});



  