import StorageService from '../utils/storage.utils';
const apiEndpoint = "http://127.0.0.1:8081/api/auth/"

const header = { 'Content-type': 'application/json; charset=UTF-8' }

const user = StorageService.getUser();

const auth_header = {
    'Content-type': 'application/json; charset=UTF-8',
    'Authorization': user.token
}

class AuthService {
    static async login (email, password) {
	return fetch(`${apiEndpoint}login`, {
	    method: 'POST',
	    body: JSON.stringify({ email, password }),
	    headers: header,
	}).then((response) => response.json()).then((data) => {
	    return data;
	}).catch((err) => {
	    console.log(err.message)
	    return;
	});
    }

    static async signup (firstName, lastName, email, password, country, state, city) {
	return fetch(`${apiEndpoint}signup`, {
	    method: 'POST',
	    body: JSON.stringify(
		{ firstName, lastName, email, password, country, state, city }
	    ),
	    headers: header,
	}).then((response) => response.json()).catch((err) => {
	    console.log(err.message);
	    return;
	})
    }

    static async logout (email) {
	StorageService.clean();
	fetch(`${apiEndpoint}logout`, {
	    method: 'POST',
	    body: JSON.stringify({ email }),
	    headers: auth_header,
	}).then((response) => response.json()).catch((err) => {
	    console.log(err.message);
	    return;
	})
    }

    static async deactivate (email) {
        StorageService.clean();
        fetch(`${apiEndpoint}deactivate`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: auth_header,
        }).then((response) => response.json()).catch((err) => {
            console.log(err.message);
            return;
        })
    }
}

export default AuthService;
