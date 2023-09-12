const form = document.getElementById('myForm');

//Добавляяем обработчика события отправки формы
form.addEventListener('submit', function (event) {
    event.preventDefault(); //Предотвращаем отправку формы на сервер

    //Получаем данные из полей формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    //Отображаем всплывающее окно с результатами
    alert(`Пользователь ввел следующие данные: Имя - ${name}, почта - ${email}`);
})