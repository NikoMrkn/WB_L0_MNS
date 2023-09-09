async function fetchData(url) {
    try {
        //Отправляем запрос к серверу
        const response = await fetch(url);
        // Если статус ответа ок, обрабатываем
        if (response.status === 200) {
            // Еще раз используется await для извлечения и анализа данных JSON
            const data = await response.json();
            return data // Возвращаем проанализированные данные
        } else {
            //Если не ок, то вызываем ошибку
            throw new Error(`Не удалось получить данные. Статус: ${response.status}`)

        }
    } catch (e) {
        //Обработка всех ошибок, возникающих во время асинхронных операций
        throw e;
    }
}

//Пример использования
fetchData("https://api.publicapis.org/entries")
    .then(data => console.log(`Fetched data: ${data}`))
    .catch(error => console.log('Error', error));