


document.addEventListener("DOMContentLoaded", () => {

  


    gsap.registerPlugin(ScrollTrigger);

  

    document.querySelectorAll(".content-blockquote").forEach((blockquote) => {
        // Разделение текста блока на отдельные буквы
        const text = new SplitType(blockquote, { types: "chars, words"});
        
        // Анимация текста
        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: blockquote,
                start: "top 80%",  // Начинаем анимацию, когда верх блока достигнет 80% высоты экрана
                end: "top 20%",    // Заканчиваем, когда верх блока достигнет 20% высоты экрана
                scrub: true,       // Синхронизация анимации с прокруткой
                markers: false,    // Отключение маркеров для дебага
            },
            opacity: 0,             // Начальная прозрачность
            y: 50,                  // Смещение по оси Y (вниз)
            stagger: 0.05,          // Задержка между буквами
            ease: "power2.out",  
            filter: "blur(40px)",    // Тип анимации
        });
        
        // Анимация заголовков
        document.querySelectorAll(".block-heading_h2", blockquote).forEach((heading) => {
            const headingText = new SplitType(heading, { types: "chars"});
    
            // Анимация заголовков
            gsap.from(headingText.chars, {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 80%",  // Начинаем анимацию, когда верх блока заголовка достигнет 80% высоты экрана
                    end: "top 20%",    // Заканчиваем, когда верх блока заголовка достигнет 20% высоты экрана
                    scrub: true,       // Синхронизация анимации с прокруткой
                    markers: false,    // Отключение маркеров для дебага
                },
                opacity: 0,             // Начальная прозрачность
                y: 50,       
                filter: "blur(40px)",        // Смещение по оси Y (вниз)
                stagger: 0.05,          // Задержка между буквами
                ease: "power2.out",     // Тип анимации
            });
        });
    });
    




    // Регистрация плагина ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Инициализация анимации для каждого изображения с классом content-img
document.querySelectorAll('.content-img').forEach(img => {
  gsap.fromTo(img, 
    {
      opacity: 0.5,
      scale: 0.8, // Начальный масштаб
      rotation: 9, // Начальный угол
      filter: "blur(40px) grayscale(1)", 
    },
    {
    filter: "blur(0px) grayscale(0)", 
      opacity: 1, // Прозрачность до нормальной
      scale: 1,   // Масштаб до 1 (без увеличения)
      rotation: 0, // Легкое вращение
      scrollTrigger: {
        trigger: img,
        start: 'top 80%', // Начало анимации, когда верх изображения достигает 80% высоты экрана
        end: 'top 30%',   // Заканчиваем анимацию, когда верх изображения достигает 30% высоты экрана
        duration: 3,  // Синхронизация анимации с прокруткой
        markers: false, // Убираем маркеры для отладки
        toggleActions: 'play none none reverse' // Игнорируем на прокрутку вверх
      },
      ease: "power1.out", // Тип анимации
    }
  );
});

    
    
    

    // Анимация текста
   /* const splitTypes = document.querySelectorAll(".text-reveal");
    
    splitTypes.forEach((char) => {
        const text = new SplitType(char, { types: "chars, words" });
    
        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: char,
                start: "top 60%",
                end: "top 20%",
                scrub: true,
                markers: false,
            },
            y: 100,
            opacity: 0,
            stagger: 0.05,
            ease: "power.out",
        });
    
        // Анимация SVG внутри текста
        const svgs = char.querySelectorAll("img");
    
        gsap.from(svgs, {
            scrollTrigger: {
                trigger: char,
                start: "top 70%",
                end: "top 10%",
                scrub: true,
            },
            scale: 0.2,
            opacity: 0,
            x:200,
            y:100,
            rotation: -720,
            stagger: 0.2,
            ease: "power.out",
        });
    });
    

    // === Анимация появления всех контейнеров ===
    gsap.utils.toArray(".content-blockquote").forEach((content-blockquote, index) => {
        gsap.fromTo(
            content-blockquote,
            {
                scale: 1,       // Начальный размер (чуть меньше)
                opacity: 0.8,       // Полностью прозрачный
                    // Легкий наклон по оси X
                filter: "blur(200px)", // Размытие
            },
            {
                scale: 1,         // Возвращаем к обычному размеру
                // Полная видимость
                      // Убираем наклон
                filter: "blur(0px)", // Убираем размытие
                duration: 2,    // Длительность анимации
                ease: "power3.out", // Плавное ускорение/замедление
                scrollTrigger: {
                    trigger: container,
                    start: "top 70%", 
                    end: "top 30%", 
                    scrub: true,
                    markers: false,
                },
                stagger: 0.1, // Задержка между элементами
            }
        );
    });
    
*/
    // === Настройка плавного скролла Lenis ===
    const lenis = new Lenis();

 

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
});


// Получаем элемент полосы прогресса
const progressBar = document.querySelector('.progress-bar');

// Функция для обновления ширины полосы
function updateProgressBar() {
    // Вычисляем процент прокрутки
    const scrollPosition = window.scrollY; // Текущая прокрутка
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight; // Общая высота страницы
    const scrollPercentage = (scrollPosition / pageHeight) * 100;

    // Обновляем ширину полосы прогресса
    progressBar.style.width = scrollPercentage + '%';
}

// Добавляем обработчик события прокрутки
window.addEventListener('scroll', updateProgressBar);

// Инициализация при загрузке страницы (на случай, если скроллинг уже произошел)
updateProgressBar();

const observer = new MutationObserver(() => {
    initStickyScroll(); // Перезапускаем функцию скрытия
});

// Наблюдаем за изменениями в body (вдруг элементы подгрузятся позже)
observer.observe(document.body, { childList: true, subtree: true });

function initStickyScroll() {
    let lastScrollTop = 0;
    const stickyElements = document.querySelectorAll(".sticky-link, .sticky-link2");

    if (stickyElements.length === 0) return; // Если элементов нет, просто выходим

    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        stickyElements.forEach(element => {
            if (scrollTop > lastScrollTop) {
                element.classList.add("hide");
            } else {
                element.classList.remove("hide");
            }
        });

        lastScrollTop = Math.max(scrollTop, 0);
    });
}

