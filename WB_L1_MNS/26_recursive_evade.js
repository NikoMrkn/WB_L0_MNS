function recursiveDOMEvade(node) {
    //Проверка явялется ли узел HTML элементом
    if (node.nodeType === Node.ELEMENT_NODE) {
        // Выводим информацию о теге в консоль
        console.log(`Тег: ${node.tagName}`);

        // Рекурсивно обходим всех детей текущего элемента
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
            recursiveDOMEvade(children[i]);
        }
    }
}