import StorageService from '../utils/storage.utils';
const apiEndpoint = "http://127.0.0.1:8081/api/auth/"

const header = { 'Content-type': 'application/json; charset=UTF-8' }

class AuthService {
    static async login (email, password) {
	return fetch(`${apiEndpoint}login`, {
	    method: 'POST',
	    body: JSON.stringify({ email, password }),
	    headers: header,
	}).then((response) => response).catch((err) => {
	    console.log(err.message)
	    return;
	});
    }

    static async signup (firstName, lastName, email, password, country, state, city) {
	return fetch(`${apiEndpoint}signup`, {
	    method: 'POST',
	    body: JSON.stringify(
		{
		    firstName,
		    lastName,
		    email,
		    password,
		    country,
		    state,
		    city
		}
	    ),
	    headers: header,
	}).then((response) => response).catch((err) => {
	    console.log(err.message);
	    return;
	})
    }

    static async logout (email) {
	const user = StorageService.getUser();

	const auth_header = {
	    'Content-type': 'application/json; charset=UTF-8',
	    'Authorization': user.token
	}
	StorageService.clean();
	console.log(auth_header);
	return fetch(`${apiEndpoint}logout`, {
	    method: 'POST',
	    body: JSON.stringify({ email }),
	    headers: auth_header,
	}).then((response) => response).catch((err) => {
	    console.log(err.message);
	    return;
	})
    }

    static async deactivate (email) {
	const user = StorageService.getUser();

	const auth_header = {
	    'Content-type': 'application/json; charset=UTF-8',
	    'Authorization': user.token
	}
        StorageService.clean();
        return fetch(`${apiEndpoint}deactivate`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: auth_header,
        }).then((response) => response).catch((err) => {
            console.log(err.message);
            return;
        })
    }
}

export default AuthService;
