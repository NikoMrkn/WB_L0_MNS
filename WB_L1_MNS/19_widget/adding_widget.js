const widgetContainer = document.getElementById("widget-container");
const maxLocalStorageSize = 5 * 1024 * 1024; // Максимальный размер localStorage в байтах (например, 5 МБ).

let currentUrl = window.location.href;
let a = document.createElement('a');
let body = document.querySelector('body');
a.href = `https://oauth.vk.com/authorize?client_id=51745467&redirect_uri=${currentUrl}&response_type=token`;
a.textContent = 'Ссылка на ВК';
body.appendChild(a);

const token = window.location.hash;
console.log(token);


// Функция для загрузки постов из VK API.
/*function loadPosts(offset = 0) {
    VK.Api.call(
        "wall.get",
        {
            owner_id: -29534144,
            count: 10,
            offset: offset,
        },
        (response) => {
            if (response && response.response) {
                // Обработка полученных данных и отображение постов в виджете.
                // ...

                // Кэширование данных в localStorage.
                let cachedData = localStorage.getItem("cachedData") || "[]";
                const newData = JSON.stringify(response.response.items);
                const totalDataSize = (cachedData.length + newData.length) * 2; // Учитываем размер данных в байтах.

                // Если размер данных превысил максимальный лимит, удаляем старые данные.
                while (totalDataSize > maxLocalStorageSize) {
                    const cachedPosts = JSON.parse(cachedData);
                    cachedPosts.shift(); // Удаляем первый элемент (самый старый пост).
                    localStorage.setItem("cachedData", JSON.stringify(cachedPosts));
                    cachedData = localStorage.getItem("cachedData") || "[]";
                }

                // Сохраняем новые данные в localStorage.
                const cachedPosts = JSON.parse(cachedData);
                cachedPosts.push(response.response.items);
                localStorage.setItem("cachedData", JSON.stringify(cachedPosts));
            } else {
                console.error("Ошибка при загрузке постов из VK API:", response);
            }
        }
    );
}*/

// Функция для инициализации виджета.
/*function initWidget() {
    // Загрузка данных из кэша (если они есть).
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
        const cachedPosts = JSON.parse(cachedData);
        // Отобразить данные в виджете.
        // ...
    }

    // Инициализация обработчика прокрутки для подгрузки новых постов.
    widgetContainer.addEventListener("scroll", () => {
        if (
            widgetContainer.scrollTop + widgetContainer.clientHeight >=
            widgetContainer.scrollHeight
        ) {
            // Достигнут конец виджета, загружаем новые посты.
            // Рассчитываем смещение на основе уже загруженных постов.
            const cachedData = localStorage.getItem("cachedData");
            const cachedPosts = cachedData ? JSON.parse(cachedData) : [];
            const offset = cachedPosts.length;
            loadPosts(offset);
        }
    });

    // Первоначальная загрузка постов.
    loadPosts();
}*/

// Вызываем функцию инициализации виджета.
/*initWidget();*/
