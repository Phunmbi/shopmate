import moxios from 'moxios';
import AuthAPI from '../auth';

const baseUrl = 'https://backendapi.turing.com';

const expectedResponse = {
  success: true,
  message: 'Successfully retrieved guestHouses',
};

describe('AuthAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get User data', async () => {
    moxios.stubRequest(`${baseUrl}/customer`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await AuthAPI.getUser();
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/customer`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should send a PUT request to update user profile', async () =>{
    const userData = {
      address_1: 'Bukoto heights',
      address_2: '',
      city: 'Lagos',
      Region: 'South West',
      Country: 'Nigeria',
      postal_code: 554,
      shipping_region_id: 3
    };

    moxios.stubRequest(`${baseUrl}/customers/address`, {
      status: 200,
      response: {
        name: 'Shop Mate',
        email: 'test@shopmate.com',
        address_1: 'Bukoto heights',
        address_2: '',
        city: 'Lagos',
        Region: 'South West',
        Country: 'Nigeria',
        postal_code: 554,
        shipping_region_id: 3
      }
    });

    const response = await AuthAPI.updateUser(userData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/customers/address`);
    expect(response.data).toEqual({
      name: 'Shop Mate',
      email: 'test@shopmate.com',
      address_1: 'Bukoto heights',
      address_2: '',
      city: 'Lagos',
      Region: 'South West',
      Country: 'Nigeria',
      postal_code: 554,
      shipping_region_id: 3
    });
  });

  it('should send a POST request to sign up a user', async () =>{
    const userData = {
      name: 'Shop Mate',
      email: 'test@shopmate.com',
      password: 'shopMatePassword',
    };
    moxios.stubRequest(`${baseUrl}/customers`, {
      status: 201,
      response: {
        success: true,
        message: 'user successfully created',
        user: {
          name: 'Shop Mate',
          email: 'test@shopmate.com'
        }
      },
    });

    const response = await AuthAPI.signup(userData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/customers`);
    expect(response.data).toEqual({
      success: true,
      message: 'user successfully created',
      user: {
        name: 'Shop Mate',
        email: 'test@shopmate.com'
      }
    });
  });

  it('should send a POST request to sign in a user', async () =>{
    const userData = {
      email: 'test@shopmate.com',
      password: 'shopMatePassword',
    };
    moxios.stubRequest(`${baseUrl}/customers/login`, {
      status: 200,
      response: {
        success: true,
        message: 'user successfully signed in',
        user: {
          name: 'Shop Mate',
          email: 'test@shopmate.com'
        }
      },
    });

    const response = await AuthAPI.signin(userData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/customers/login`);
    expect(response.data).toEqual({
      success: true,
      message: 'user successfully signed in',
      user: {
        name: 'Shop Mate',
        email: 'test@shopmate.com'
      }
    });
  });
});
