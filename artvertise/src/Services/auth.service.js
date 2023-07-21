import StorageService from '../utils/storage.utils';
const apiEndpoint = "https://artvertise.onrender.com/api/auth/"

const header = { 'Content-type': 'application/json; charset=UTF-8' }

class AuthService {
    static async login(email, password) {
		try {
		  const response = await fetch(`${apiEndpoint}login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: header,
		  });
		  if (!response.ok) {
			throw new Error('Failed to login');
		  }
		  return response;
		} catch (err) {
		  console.log(err.message);
		  return null;
		}
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
