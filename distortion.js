document.addEventListener("DOMContentLoaded", function () {
    const eyeContainer = document.querySelector(".eye-container");
    const bgImage = document.querySelector(".background-image");
    const pupil = document.querySelector(".pupil");
    const iconList = [
        "mic",              // Микрофон, для подкастинга
        "headphones",       // Наушники, для прослушивания
        "face",             // Лица, выражение эмоций
        "volume_up",        // Уровень громкости, настройка аудио
        "favorite",         // Любимые, популярные эпизоды
        "sentiment_satisfied", // Эмоциональное состояние
        "local_hospital",   // Больница, психическое здоровье
        "forum",            // Обсуждения, форумы
        "psychology",       // Психология, психическое здоровье
           // Чат для общения с подписчиками
        "record_voice_over",// Запись голоса, связанная с подкастингом
        "question_answer",  // Вопросы и ответы
    ];

    let lastIcon = ""; // Переменная для хранения последней выбранной иконки

    eyeContainer.addEventListener("click", function () {
        // Добавление фильтров для инверсии, черно-белого изображения и глитч-эффекта
        if (bgImage.style.filter === "invert(1) grayscale(1) hue-rotate(10deg)") {
            bgImage.style.filter = "invert(0) grayscale(0) hue-rotate(0deg)";
            bgImage.classList.add("glitch"); 
        } else {
            bgImage.style.filter = "invert(1) grayscale(1) hue-rotate(10deg)";
            bgImage.classList.add("glitch"); // Добавляем класс для глитча
        }

        // Выбираем случайную иконку, которая не совпадает с предыдущей
        let randomIcon = iconList[Math.floor(Math.random() * iconList.length)];

        // Проверка, если выбранная иконка совпадает с последней, выбираем другую
        while (randomIcon === lastIcon) {
            randomIcon = iconList[Math.floor(Math.random() * iconList.length)];
        }

        // Сохраняем текущую иконку для следующего выбора
        lastIcon = randomIcon;

        // Заменяем изображение на иконку
        pupil.src = `https://fonts.gstatic.com/s/i/materialicons/${randomIcon}/v9/24px.svg`;
        pupil.style.width = "48px";  // Увеличиваем ширину
        pupil.style.height = "48px"; // Увеличиваем высоту

        // Добавление анимации на контейнер с глазом
        eyeContainer.classList.add("bounce");

        // Убираем класс анимации через 0.5 секунды (по окончании анимации)
        setTimeout(() => {
            eyeContainer.classList.remove("bounce");
            bgImage.classList.remove("glitch");
        }, 300);

        // Убираем эффекты через 3 секунды с плавным переходом за 4 секунды
    });
});

