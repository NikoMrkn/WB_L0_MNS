 function isStrangeNum(num) {
	 let sum = 0;
	 // в цикле проверяем при делении на какое число нет остатка и прибавляем к нашей переменной с суммой
	 for ( let i = 0; i < num; i++ ) {
		if ( num % i === 0 ) { sum += i; }
	 }
	
	// возвращает true, если сумма делителей совпадает с самим числом
	 return num === sum
 }