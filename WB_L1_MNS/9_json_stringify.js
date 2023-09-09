function customStringify(data) {
    const visited = new Set();

    function stringifyInternal(value, indent) {
		//Проверка на циклические ссылки
        if (visited.has(value)) {
            return '"[Circular]"';
        }

        if (typeof value === 'string') {
            return `"${value}"`;
        }

        if (typeof value !== 'object' || value === null) {
            return String(value);
        }

        visited.add(value);

        if (Array.isArray(value)) {
            const arrayValues = value.map((item, index) => {
                const str = stringifyInternal(item, indent);
                return `[${str}]`;
            });
            visited.delete(value);
            return `[${arrayValues.join(',')}]`;
        }

        const objectProperties = Object.keys(value).map(key => {
            const str = stringifyInternal(value[key], indent);
            const formattedKey = `"${key}": `;
            return `${formattedKey}${str}`;
        });

        visited.delete(value);
        return `{${objectProperties.join(',')}}`;
    }

    return stringifyInternal(data, '');
}