function parseJSON(jsonString) {
    let index = 0;

    function parseWhitespace() {
        while (/\s/.test(jsonString[index])) {
            index++;
        }
    }

    function parseString() {
        let result = '';
        index++; // Пропускать начальные двойные кавычки

        while (jsonString[index] !== '"') {
            if (jsonString[index] === '\\') {
                index++;
                const escapeChar = jsonString[index];
                if (escapeChar === 'n') {
                    result += '\n';
                } else if (escapeChar === 'r') {
                    result += '\r';
                } else if (escapeChar === 't') {
                    result += '\t';
                } else {
                    result += escapeChar;
                }
            } else {
                result += jsonString[index];
            }
            index++;
        }

        index++; // Пропускать двойные кавычки в конце
        return result;
    }

    function parseNumber() {
        const startIndex = index;
        //Допустимые числовые литералы
        const numberRegex = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
        //Проверка на соотвествие
        const match = jsonString.slice(index).match(numberRegex);
        if (match) {
            index += match[0].length;
            const numberValue = parseFloat(match[0]);

            if (isNaN(numberValue)) {
                throw new SyntaxError('Невалидное число JSON');
            }

            return numberValue;
        } else {
            throw new SyntaxError('Невалидное число JSON');
        }
    }

    function parseArray() {
        const result = [];
        index++; // Пропускаем открывающуся квадратную скобку

        while (jsonString[index] !== ']') {
            parseWhitespace();
            const value = parseValue();
            result.push(value);
            parseWhitespace();

            if (jsonString[index] === ',') {
                index++; // пропускаем запятую
            } else if (jsonString[index] !== ']') {
                throw new SyntaxError('Невалидный JSON массив');
            }
        }

        index++; // Пропускаем квадратную скобку
        return result;
    }

    function parseObject() {
        const result = {};
        index++; // Пропускаем фигурную скобку

        while (jsonString[index] !== '}') {
            parseWhitespace();
            const key = parseString();
            parseWhitespace();

            if (jsonString[index] !== ':') {
                throw new SyntaxError('Невалидный JSON объект');
            }

            index++; // пропуск двоеточия
            parseWhitespace();

            const value = parseValue();
            result[key] = value;

            parseWhitespace();

            if (jsonString[index] === ',') {
                index++; // пропускаем запятую
            } else if (jsonString[index] !== '}') {
                throw new SyntaxError('Невалиждный JSON объект');
            }
        }

        index++; // Пропускаем фигурную скобку
        return result;
    }

    function parseValue() {
        parseWhitespace();
        const char = jsonString[index];

        if (char === '"') {
            return parseString();
        } else if (char === '{') {
            return parseObject();
        } else if (char === '[') {
            return parseArray();
        } else if (char === '-' || /[0-9]/.test(char)) {
            return parseNumber();
        } else if (jsonString.slice(index, index + 4) === 'true') {
            index += 4;
            return true;
        } else if (jsonString.slice(index, index + 5) === 'false') {
            index += 5;
            return false;
        } else if (jsonString.slice(index, index + 4) === 'null') {
            index += 4;
            return null;
        } else {
            throw new SyntaxError('Невалидное JSON значение');
        }
    }

    try {
        const result = parseValue();
        parseWhitespace();

        if (index !== jsonString.length) {
            throw new SyntaxError('Неполный JSON');
        }

        return result;
    } catch (error) {
        throw error;
    }
}

/*const jsonString = '{"name": "Proton", "age": 30, "city": "Moscow", "tel": "+7"}';
try {
    const jsonObject = parseJSON(jsonString);
    console.log(jsonObject);
} catch (error) {
    console.error(error.message);
}*/
