//Для каждого свойства создаем сеттер и геттер и записываем свойства с _ подчеркиванием, чтобы условно орграничить доступ из вне
let library = {
    get title() {
        return this._title;
    },

    set title(value) {
        this._title = value
    },

    get author() {
        return this._author;
    },

    set author(value) {
       this._author = value;
    },

    get yearPublication() {
        return this._yearPublication;
    },

    set yearPublication(value) {
        this._yearPublication = value;
    },

};

console.log(library)
