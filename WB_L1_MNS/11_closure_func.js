//Первый пример
function makeWorker() {
    let name = 'Nikita';
    return function () {
        return `Имя работника: ${name}`
    }
}

//Второй пример с изменением счетчика c помощью функции-конструктора
    function Counter() {
        let count = 0;

        this.up = function () {
            ++count;
        }
        this.down = function () {
            --count;
        }
    }