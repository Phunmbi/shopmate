import moxios from 'moxios';
import CheckoutAPI from '../checkout';

const baseUrl = 'https://backendapi.turing.com';

const expectedResponse = {
  success: true,
  message: 'Successfully retrieved guestHouses',
};

describe('CheckoutAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get shipping regions', async () => {
    moxios.stubRequest(`${baseUrl}/shipping/regions`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await CheckoutAPI.getShippingRegions();
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/shipping/regions`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to get shipping costs', async () => {
    const action = {
      shipping_region_id: 3
    };
    moxios.stubRequest(`${baseUrl}/shipping/regions/${action.shipping_region_id}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await CheckoutAPI.getShippingCost(action);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/shipping/regions/${action.shipping_region_id}`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should send a POST request to create order', async () =>{
    const userData = {
      cart_id: 'NSG2',
      shipping_id: 1,
    };
    moxios.stubRequest(`${baseUrl}/orders`, {
      status: 201,
      response: {
        order_id: 5554
      },
    });

    const response = await CheckoutAPI.createOrder(userData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/orders`);
    expect(response.data).toEqual({
      order_id: 5554
    });
  });

  it('should send a POST request to perform stripe charge', async () =>{
    const userData = {
      stripeToken: 'tok_5739u009',
      order_id: 'ES882',
      description: 'Describe the charge',
      amount: 600
    };
    moxios.stubRequest(`${baseUrl}/stripe/charge`, {
      status: 201,
      response: {
        order_id: 5554,
        amount: 600,
        billing_details: 'No 1 kimono heights'
      },
    });

    const response = await CheckoutAPI.stripeCharge(userData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/stripe/charge`);
    expect(response.data).toEqual({
      order_id: 5554,
      amount: 600,
      billing_details: 'No 1 kimono heights'
    });
  });
});
