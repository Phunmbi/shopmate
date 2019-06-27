import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import HomePageContainer,{ Homepage } from '../index';

describe('<ConnectedHomePage />', () => {
  const props = {
    signUp: jest.fn(),
    signIn: jest.fn(),
    filterAllDepartments: jest.fn(),
    filterAllCategories: jest.fn(),
    searchAllProducts: jest.fn(),
    getCartId: jest.fn(),
    addToCart: jest.fn(),
    retrieveCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateCart: jest.fn(),
    getProducts: jest.fn(),
    cart: [
      {name: 'adeniyi', attributes: "Blue, S", item_id: 1, quantity: 3},
      {name: 'victor', attributes: "Purple, S", item_id: 2, quantity: 4}],
    history: {
      push: jest.fn()
    },
    productDetails: { product_id: 1, name: 'nigerian', subtotal: 455},
    cartLoading: false,
    handleSearch: jest.fn,
    allProducts: []
  };

  const initialState = {
    products: {
      products: [
        {name: 'altica', product_id: 12, discounted_price: "0.00"},
        {name: 'italia', product_id: 19},
        {name: 'french', product_id: 17},
        {name: 'nigerian', product_id: 15},
        {name: 'christmas cap', product_id: 14}
      ],
      singleProductDetails: {
        product_id: 1,
        name: 'nigerian',
        subtotal: 455
      },
      count: 6,
      loading: false,
    },
    auth: {
      loading: false
    },
    shoppingCart: {
      cart:[{name: 'adeniyi'}, {name: 'victor'}],
      cart_Id: 4,
      loadingShoppingCart: false
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Homepage {...props} store={store}/>);
    localStorage.clear();
  });

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly with filtering local variable loaded', () => {
    localStorage.setItem('filtering', 'true');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should render properly with all localstorage variables loaded', () => {
    localStorage.setItem('filtering', 'true');
    localStorage.setItem('isACategorySelected', 'true');
    localStorage.setItem('selectedCategoryID', '3');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render HomeCatalogue and simulate reset filter function', () => {
    wrapper.find('.filter-main__action').find('p').simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render Pagination and simulate handle Pagination function', () => {
    wrapper.setProps({productsLoading: false, productsCount: 9});
    wrapper.find('.pagination-main__directionRight').simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render Pagination and simulate handle Pagination function backward without filtering', () => {
    wrapper.setProps({productsLoading: false, productsCount: 9});
    wrapper.setState({page: 3});
    wrapper.find('.pagination-main__directionLeft').simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render Pagination and simulate handle Pagination function backward', () => {
    localStorage.setItem('filtering', 'true');
    wrapper.setProps({productsLoading: false, productsCount: 9});
    wrapper.setState({page: 3});
    wrapper.find('.pagination-main__directionLeft').simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render NavBar Profile and simulate handle search function', () => {
    wrapper.find('.navbar-profile__search').find('p').simulate('click');
    wrapper.find('.navbar-profile__search').find('form').simulate('submit');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render NavBar Profile and simulate handle search change function', () => {
    wrapper.find('.navbar-profile__search').find('form').find('input').simulate('change');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render NavBar Profile and simulate handle dropdown function', () => {
    localStorage.setItem('isAuthenticated', 'true');
    wrapper.find('NavbarProfile').setState({displayDropDown: true});
    wrapper.find('.navbar-profile__user').find('img').simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render NavBar Profile and simulate handle dropdown function and redirect to profile page', () => {
    localStorage.setItem('isAuthenticated', 'true');
    wrapper.find('.navbar-profile__user').find('img').simulate('click');

    wrapper.find('.navbar-dropdown__main').find('p').at(0).simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render NavBar Profile and simulate handle dropdown function when dropdown is not active and sign out', () => {
    localStorage.setItem('isAuthenticated', 'true');
    wrapper.find('.navbar-profile__user').find('img').simulate('click');

    wrapper.find('.navbar-dropdown__main').find('p').at(1).simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should properly render NavBar Home and simulate on click to sign up', () => {
    wrapper.find('.navbar-home__action2').at(0).simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(true);
  });

  it('should properly render NavBar Home and simulate on click to sign in', () => {
    wrapper.find('.navbar-home__action2').at(1).simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(true);
  });

  it('should properly render NavBar Home and simulate on click to checkout', () => {
    wrapper.find('.navbar-home__cart').simulate('click');

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should properly render Catalogue and map products', () => {
    const wrapped = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HomePageContainer {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapped.setProps({
      allProducts: [{name: 'altica', product_id: 12},
        {name: 'italia', product_id: 19},
        {name: 'french', product_id: 17},
        {name: 'nigerian', product_id: 15},
        {name: 'christmas cap', product_id: 14}],
      productsCount: 5
    })
  });

  it('should show the signup modal and simulate the sign up, with values properly filled in', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});

    wrapper.find('.signup').find('form').find('input').at(0).simulate('change',  {target: {value: 'Names'}});
    wrapper.find('.signup').find('form').find('input').at(1).simulate('change',  {target: {value: 'password'}});
    wrapper.find('.signup').find('form').find('input').at(2).simulate('change',  {target: {value: 'password'}});
    wrapper.find('.signup').find('form').simulate('submit');

    expect(wrapper.find('Modal').exists()).toEqual(true);
  });

  it('should show the signup modal then link to the sign in modal, then simulate sign in', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});
    wrapper.find('.signup').find('form').find('input').at(0).simulate('change');
    wrapper.find('.signup').find('form').find('input').at(1).simulate('change');
    wrapper.find('.signup').find('form').find('input').at(2).simulate('change');

    wrapper.find('.additional-options__alternate').find('p').simulate('click');

    wrapper.find('.signin').find('form').find('input').at(0).simulate('change', {target: {value: 'Names'}});
    wrapper.find('.signin').find('form').find('input').at(1).simulate('change', {target: {value: 'Password'}});
    wrapper.find('.signin').find('form').simulate('submit');

    expect(wrapper.find('Modal').exists()).toEqual(true);
  });

  it('should show the signin modal then link to the signup modal, and simulate signup', () => {
    wrapper.setState({displayModal: true, openModal: 'signin'});
    wrapper.find('.signin').find('form').find('input').at(0).simulate('change');
    wrapper.find('.signin').find('form').find('input').at(1).simulate('change');

    wrapper.find('.additional-options__alternate').find('p').simulate('click');

    wrapper.find('.signup').find('form').find('input').at(0).simulate('change',  {target: {value: 'Names', placeholder: 'Name'}});
    wrapper.find('.signup').find('form').find('input').at(1).simulate('change',  {target: {value: 'password@gmail.com', placeholder: 'Email'}});
    wrapper.find('.signup').find('form').find('input').at(2).simulate('change',  {target: {value: 'passwordssss', placeholder: 'Password'}});
    wrapper.find('.signup').find('form').simulate('submit');

    expect(wrapper.find('Modal').exists()).toEqual(true);
  });

  it('should render Home Catalogue and simulate run filter method', () => {
    localStorage.setItem('isADepartmentSelected', 'true');

    wrapper.find('HomeCatalogueFilter').setState({
      department: {
        Regional: {id: 1, status: true},
        Nature: {id: 2, status: false},
        Seasonal: {id: 3, status: false}
        }
    });

    const inst =  wrapper.find('HomeCatalogueFilter').instance();

    wrapper.find('.filter-main__action').find('button').simulate('click');

    inst.runFilter = jest.fn();

    wrapper.find('.filter-main__action').find('button').simulate('click');
    expect(inst.runFilter).toHaveBeenCalled();
  });

  it('should render Home Catalogue and simulate run filter method when category is selected', () => {
    localStorage.setItem('isADepartmentSelected', 'true');
    localStorage.setItem('isACategorySelected', 'true');

    wrapper.find('HomeCatalogueFilter').setState({
      department: {
        Regional: {id: 1, status: false},
        Nature: {id: 2, status: true},
        Seasonal: {id: 3, status: false}
      }
    });

    const inst =  wrapper.find('HomeCatalogueFilter').instance();
    wrapper.find('.filter-main__action').find('button').simulate('click');
    inst.runFilter = jest.fn();

    wrapper.find('.filter-main__action').find('button').simulate('click');
    expect(inst.runFilter).toHaveBeenCalled();
  });

  it('should render Home Catalogue and simulate run filter method when department is false', () => {
    localStorage.setItem('isADepartmentSelected', 'false');

    wrapper.find('HomeCatalogueFilter').setState({
      department: {
        Regional: {id: 1, status: false},
        Nature: {id: 2, status: false},
        Seasonal: {id: 3, status: true}
      }
    });

    const inst =  wrapper.find('HomeCatalogueFilter').instance();
    wrapper.find('.filter-main__action').find('button').simulate('click');
    inst.runFilter = jest.fn();

    wrapper.find('.filter-main__action').find('button').simulate('click');
    expect(inst.runFilter).toHaveBeenCalled();
  });

  it('should render Home Catalogue and simulate run filter method when department does not exist', () => {
    const inst =  wrapper.find('HomeCatalogueFilter').instance();

    wrapper.find('.filter-main__action').find('button').simulate('click');
    inst.runFilter = jest.fn();

    wrapper.find('.filter-main__action').find('button').simulate('click');
    expect(inst.runFilter).toHaveBeenCalled();
  });

  it('should render Home Catalogue and simulate handle department change method', () => {
    const inst =  wrapper.find('HomeCatalogueFilter').instance();

    inst.handleDepartmentChange = jest.fn();

    wrapper.find('.filter-main__form').find('#Regional').simulate('change');
    expect(inst.handleDepartmentChange).toHaveBeenCalledTimes(0);
  });


  it('should render Home Catalogue and simulate handle category change method', () => {
    wrapper.setState({
      department: {
        Regional: {id: 1, status: true},
        Nature: {id: 2, status: false},
        Seasonal: {id: 3, status: false}
      },
      category: {
        French: {id: 1, status: false},
        Italian: {id: 2, status: false},
        Irish: {id: 3, status: false},
        Animal: {id: 4, status: false},
        Flower: {id: 5, status: false},
        Christmas: {id: 6, status: false},
        Valentine: {id: 7, status: false}
      }
    });
    const inst =  wrapper.find('HomeCatalogueFilter').instance();
    const event = {
      target: {
        value: 'French',
        checked: false
      }
    };

    inst.handleCategoryChange(event);

    inst.handleCategoryChange = jest.fn();
    inst.handleCategoryChange(event);
    expect(inst.handleCategoryChange).toHaveBeenCalledTimes(1);
  });

  it('should show the signup modal and simulate authloading phase ', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});
    wrapper.setProps({authLoading: true});

    expect(wrapper.find('Modal').exists()).toEqual(true);
  });

  it('should show the signin modal and simulate authloading phase ', () => {
    wrapper.setState({displayModal: true, openModal: 'signin'});
    wrapper.setProps({authLoading: true});

    expect(wrapper.find('Modal').exists()).toEqual(true);
  });

  it('should show the signup modal and simulate display loading phase ', () => {
    wrapper.setState({displayModal: false, openModal: 'signup'});

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should show the signup modal and simulate display loading phase ', () => {
    wrapper.setState({displayModal: false, openModal: 'signin'});

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should show the signup modal and simulate the close modal action', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});

    wrapper.find('.modal-overlay').simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should show the signup modal and simulate the close modal action on the cancel button', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});

    wrapper.find('.modal-main__cancel').find('img').simulate('click');

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should show the checkout modal while loading', () => {
    wrapper.setState({displayModal: false, openModal: 'checkoutCart'});

    expect(wrapper.find('Modal').exists()).toEqual(false);
  });

  it('should show the checkout modal', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should show the checkout modal and simulate close modal', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});

    wrapper.find('.checkoutModal-overlay').simulate('click');
    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should show the checkout modal and simulate close modal action', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});

    wrapper.find('.checkoutModal-main__cancel').find('img').simulate('click');
    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should show the checkout modal with false changing Quantity', () => {
    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.find('CheckoutCart').setState({changingQuantity: false, 1: {quantity: 3}, 2: {quantity: 4}});

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should show the checkout modal loading shopping cart', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('cart_id', '3');

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.setProps({cartLoading: true});

    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should show the checkout modal shopping cart and redirecting back home', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('cart_id', '3');

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});

    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});
    wrapper.find('.checkout-button').find('button').at(0).simulate('click');

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should show the checkout modal with change in quantity, simulating update cart and checkout when logged in', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('cart_id', '3');

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});

    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(1).simulate('click');
    wrapper.find('.active-button').simulate('click');
    wrapper.find('.checkout-button').find('button').at(2).simulate('click');

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should show the checkout modal with change in quantity, simulating update cart and checkout when logged out', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('cart_id', '3');

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});

    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(1).simulate('click');
    wrapper.find('.active-button').simulate('click');
    wrapper.find('.checkout-button').find('button').at(2).simulate('click');

    expect(wrapper.find('CheckoutCart').exists()).toEqual(false);
  });

  it('should show the checkout modal with remove from cart simulation', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('cart_id', '3');

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});

    wrapper.find('CheckoutCart').setState({changingQuantity: true, 1: {quantity: 3}, 2: {quantity: 4}});
    wrapper.find('.checkout-container__itemName')
      .find('.checkout-container__details')
      .find('.checkout-container__cancel')
      .at(0)
      .simulate('click');

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });
});
