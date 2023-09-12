const maxLocalStorageSize = 5 * 1024 * 1024; // Максимальный размер localStorage в байтах (например, 5 МБ).

let currentUrl = window.location.href;
let a = document.createElement('a');
let body = document.querySelector('body');
a.href = `https://oauth.vk.com/authorize?client_id=51745467&redirect_uri=${currentUrl}&response_type=token`;
a.textContent = 'Ссылка на ВК';
body.appendChild(a);

const token = window.location.hash.split("=")[1].split("&")[0];
console.log(token);

// Функция для подсчета размера данных в localStorage.
function calculateLocalStorageSize() {
    const totalDataSize = Object.keys(localStorage).reduce((size, key) => {
        const item = localStorage.getItem(key);
        if (item) {
            const blob = new Blob([item]);
            size += blob.size;
        }
        return size;
    }, 0);
    return totalDataSize;
}


// Функция для отображения размера занятой памяти.
function displayLocalStorageSize() {
    const currentSize = calculateLocalStorageSize();
    console.log(`Размер занятой памяти: ${currentSize} байт / ${maxLocalStorageSize} байт`);
}

// Обработчик события изменения данных в localStorage.
window.addEventListener("storage", (event) => {
    if (event.storageArea === localStorage) {
        displayLocalStorageSize();
    }
});

// Функция для загрузки постов из VK API.
function loadPosts(offset = 0) {
    VK.Api.call(
        "wall.get",
        {
            owner_id: -29534144,
            count: 10,
            offset: offset,
            access_token: token,
            v: 5.131,
        },
        (response) => {
            if (response && response.response) {
                // Обработка полученных данных и отображение постов в виджете.
                const posts = response.response.items;
                displayPosts(posts);

                // Кэширование данных в localStorage.
                cachePosts(posts);
            } else {
                console.error("Ошибка при загрузке постов из VK API:", response);
            }
        }
    );
}

// Функция для отображения постов в виджете.
function displayPosts(posts) {
    const widgetContainer = document.getElementById("widget-container");

    posts.forEach((post, index) => {
        // Создаем контейнер для каждого поста.
        const postContainer = document.createElement("div");
        postContainer.className = "post-container";

        // Создаем элемент для текста поста.
        const postText = document.createElement("p");
        postText.textContent = post.text;
        postContainer.appendChild(postText);

        // Добавляем горизонтальную линию в качестве разделителя (кроме последнего поста).
        if (index < posts.length - 1) {
            const divider = document.createElement("hr");
            postContainer.appendChild(divider);
        }

        // Добавляем контейнер с постом в виджет.
        widgetContainer.appendChild(postContainer);
    });
}

// Функция для кэширования данных в localStorage с вытеснением старых данных при необходимости.
function cachePosts(posts) {
    const cachedData = localStorage.getItem("cachedData");
    const cachedPosts = cachedData ? JSON.parse(cachedData) : [];

    // Добавляем новые посты в начало массива.
    cachedPosts.unshift(...posts);

    // Удаляем старые данные, чтобы укладываться в квоту.
    while (calculateLocalStorageSize(cachedPosts) > maxLocalStorageSize) {
        cachedPosts.pop(); // Удаляем последний пост (самый старый).
    }

    // Сохраняем обновленные данные в localStorage.
    localStorage.setItem("cachedData", JSON.stringify(cachedPosts));
}

// Функция для инициализации виджета.
function initWidget() {
    // Загрузка данных из кэша (если они есть).
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
        const cachedPosts = JSON.parse(cachedData);
        displayPosts(cachedPosts); // Отобразить данные в виджете.
    }

    const widgetContainer = document.getElementById("widget-container");

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
}

// Вызов функции для отображения размера занятой памяти при загрузке страницы.
displayLocalStorageSize();

// Вызываем функцию инициализации виджета.
initWidget();
