import axios from 'axios';
import BaseAuthorization from './index';

export default class HomeAPI {
	static getProducts ( action ) {
		const {page, limit} = action;
		return axios.get( `${BaseAuthorization.baseURL}/products?page=${page}&limit=${limit}`);
	}

	static filterAllDepartments ( action ) {
		const {deptId, query} = action;
		return axios.get( `${BaseAuthorization.baseURL}/products/inDepartment/${deptId}?page=${query.page}&limit=${query.limit}`);
	}

	static filterAllCategories ( action ) {
		const {CategoryId, query} = action;
		return axios.get(
			`${BaseAuthorization.baseURL}/products/inCategory/${CategoryId}?page=${query.page}&limit=${query.limit}`
		);
	}

	static searchAllProducts (action) {
		const {queryString, pageDetails} = action;
		return axios.get(
			`${BaseAuthorization.baseURL}/products/search?query_string=${queryString}&page=${pageDetails.page}&limit=${pageDetails.limit}`
		);
	}

    static singleProductDetails (action) {
			const {productId} = action;
			return axios.get(
					`${BaseAuthorization.baseURL}/products/${productId}`
			);
    }

    static singleProductReviews (action) {
			const { productId } = action;
			return axios.get(`${BaseAuthorization.baseURL}/products/${productId}/reviews`);
		}
}
