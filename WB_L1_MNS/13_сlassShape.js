//Создаем основной класс с функциями, которые будут наследовать классы потомки.
//В классе родителе в данном случае конструктор не нужен
class Shape {
    area() {
        return 0;
    }

    perimeter() {
        return 0;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area = () => this.width * this.height;
    perimeter = () => 2 * (this.width + this.height);
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area = () => Math.PI * this.radius ** 2;
    perimeter = () => 2 * Math.PI * this.radius;
}

class Triangle extends Shape {
    constructor(side1, side2, side3) {
        super();
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    area = () => {
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    };

    perimeter = () => this.side1 + this.side2 + this.side3;
}
