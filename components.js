document.addEventListener("DOMContentLoaded", function () {
    fetch('/components.html')
        .then(response => response.text())
        .then(data => {
            let tempContainer = document.createElement('div');
            tempContainer.innerHTML = data;

            let header = tempContainer.querySelector("#header");
            let footer = tempContainer.querySelector("#footer");

            let headerPlaceholder = document.getElementById("header-placeholder");
            let footerPlaceholder = document.getElementById("footer-placeholder");

            if (header && headerPlaceholder) {
                headerPlaceholder.innerHTML = header.innerHTML;
            }

            if (footer && footerPlaceholder) {
                footerPlaceholder.innerHTML = footer.innerHTML;
            }
        })
        .catch(error => console.error("Ошибка загрузки компонентов:", error));
});
