function arrayFuncResults(funcList) {
    return function (...args) {
        const results = [];
        for (const func of funcList) {
            results.push(func(...args));
        }
        return results;
    };
}