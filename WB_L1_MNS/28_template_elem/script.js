function createAddElement() {
    // Получаем шаблон из DOM
    const template = document.getElementById('my-template');

    // Клонируем содержимое шаблона
    const clone = document.importNode(template.content, true);

    // Добавляем клонированный элемент в контейнер в DOM
    const container = document.getElementById('container');
    container.appendChild(clone);
}
