function getImageData(imageUrl) {
    return new Promise((resolve, reject) => {
        //Используем API fetch, чтобы сделать HTTPS запрос на картинку
        fetch(imageUrl)
            .then(response => {
                // Проверка ок статус или нет? (код: 200)
                if (response.status === 200) {
                    // Извлекаем данные картинки и успешно выполняем промис
                    const imageData = {
                        url: imageUrl,
                        contentType: response.headers.get('content-type'),
                        contentLength: response.headers.get('content-length'),
                    };
                    resolve(imageData);
                } else {
                    // Если ответ не ок, то завершаем его с вызовом ошибки
                    reject(new Error(`Не удалось получить изображение. Статус: ${response.status}`));
                }
            })
            .catch(error => {
                // Обработки всех ошибок, связанных с сетью и не только.
                reject(error);
            });
    });
}