//Решение задачи, используя асинхронные функции и async/await для реализации вызова в массиве последовательноф
async function funcExecuteSequentially(functions) {
	for (let i = 0; i < functions.length; i++) {
		let currentFunction = functions[i];
		await new Promise( (resolve) => {
			currentFunction(resolve)
			});
	}
}


//Решение задачи, используя рекурсию
function executeFuncSequentially(functions, index) {
	//которая вызывает функции по порядку и передает callback функцию для вызова следующей функции после завершения текущей
	if (index < functions.length) {
		const currentFunction = functions[index];
		console.log(`Вызов функции:${index + 1}`);
		currentFunction(() => {
            executeFuncSequentially(functions, index + 1);
		});
	}
}

// Пример массива функций
const functionsArray = [
  (callback) => {
    setTimeout(() => {
      console.log("Вызов функции 1 выполнен");
      callback();
    }, 1000);
  },
  (callback) => {
    setTimeout(() => {
      console.log("Вызов функции 2 выполнен");
      callback();
    }, 1000);
  },
  (callback) => {
    setTimeout(() => {
      console.log("Вызов функции 3 выполнен");
      callback();
    }, 1000);
  },
];

