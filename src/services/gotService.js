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

	// async getAllCharacters(page = 5, pageSize = 10) {
	// 	const startId = (page - 1) * pageSize;
	// 	const res = await this.getResource(`/characters?page=${page}&pageSize=${pageSize}`);
	// 	return res.map( (elem, index) => this._transformCharacter(elem, startId + index));
	// }

	getAllCharacters = async (page = 5, pageSize = 10) => {
		const res = await this.getResource(`/characters?page=${page}&pageSize=${pageSize}`);
		return res.map( (elem) => this._transformCharacter(elem));
	}

	getCharacter = async (id) => {
		const character = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(character, id);
	}

	getAllBooks = async () => {
		return this.getResource('/books/');
	}

	getBook = async (id) => {
		return this.getResource(`/books/${id}`);
	}

	getAllHouses = async () => {
		return this.getResource('/houses/');
	}

	getHouse = async (id) => {
		return this.getResource(`/houses/${id}`);
	}

	// _transformCharacter(char, id) {
	// 	return {
	// 		id: id,
	// 		name: this.checkProp(char.name),
	// 		gender: this.checkProp(char.gender),
	// 		born: this.checkProp(char.born),
	// 		died: this.checkProp(char.died),
	// 		culture: this.checkProp(char.culture)
	// 	};
	// }

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

	_transformHouse(house) {
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons
		};
	}

	_transformBook(book) {
		return {
			name: book.name,
			numberOfPages: book.numberOfPages,
			publisher: book.publisher,
			released: book.released
		};
	}

	_getIdFromUrl(url) {
		const idRegex = /[\d]{1,}$/;
		const id = url.match(idRegex)[0];
		// console.log(id);
		return id;
	}

	checkProp(propValue) {
		if (propValue === undefined || propValue.length < 1 || propValue === null || propValue === '' || !propValue ) {
			return '*No data*';
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