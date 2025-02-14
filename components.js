// components.js

window.onload = function() {
    // Загружаем хедер
    fetch('components.js')
        .then(response => response.text())
        .then(data => {
            // Вставляем хедер в нужное место
            document.querySelector('#header-placeholder').innerHTML = data.match(/<div id="header">([\s\S]*?)<\/div>/)[1];
            document.querySelector('#footer-placeholder').innerHTML = data.match(/<div id="footer">([\s\S]*?)<\/div>/)[1];
        });
};
