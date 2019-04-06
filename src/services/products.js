import axios from 'axios';
import baseURL from './index';

export default class HomeAPI {
	static getProducts ( action ) {
		const {page, limit} = action;
		return axios.get( `${baseURL}/products?page=${page}&limit=${limit}`);
	}

	static filterAllDepartments ( action ) {
		const {deptId, query} = action;
		return axios.get( `${baseURL}/products/inDepartment/${deptId}?page=${query.page}&limit=${query.limit}`);
	}

	static filterAllCategories ( action ) {
		const {CategoryId, query} = action;
		return axios.get(
			`${baseURL}/products/inCategory/${CategoryId}?page=${query.page}&limit=${query.limit}`
		);
	}

	static searchAllProducts (action) {
		const {queryString, pageDetails} = action;
		return axios.get(
			`${baseURL}/products/search?query_string=${queryString}&page=${pageDetails.page}&limit=${pageDetails.limit}`
		);
	}
}
