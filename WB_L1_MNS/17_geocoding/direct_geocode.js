//Ждем когда загрузится весь DOM
document.addEventListener('DOMContentLoaded',function () {
    //Реализуем функию дебоунсинга и защиту от троттлинга с помощью замыканий
    function debounce(func, delay) {
        let timeoutId;
        return function () {
            const context = this;
            const args = arguments;

            //Убираем прошлые задержки
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(context, args)
            }, delay)
        }
    }


    //Функция геокодинга
    function getGeocodingAddresses(address) {
        //Используем методы из API
        ymaps.geocode(address)
            .then((res) => {
                const addressCollection = res.geoObjects; //Коллекция результатов
                if (addressCollection.getLength() < 1) {
                    ymaps.ready(addElement('Ничего не нашлось по запросу'));
                }
                addressCollection.each((item) => {
                    ymaps.ready(addElement(item.getAddressLine())); //По каждому адресу создаем li
                })
            })
            .catch((e) => {
                throw new Error(`Не удалось обработать запрос. Ошибка: ${e}`)
            })
    }

    //Объявление DOM элементов
    const addressInput = document.querySelector('#inputAddress');
    const addressSuggestions = document.querySelector('#addressSuggestions');

    //Создаем элемент списка
    function addElement(text) {
        let li = document.createElement('li');
        li.textContent = text;
        addressSuggestions.appendChild(li)
    }

    //Дебаунс для события input, чтобы избежать чрезмерные вызовы API
    const debouncedGeocode = debounce(function () {
        const inputValue = addressInput.value;
        if (addressSuggestions.innerHTML !== '') {
            addressSuggestions.innerHTML = '';
        }
        if (inputValue === '') {
            addressSuggestions.innerHTML = '';
        }

        getGeocodingAddresses(inputValue);
    }, 1750); // Здесь проставляем нужную задержку

    // Добавляем event listener по input к инпуту
    addressInput.addEventListener('input', debouncedGeocode);
});