// let url = 'https://jsonplaceholder.typicode.com/posts/',
//     data = {
//         username: 'example'
//     };

// let settings = {
//     method: 'POST',
//     body: JSON.stringify(data),
//     header: {
//         'Content-Type': 'application/json'
//     }
// };

// fetch(url, settings)
//     .then( response => response.json())
//     .then( myJson => console.log('Success', myJson))
//     .catch( error => console.log('Error', error));

// getResource(url)
//     .then(myJson => console.log('Success', myJson))
//     .catch(error => console.log('Error', error));

export default class GotService {

	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api/';
	}

	// "Async - await" is required for asynchronous fetch and promise
	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		// If no ok result - throw error
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async (page = 5, pageSize = 10) => {
		const res = await this.getResource(`/characters?page=${page}&pageSize=${pageSize}`);
		return res.map( (elem) => this._transformCharacter(elem));
	}

	getCharacter = async (id) => {
		const character = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(character, id);
	}

	getAllBooks = async (page = 1, pageSize = 10) => {
		const res = await this.getResource(`/books?page=${page}&pageSize=${pageSize}`);
		return res.map( (elem) => this._transformBook(elem));
	}

	getBook = async (id) => {
		const book = await this.getResource(`/books/${id}`);
		return this._transformBook(book, id);
	}

	getAllHouses = async (page = 1, pageSize = 10) => {
		const res = await this.getResource(`/houses?page=${page}&pageSize=${pageSize}`);
		return res.map( (elem) => this._transformHouse(elem));
	}

	getHouse = async (id) => {
		const house = await this.getResource(`/houses/${id}`);
		return this._transformHouse(house, id);
	}

	_transformCharacter(char) {
		return {
			id: this._getIdFromUrl(char.url),
			name: this.checkProp(char.name),
			gender: this.checkProp(char.gender),
			born: this.checkProp(char.born),
			died: this.checkProp(char.died),
			culture: this.checkProp(char.culture)
		};
	}

	_transformBook(book) {
		const rlsd = Date.parse(this.checkProp(book.released));
		let day = new Date(rlsd).getDay() + '';
		if (day.length == 1) {
			day = '0' + day;
		}
		let month = (new Date(rlsd).getMonth() + 1) + '';
		if (month.length == 1) {
			month = '0' + month;
		}
		let year = new Date(rlsd).getFullYear();
		return {
			id: this._getIdFromUrl(book.url),
			name: this.checkProp(book.name),
			numberOfPages: this.checkProp(book.numberOfPages),
			publisher: this.checkProp(book.publisher),
			released: `${day}.${month}.${year}`
		};
	}

	_transformHouse(house) {
		return {
			id: this._getIdFromUrl(house.url),
			name: this.checkProp(house.name),
			region: this.checkProp(house.region),
			words: this.checkProp(house.words),
			titles: this.checkProp(house.titles),
			overlord: this.checkProp(house.overlord),
			ancestralWeapons: this.checkProp(house.ancestralWeapons)
		};
	}

	_getIdFromUrl(url) {
		const idRegex = /[\d]{1,}$/;
		const id = url.match(idRegex)[0];
		// console.log(id);
		return id;
	}

	checkProp(propValue) {
		if (propValue === undefined || propValue.length < 1 || propValue === null || propValue === '' || !propValue) {
			return '*No data*';
		}
		else if (Array.isArray(propValue)) {
			if (propValue.length < 1 || propValue[0] == '') {
				return '*No data*';
			}
			else if (propValue.length == 1) {
				return propValue + '';
			}
			else if (propValue.length > 1) {
				return propValue.toString().split(',').join(', ');
			}
		} else {
			return propValue;
		}
	}
}


// const got = new GotService();

// got.getAllCharacters()
//     .then(res => res.forEach( elem => console.log(elem.name)));

// got.getCharacter(130)
//     .then(res => console.log(res));