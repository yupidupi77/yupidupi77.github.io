document.addEventListener("DOMContentLoaded", function () {
    const eyeContainer = document.querySelector(".eye-container");
    const bgImage = document.querySelector(".background-image");
    const pupil = document.querySelector(".pupil");

    const allImages = [
        "images/globe_with_meridians.png", "images/heart.png", "images/herb.png", "images/son.png",
        "images/pill.png", "images/snowflake.png", "images/sunglasses.png", "images/clinking_glasses.png", "images/alien.png"
    ];

    let availableImages = [...allImages];

    eyeContainer.addEventListener("click", function () {
        bgImage.style.filter = bgImage.style.filter === "invert(1) grayscale(1) hue-rotate(10deg)" 
            ? "invert(0) grayscale(0) hue-rotate(0deg)" 
            : "invert(1) grayscale(1) hue-rotate(10deg)";
        
        bgImage.classList.add("glitch");

        if (availableImages.length === 0) {
            availableImages = [...allImages]; // Перезаполняем массив
        }

        let randomIndex = Math.floor(Math.random() * availableImages.length);
        let newIcon = availableImages.splice(randomIndex, 1)[0]; // Удаляем выбранное изображение из массива

        pupil.src = newIcon;
        pupil.style.width = "48px";http://127.0.0.1:3000/images/eye.svg
        pupil.style.height = "48px";

        eyeContainer.classList.add("bounce");

        setTimeout(() => {
            eyeContainer.classList.remove("bounce");
            bgImage.classList.remove("glitch");
        }, 300);
    });
});
