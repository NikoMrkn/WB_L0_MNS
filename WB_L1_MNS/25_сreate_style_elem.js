//Создаем функцию, которая получает в качестве первого аргумента строку с названием элемента. Второй - объект со свойствами.
function createStyleElem(tagName, styles) {
    const element = document.createElement(tagName);

    //Устанавливаем стили для элемента
    for (let property in styles) {
        //Исключаем унаследанные свойства
        if (styles.hasOwnProperty(property)) {
            element.style[property] = styles[property];
        }
    }
    //Добавляем элемент в DOM (в данном примере это будет body)
    document.body.appendChild(element)

    return element //Возвращаем созданный элемент
}