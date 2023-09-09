// Создаем элемент списка со свойстом для данных и свойстовм-ссылкой на другой элемент-объект
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function jsonToList(jsonArr) {
	//проверка: является ли аргумент массивом и есть ли какое либо значение
    if (!jsonArr || !Array.isArray(jsonArr)) {
        throw new Error("Данные должны быть валидным JSON массивом");
    }
	
	//Создаем "шапку" списка
    const head = new Node(null);
    let current = head;
	
	//Добавляем элементы к так называемому списку
    for (const item of jsonArray) {
        current.next = new Node(item);
        current = current.next;
    }
	
	// возвращаем этот объект
    return head.next;
}

//Пример: получаем JSON, потом преобразуем в массив объектов и вызываем нашу функцию
const jsonStr = '[{"value": 1}, {"value": 2}, {"value": 3}]';
const jsonArк = JSON.parse(jsonString);

const linkedList = jsonToList(jsonArray);
