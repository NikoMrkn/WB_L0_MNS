function sortByAge(arr) {
	
	//встроенный метод сортировки
	arr.sort( (a, b) => {
		
		//если возраст одинаковый идет сравнение имен посимвольно 
		if (a.age === b.age) {
			return a.name.localeCompare(b.name)
		}
		
		//если возраст не одинаковый, то меньший возраст идет перед большим
		return a.age - b.age
	})
	
}