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

class GotService {
    
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

        return  await res.json();
    }
    getAllCharacters() {
        return this.getResource('/characters?page=5&pageSize=10');
    }
    getCharacter(id) {
        return this.getResource(`/characters/${id}`);
    }
}

const got = new GotService();

got.getAllCharacters()
    .then(res => res.forEach( elem => console.log(elem.name)));

got.getCharacter(130)
    .then(res => console.log(res));
