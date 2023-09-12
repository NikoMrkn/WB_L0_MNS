let passInput = document.querySelector('#password-field')
let ul = document.querySelector('.password-message')

passInput.addEventListener('input', function () {
    ul.innerHTML = '';
    const result = evaluatePasswordStrength(this.value);
    if (result !== '') {
        ul.style = 'display: block';
    } else {ul.style = 'display: none';}
})

function evaluatePasswordStrength(password) {
    // Минимальные требования для считания пароля "сильным"
    const minLength = 8; //мин длина
    const hasUpperCase = /[A-Z]/.test(password); //имеет заглавные буквы
    const hasLowerCase = /[a-z]/.test(password); //строчные буквы
    const hasNumber = /\d/.test(password); //число
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password); //специальные символы

    let strength = 0;
    let arrRecommends = [];
    // Проверяем длину пароля
    if (password.length >= minLength) {
        strength++;
    } else {
        arrRecommends.push('Пароль должен быть длинее 8 символов');
    }

    // Проверяем наличие разных видов символов
    if (hasUpperCase) {
        strength++;
    } else {
        arrRecommends.push('В пароле должны присутсвовать заглавные буквы');
    }
    if (hasLowerCase) {
        strength++;
    } else {
        arrRecommends.push('В пароле должны присутсвовать строчные буквы');
    }
    if (hasNumber) {
        strength++;

    } else {
        arrRecommends.push('Пароль должен содержать цифры');
    }
    if (hasSpecialChar) {
        strength++;

    } else {
        arrRecommends.push('Пароль должен содержать спец. символы: !@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-');
    }

    // Оценка сложности
    let result = '';
    if (strength === 5) {
        result = "Очень сильный пароль";
    } else if (strength >= 3) {
        result = "Сильный пароль";
    } else if (strength >= 2) {
        result = "Средний пароль";
    } else if (strength >= 1) {
        result = "Слабый пароль";
    } else {
        result = "Очень слабый пароль";
    }
    if (arrRecommends.length > 0) {
        arrRecommends.forEach( (item) => {
            console.log(item);
            createAppendLi(item);
        })

    }
    return result
}
function createAppendLi(text) {
    let li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
}