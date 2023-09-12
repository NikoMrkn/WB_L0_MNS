//Функция плавного (настраиваемого) изменения положения
function animateElement(element, targetX, targetY, duration) {
    //Точное время начала анимации
    const start = performance.now();

    //CurrentTime передается при вызове функции requestAnimationFrame()
    function animate(currentTime) {
        const elapsed = currentTime - start; //Время прошедшее в миллисек.
        const progress = Math.min(elapsed / duration, 1); //Прогресс анимации от 0 до 1
        const newX = interpolate(element.offsetLeft, targetX, progress);
        const newY = interpolate(element.offsetTop, targetY, progress);

        element.style.left = newX + 'px';
        element.style.top = newY + 'px';

        //Если анимация не завршена, то есть прогресс равен 0, вызываем функцию requestAnimationFrame()
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    //метод браузера, который используется для планирования анимаций. Обеспечивает оптимальную производительность анимации
    requestAnimationFrame(animate)
}

/*Вспомогательная функция, которая интерполирует между начальным и конечным значением с учетом прогресса анимации.
Она используется для плавного изменения координат элемента. */
function interpolate(start, end, progress) {
    return start + (end - start) * progress;
}
const animatedElement = document.getElementById('animated-element');
animateElement(animatedElement, 200, 200, 1000); // Анимация перемещения в точку (200, 200) за 1000 миллисекунд (1 секунда)