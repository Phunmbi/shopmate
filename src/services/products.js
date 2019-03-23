import axios from 'axios';

export default class HomeAPI {
	static getProducts ( action ) {
		const {page, limit} = action;
		return axios.get(`https://backendapi.turing.com/products?page=${page}&limit=${limit}`);
	}
}
