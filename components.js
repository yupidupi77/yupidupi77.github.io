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

                // Обработчик отправки формы
                document.body.addEventListener('submit', function(e) {
                    if (e.target && e.target.id === 'subscribeForm') {
                        e.preventDefault();
                        let email = document.querySelector('input[name="email"]').value;

                        
                        // Показываем попап сразу
                        showPopup();
                        formFilled();
                        document.querySelector('#subscribeForm').reset(); 

                        fetch('https://script.google.com/macros/s/AKfycbyqa8ddnvHW_ldLiC2u_EHrYKJpNkZE-eT-MqmtHqiJ9bL5pvHPgMAorDOEn9lMUPTH/exec', {
                            method: 'POST',
                            body: new URLSearchParams({ email: email }),
                        })
                        .then(response => response.text())
                       
                        .catch(error => {
                            alert('Сталася помилка. Спробуйте ще раз.');
                        });
                    }
                });

                // Закрытие попапа по клику на фон или кнопку
                document.body.addEventListener('click', function(e) {
                    if (e.target.classList.contains('popup-overlay') || e.target.classList.contains('popup-close')) {
                        closePopup();
                    }
                });
            }
        })
        .catch(error => console.error("Ошибка загрузки компонентов:", error));
});

// Функция показа попапа
function showPopup() {
    let popup = document.getElementById('thankYouPopup');
    popup.style.display = 'flex';

    // Автоматическое закрытие через 3 секунды
    setTimeout(() => {
        closePopup();
    }, 2000);
}
function formFilled() {
    let formm = document.getElementById('subscribeForm');
    formm.style.display = 'none';}

// Функция закрытия попапа
function closePopup() {
    document.getElementById('thankYouPopup').style.display = 'none';
}
