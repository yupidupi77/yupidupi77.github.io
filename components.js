document.addEventListener("DOMContentLoaded", function () {
    fetch('/components.html')
        .then(response => response.text()) // Получаем HTML-файл как текст
        .then(data => {
            // Создаем временный контейнер, чтобы парсить HTML
            let tempContainer = document.createElement('div');
            tempContainer.innerHTML = data;

            // Вставляем хедер
            let header = tempContainer.querySelector("#header");
            if (header) {
                document.getElementById("header-placeholder").innerHTML = header.innerHTML;
            }

            // Вставляем футер
            let footer = tempContainer.querySelector("#footer");
            if (footer) {
                document.getElementById("footer-placeholder").innerHTML = footer.innerHTML;
            }
        })
        .catch(error => console.error("Ошибка загрузки компонентов:", error));
});
