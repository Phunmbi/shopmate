import moxios from 'moxios';
import ProductAPI from '../products';

const baseUrl = 'https://backendapi.turing.com';

const expectedResponse = {
  success: true,
  message: 'Successfully retrieved guestHouses',
};

describe('ProductsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to filter all departments', async () => {
    const action = {
      deptId: 1,
      query: {
        page: 1,
        limit: 10
      }
    };

    moxios.stubRequest(`${baseUrl}/products/inDepartment/${action.deptId}?page=${action.query.page}&limit=${action.query.limit}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ProductAPI.filterAllDepartments(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/products/inDepartment/${action.deptId}?page=${action.query.page}&limit=${action.query.limit}`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to filter all categories', async () => {
    const action = {
      CategoryId: 1,
      query: {
        page: 1,
        limit: 10
      }
    };

    moxios.stubRequest(`${baseUrl}/products/inCategory/${action.CategoryId}?page=${action.query.page}&limit=${action.query.limit}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ProductAPI.filterAllCategories(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/products/inCategory/${action.CategoryId}?page=${action.query.page}&limit=${action.query.limit}`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to search all products', async () => {
    const action = {
      queryString: 'altica',
      pageDetails: {
        page: 1,
        limit: 10
      }
    };

    moxios.stubRequest(`${baseUrl}/products/search?query_string=${action.queryString}&page=${action.pageDetails.page}&limit=${action.pageDetails.limit}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ProductAPI.searchAllProducts(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/products/search?query_string=${action.queryString}&page=${action.pageDetails.page}&limit=${action.pageDetails.limit}`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to get single Product Details', async () => {
    const action = {
      productId: 3
    };
    moxios.stubRequest(`${baseUrl}/products/${action.productId}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ProductAPI.singleProductDetails(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/products/${action.productId}`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to get single Product Reviews', async () => {
    const action = {
      productId: 3
    };
    moxios.stubRequest(`${baseUrl}/products/${action.productId}/reviews`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ProductAPI.singleProductReviews(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/products/${action.productId}/reviews`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should send a POST request to add reviews', async () =>{
    const userData = {
      product_id: 'NSG2',
      review: 'Good product',
      rating: 5
    };

    moxios.stubRequest(`${baseUrl}/products/${userData.product_id}/reviews`, {
      status: 201,
      response: {
        reviews: 'Good product',
        rating: 5
      },
    });

    const response = await ProductAPI.addSingleReview(userData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/products/${userData.product_id}/reviews`);
    expect(response.data).toEqual({
      reviews: 'Good product',
      rating: 5
    });
  });
});
