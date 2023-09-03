// Список товаров в наличии

let arrGoods = [
    {
        id: 'good1',
        img: 'main/good1_3853.svg',
        title: 'Футболка UZcotton мужкская',
        propert: ['Цвет: белый', 'Размер: 56'],
        store: 'ООО Вайлдбериз',
        quantity: 1,
        remain: 'Осталось 2 шт.',
        newPrice: 522,
        oldPrice: 1051,
},
    {
        id: 'good2',
        img: 'main/case.png',
        title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        propert: ['Цвет: прозрачный'],
        store: 'ООО Мегапрофстиль',
        quantity: 200,
        remain: null,
        newPrice: 2100047,
        oldPrice: 2300047,
    },
    {
        id: 'good3',
        img: 'main/pencils.png',
        title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        propert: null,
        store: 'ООО Вайлдбериз',
        quantity: 1,
        remain: 'Осталось 2 шт.',
        newPrice: 494,
        oldPrice: 950,
    }]

for (let item of arrGoods) {
    let div = document.createElement('div');
    let list = document.querySelector('.accordion__list');
    div.classList.add('accordion__list-item' , 'list-item');
    div.innerHTML = `<div class="list-item__wrap">
                        <label class="list-item__checkbox checkbox">
                            <input type="checkbox" checked name="accord__checkbox" data-goodid="${item.id}">
                            <span class="checkbox__decor"></span>
                        </label>
                        <div class="list-item__good">
                            <a href="#"><img src="${item.img}" alt="${item.title}"></a>
                            <div class="list-item__good-info">
                            <a href="#" class="good-info__title"><span>${item.title}</span></a>
                        <div class="good-info__properties"></div>
                        <div class="good-info__properties good-info__properties--variable">
                            <p class="good-info__store"><span class="good-info__item">Коледино WB</span></p>
                        <p class="good-info__store"><span class="good-info__item">${item.store}</span><span class="tip-info">i</span></p>
                        </div>
                        </div>
                        </div>
                        <div class="list-item__count-price">
                            <div class="list-item__count count">
                                <div class="count__wrap">
                                    <div class="count__input-number">
                                        <button type="button" class="count__minus minus"></button>
                                        <span class="count__numeric type_number ignore">${item.quantity}</span>
                                        <button type="button" class="count__plus plus"></button>
                                     </div>
                                 </div>
                                <div class="action__btn"><div class="list-item__btn btn">
                                    <button type="button" class="btn__postpone"><span>В избранное</span></button>
                                    <button type="button" class="btn__del"><span>Удалить</span></button>
                                </div>
                             </div>
                        </div>
                        <div class="list-item__price">
                            <div class="list-item__price-new">${new Intl.NumberFormat('ru').format(item.newPrice)} сом</div>
                        <div class="list-item__price-old">${new Intl.NumberFormat('ru').format(item.oldPrice)} сом</div>
                        </div>
                        </div>
                        </div>
                     </div> `;
    let propItems = item.propert;
    if (propItems !== null) {
        for (let i = 0; i < propItems.length; i++) {
            let divProp = div.querySelector('.good-info__properties');
            let p = document.createElement('p');
            p.classList.add('good-info__color');
            p.innerHTML = `<span class="good-info__item">${propItems?.[i]}</span>`;
            divProp.append(p);
        }

    }
    if (item.remain != null){
        let divRemain = div.querySelector('.count__input-number');
        divRemain.insertAdjacentHTML('afterend', '<p class="count__storage">Осталось 2 шт.</p>')
    }
    list.append(div);
}
let totalPriceNew = 0;
let totalPriceOld = 0;
let quantityOfGoods = 0;
arrGoods.forEach((item) => totalPriceNew += item.newPrice);
arrGoods.forEach((item) => totalPriceOld += item.oldPrice);
arrGoods.forEach((item) => quantityOfGoods += item.quantity);

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

//Prices and quantity
let accordCount = document.querySelector('.accordion__count');
let accordionPrice = document.querySelector('.accordion__price')
let totalSum = document.querySelector('.total__sum');
let orderButton = document.querySelector('button[name="ConfirmOrderByRegisteredUser"]');
let totalSumSidebar = document.querySelector('.total-sum-sidebar');
let totalQuantitySidebar = document.querySelector('.quantity-sidebar');
let totalSumOldSidebar = document.querySelector('.total-sum-old-sidebar');



accordCount.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
accordionPrice.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
totalSum.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
totalSumSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
totalQuantitySidebar.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
totalSumOldSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew - totalPriceOld)} сом`;


// Шапка корзины в наличии
let list = document.querySelector('.accordion__list');
let button = document.querySelector('.accordion-header');
let totalBasket = document.querySelector('.accordion__info');
let checkBoxText = document.querySelector('.checkbox-with-text');
let buttonNotAvailable = document.querySelector('.accordion-header__not-available');
let listNotAvailable = document.querySelector('.accordion__list__not-available')




button.addEventListener('click', function() {
    if (!list.classList.contains('closed-list')) {
        list.classList.add('closed-list');
        button.classList.add('closed');
        totalBasket.style = 'display: block;';
        checkBoxText.style = 'display: none;';}
    else {
        list.classList.remove('closed-list');
        button.classList.remove('closed');
        totalBasket.style = 'display: none;';
        checkBoxText.style = 'display: inline-block;'
    }

});

buttonNotAvailable.addEventListener('click', function() {
    if (!listNotAvailable.classList.contains('closed-list')) {
        listNotAvailable.classList.add('closed-list');
        buttonNotAvailable.classList.add('closed');
        }
    else {
        listNotAvailable.classList.remove('closed-list');
        buttonNotAvailable.classList.remove('closed');
    }

})

let inputHeader = document.querySelector('input[name="header__checkbox"]');
let inputs = document.querySelectorAll('input[name="accord__checkbox"]');

inputs.forEach((item) => {
    item.addEventListener('click', function () {
        if (item.checked === false) {
            inputHeader.checked = false;
        }
        let checkBoxArr = [];
        inputs.forEach((input) => checkBoxArr.push(input.checked))
        const checkBoxItems = checkBoxArr.every((checkbox) => checkbox === true);
        if (checkBoxItems) {
            inputHeader.checked = true;
        }
    })
});

inputs.forEach((input) => {
    const goodItem = arrGoods.find((good) => good.id === input.dataset.goodid);
    if (goodItem) {
        input.addEventListener('change', function() {
            if (input.checked === false) {
                quantityOfGoods -= goodItem.quantity;
                totalPriceNew -= goodItem.newPrice;
                totalPriceOld -= goodItem.oldPrice}
            else {
                quantityOfGoods += goodItem.quantity;
                totalPriceNew += goodItem.newPrice
                totalPriceOld += goodItem.oldPrice;

            }
            accordCount.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
            accordionPrice.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
            totalSum.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
            totalSumSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
            totalQuantitySidebar.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
            totalSumOldSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew - totalPriceOld)} сом`;
        })
    }
});

inputHeader.addEventListener('click', function () {
    if (inputHeader.checked === false) {
        arrGoods.forEach((item) => totalPriceNew -= item.newPrice);
        arrGoods.forEach((item) => totalPriceOld -= item.oldPrice);
        arrGoods.forEach((item) => quantityOfGoods -= item.quantity);
        accordCount.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
        accordionPrice.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
        totalSum.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
        totalSumSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
        totalQuantitySidebar.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
        totalSumOldSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew - totalPriceOld)} сом`;
        for (let i of inputs) {
            i.checked = false;
        }
    } else {
        arrGoods.forEach((item) => totalPriceNew += item.newPrice);
        arrGoods.forEach((item) => totalPriceOld += item.oldPrice);
        arrGoods.forEach((item) => quantityOfGoods += item.quantity);
        accordCount.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
        accordionPrice.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
        totalSum.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
        totalSumSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew)} сом`;
        totalQuantitySidebar.textContent = `${quantityOfGoods} ${getNoun(quantityOfGoods, 'товар', 'товара', 'товаров')}`;
        totalSumOldSidebar.textContent = `${new Intl.NumberFormat('ru').format(totalPriceNew - totalPriceOld)} сом`;
        for (let i of inputs) {
            i.checked = true;
        }
    }

});


//SideBar section
let buttonNow = document.querySelector('input[name="now"]');
let p = document.querySelectorAll('.payment_now');


buttonNow.addEventListener('click', function () {
    if (buttonNow.checked === true) {
        p.forEach((p) => p.style = `display: none;`)
        orderButton.textContent = `Оплатить ${totalSum.textContent}`;
    } else {
        p.forEach((p) => p.style = `display: block;`)
        orderButton.textContent = 'Заказать';
    }
});


//Inputs
let fields = document.querySelectorAll('.fill__fields');
fields.forEach( (item) => {
    let inputInfo = item.querySelector('input[name="input-info"]');
    let textInfo = item.querySelector('.name__of-field')
    inputInfo.onfocus = function() {
        textInfo.style = 'display: block;'
    };
    /*inputInfo.onblur = function() {
        textInfo.style = 'display: none;'
    }*/
});
let inputName = document.querySelector('#name');
inputName.addEventListener('blur', function () {
    if (/[\d*.a-z]/g.test(this.value)) {
        this.style = 'color: #F55123;';
        document.querySelector('.name__error').style = 'display: block;';
    } else {
        this.style = 'color: #000000;';
        document.querySelector('.name__error').style = 'display: none;';
    }
});

let inputSurname = document.querySelector('#surname');
inputSurname.addEventListener('blur', function () {
    if (/[\d*.a-z]/g.test(this.value)) {
        this.style = 'color: #F55123;';
        document.querySelector('.surname__error').style = 'display: block;';
    } else {
        this.style = 'color: #000000;'
        document.querySelector('.surname__error').style = 'display: none;';
    }
});

let inputMail = document.querySelector('#email');
inputMail.addEventListener('blur', function () {
    if (!this.value.includes('@')) {
        this.style = 'color: #F55123;';
        document.querySelector('.mail__error').style = 'display: block;';
        document.querySelector('.mail__error-empty').style = 'display: none;';
    } else {
        this.style = 'color: #000000;'
        document.querySelector('.mail__error').style = 'display: none;';
    }
});

let inputPhone = document.querySelector('#phone');
inputPhone.addEventListener('blur', function () {
    if (!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/g.test(this.value)) {
        this.style = 'color: #F55123;'
        document.querySelector('.phone__error').style = 'display: block;';
        document.querySelector('.phone__error-empty').style = 'display: none;';
    } else {
        this.style = 'color: #000000;'
        document.querySelector('.phone__error').style = 'display: none;';
    }
})

let inputInn = document.querySelector('#inn');
inputInn.addEventListener('blur', function () {
    if (/[^\d]/g.test(this.value)) {
        this.style = 'color: #F55123;'
        document.querySelector('.inn__error').style = 'display: block;';
        document.querySelector('.inn__info').style = 'display: none;';
        document.querySelector('.inn__error-empty').style = 'display: none;';
    } else {
        this.style = 'color: #000000;'
        document.querySelector('.inn__error').style = 'display: none;';
        document.querySelector('.inn__info').style = 'display: block;';
    }
});

let editDelivery = document.querySelectorAll('.edit-delivery');

editDelivery.forEach( (trigger) => {

// получаем ширину отображенного содержимого и толщину ползунка прокрутки
    const windowInnerWidth = document.documentElement.clientWidth;
    const scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

// привязываем необходимые элементы
    const bodyElementHTML = document.querySelector("body");
    const modalBackground = document.querySelector(".modalBackground");
    const modalClose = document.querySelector(".modalClose");
    const modalActive = document.querySelector(".modalActive");

    trigger.addEventListener("click", function () {
        // делаем модальное окно видимым
        modalBackground.style.display = "block";

        // если размер экрана больше 1366 пикселей (т.е. на мониторе может появиться ползунок)
            });

    modalClose.addEventListener("click", function () {
        modalBackground.style.display = "none";
            });

// закрытие модального окна на зону вне окна, т.е. на фон
    modalBackground.addEventListener("click", function (event) {
        if (event.target === modalBackground) {
            modalBackground.style.display = "none";
                    }
    });
    let buttonCloseAddress = document.querySelector('.address-choose');
    buttonCloseAddress.addEventListener('click', function () {
        modalBackground.style.display = "none";
            });
});

const editPayment = document.querySelectorAll('.edit-payment');
editPayment.forEach((trigger) => {
    const windowInnerWidth = document.documentElement.clientWidth;
    const scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

// привязываем необходимые элементы
    const bodyElementHTML = document.querySelector("body");
    const modalBackground = document.querySelector(".modalBackground2");
    const modalClose = document.querySelector(".modalClose2");
    const modalActive = document.querySelector(".modalActive2");

    trigger.addEventListener("click", function () {
        // делаем модальное окно видимым
        modalBackground.style.display = "block";
    });

    modalClose.addEventListener("click", function () {
        modalBackground.style.display = "none";
    });

// закрытие модального окна на зону вне окна, т.е. на фон
    modalBackground.addEventListener("click", function (event) {
        if (event.target === modalBackground) {
            modalBackground.style.display = "none";
        }
    });
    let closePay = document.querySelector('.pay-choose');
    closePay.addEventListener('click', function() {
        modalBackground.style.display = "none";
    })
});

orderButton.addEventListener('click', function() {
    if (inputName.textContent === '') {
        inputName.style = 'color: #F55123;';
        document.querySelector('.name__error').style = 'display: block;';
    }
    if (inputSurname.textContent === '') {
        inputSurname.style = 'color: #F55123;';
        document.querySelector('.surname__error').style = 'display: block;';
    }
    if (inputMail.textContent === '') {
        inputMail.style = 'color: #F55123;';
        document.querySelector('.mail__error-empty').style = 'display: block;';
    }
    if (inputPhone.textContent === '') {
        inputPhone.style = 'color: #F55123;'
        document.querySelector('.phone__error-empty').style = 'display: block;';
    }
    if (inputInn.textContent === '') {
        inputInn.style = 'color: #F55123;'
        document.querySelector('.inn__error-empty').style = 'display: block;';
        document.querySelector('.inn__info').style = 'display: none;';
    }
})
