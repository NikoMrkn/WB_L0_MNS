//Используем паттерн IIFE (Immediately Invoked Function Expression), чтобы создать изолированную область видимости
const MathX = (function() {
	
	// Вспомогательная функция для проверки простоты числа
	function isPrime(n) {
		if (n <= 1) {return false};
		if (n <= 3) return true;
		if (n % 2 === 0 || n % 3 === 0) return false;
		
		for (let i = 5; i * i <= n; i += 6) {
			if (n % i === 0 || n % (i + 2) === 0) return false;
		}
		return true
	}
	
	return {
		// Функция для вычисления N-го числа в ряду Фибоначчи
		fib: function (n) {
			if ( n <= 0 ) return 0;
			if ( n === 1 ) return 1;
		
			let a = 0, b = 1;
			for (let i = 2; i <= n; i++) {
				[a, b] = [b, a + b]
			}
			return b
		},
		// вычисление всех чисел в ряду Фибоначчи до числа N
		fibCollection: function (n) {
			if ( n <= 0 ) return [];
		
			const collection = [0];
			let a = 0, b = 1;
			while (b <= n) {
				collection.push(b);
				[a, b] = [b, a + b];
			}
			return collection
		
		},
		//Функция для вычисления Nого простого числа
		primeN: function (n) {
			if (n <= 0) return undefined;
			
			let count = 0, num = 2;
			while(true) {
				if (isPrime(num)) {count++}
				if (count === n) {return num}
				num++;
			}
		},
		//Функция для вычисления всех простых чисел
		primeCollection: function (n) {
			if ( n <= 0) {return []}
			
			const collection = [];
			for (let i = 2; i <= n; i++) {
				if (isPrime(i)) {collection.push(i)}
			}
			return collection
		}
		
	};
	
})();