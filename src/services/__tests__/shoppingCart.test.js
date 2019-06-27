import moxios from 'moxios';
import ShoppingCartAPI from '../shoppingCart';

const baseUrl = 'https://backendapi.turing.com';

const expectedResponse = {
  success: true,
  message: 'Successfully retrieved guestHouses',
};

describe('Shopping Cart API', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to retrieve cart Id', async () => {
    moxios.stubRequest(`${baseUrl}/shoppingcart/generateUniqueId`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ShoppingCartAPI.getCartId();
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/shoppingcart/generateUniqueId`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to retrieve cart', async () => {
    const action = {
      cart_id: 1,
    };

    moxios.stubRequest(`${baseUrl}/shoppingcart/${action.cart_id}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ShoppingCartAPI.retrieveCart(action.cart_id);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/shoppingcart/${action.cart_id}`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a DELETE request to remove item from cart', async () => {
    const action = {
      item_id: 4
    };

    moxios.stubRequest(`${baseUrl}/shoppingcart/removeProduct/${action.item_id}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ShoppingCartAPI.removeFromCart(action.item_id);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/shoppingcart/removeProduct/${action.item_id}`);
    expect(request.config.method).toEqual('delete');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a POST request to add item to cart', async () => {
    const action = {
      cart_id: 1,
      product_id: 3,
      attributes: ["S"]
    };

    moxios.stubRequest(`${baseUrl}/shoppingcart/add`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ShoppingCartAPI.addToCart(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/shoppingcart/add`);
    expect(request.config.method).toEqual('post');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a PUT request to update cart', async () => {
    const action = {
      item_id: 3
    };
    moxios.stubRequest(`${baseUrl}/shoppingcart/update/${action.item_id}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await ShoppingCartAPI.updateCart(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/shoppingcart/update/${action.item_id}`);
    expect(request.config.method).toEqual('put');
    expect(response.data).toEqual(expectedResponse);
  });
});
