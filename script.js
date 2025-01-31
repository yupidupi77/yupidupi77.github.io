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
        // Основной зрачок не меняет трансформацию, только двигается за курсором
        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;

        // Увеличиваем размер основного зрачка без использования scaleY
        pupil.style.width = "30px";  // Исходный размер
        pupil.style.height = "30px"; // Исходный размер

        // Создаем второй зрачок, если он еще не создан
        if (!duplicatePupil) {
            // Создаем новый элемент для второго зрачка
            duplicatePupil = document.createElement('div');
            duplicatePupil.classList.add('pupil'); // Применим те же классы, что и к основному зрачку
            duplicatePupil.style.position = "absolute";
            duplicatePupil.style.width = "30px"; // Размер дубликата
            duplicatePupil.style.height = "120px"; // Второй зрачок будет в 4 раза длиннее
            duplicatePupil.style.backgroundColor = "rgb(39, 39, 39)";  // Темно-серый цвет

            duplicatePupil.style.borderRadius = "20px"; // Чтобы зрачок был круглым
            eyeWrapper.appendChild(duplicatePupil); // Добавляем его в контейнер
            
            // Устанавливаем начальную позицию второго зрачка
            duplicatePupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY + 74}px))`;
        }
    } else {
        // Возвращаем основной зрачок в исходное состояние
        pupil.style.transform = "translate(-50%, -50%)"; 
        pupil.style.width = "30px";  // Возвращаем исходный размер
        pupil.style.height = "30px"; // Возвращаем исходный размер
        
        if (duplicatePupil) {
            duplicatePupil.remove(); // Удаляем второй зрачок, если он существует
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
    
    const maxMove = 20; // Увеличиваем диапазон движения
    
    moveX = (deltaX / distance) * Math.min(distance, maxMove);
    moveY = (deltaY / distance) * Math.min(distance, maxMove);

    // Ограничиваем вертикальное движение зрачка (чтобы он не выходил за пределы глаза)
    if (words[currentIndex] === "atria.svg") {
        const eyeHeight = eyeRect.height;
        const pupilHeight = pupil.offsetHeight * 2; // Учитываем растянутую высоту зрачка
        const maxVerticalMove = eyeHeight / 1.5 - pupilHeight / 2; // Максимальное вертикальное отклонение

        moveY = Math.min(Math.max(moveY, -maxVerticalMove), maxVerticalMove);
    }

    // Двигаем основной зрачок (только перемещаем без изменения масштаба)
    pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;

    // Дублируем зрачок, только с фиксированным смещением по вертикали
    if (words[currentIndex] === "atria.svg" && duplicatePupil) {
        // Дублирующий зрачок следует за основным с фиксированным смещением по вертикали
        duplicatePupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY + 74}px))`;
    }
}

// Добавляем обработчик события для движения мыши только на экранах, ширина которых больше 720px
if (window.innerWidth > 720) {
    document.addEventListener('mousemove', handleMouseMove);
} else {
    // Если ширина экрана меньше 720px, удаляем обработчик движения мыши
    document.removeEventListener('mousemove', handleMouseMove);
}

// Плавное движение зрачка при ширине экрана меньше 720px (если тач)
const eyeRect = eyeWrapper.getBoundingClientRect();
const eyeCenterX = eyeRect.left + eyeRect.width / 2;
const eyeCenterY = eyeRect.top + eyeRect.height / 2;
const maxMove = 2; // Плавное движение для маленьких экранов

function smoothMovePupil() {
    if (window.innerWidth < 720) {
        moveX += (eyeCenterX - moveX) / 10; // Плавное движение по X
        moveY += (eyeCenterY - moveY) / 10; // Плавное движение по Y

        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        if (duplicatePupil) {
            duplicatePupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY + 74}px))`;
        }
    }

    requestAnimationFrame(smoothMovePupil); // Запуск следующего кадра
}

// Запуск плавного движения на мобильных устройствах
if (window.innerWidth < 720) {
    smoothMovePupil();
}

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
  
    // Масштабируем на 80% от ширины экрана
    const scaleValue = screenWidth * 0.0006; // 1200 - это базовая ширина, от которой мы масштабируем
  
    // Применяем масштабирование
    sloganContainer.style.transform = `scale(${scaleValue})`;
    sloganContainer.style.transformOrigin = 'center';  // Масштабирование от центра
  }
  
  // Вызываем функцию при загрузке страницы
  adjustScale();
  
  // Добавляем обработчик события для изменения размера окна
  window.addEventListener('resize', adjustScale);
  





  let rotationAngle = 0; // Угол поворота
  new fullpage("#fullpage", {
      autoScrolling: true,
      scrollHorizontally: true,
      onLeave: function (origin, destination, direction) {
          const backgroundImage = document.querySelector(".background-image");
  
          if (direction === "down") {
              rotationAngle += 90; // Вниз — поворот по часовой
          } else {
              rotationAngle -= 90; // Вверх — поворот против часовой
          }
  
          backgroundImage.style.transform = `rotate(${rotationAngle}deg)`;
      },
  });
  
  