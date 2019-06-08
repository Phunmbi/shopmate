import * as actionTypes from '../../constants/actionTypes';
import * as shoppingCartActions from '../shoppingCart';

const res = {
  data:{},
  error: false
};

const error = '';

describe('Test for shopping Cart actions', () => {
  it('create an action ADD_TO_CART to set user in store', (done) => {
    expect(shoppingCartActions.addToCart({ cart_id: 3, product_id: 3, attributes: ["red", 4] }).type).
    toEqual(actionTypes.ADD_TO_CART);
    done();
  });

  it('create an action to ADD_TO_CART_SUCCESS to redux store', (done) => {
    expect(shoppingCartActions.addToCartSuccess(res).type).
    toEqual(actionTypes.ADD_TO_CART_SUCCESS);
    done();
  });

  it('create an action to ADD_TO_CART_FAILURE to redux store', (done) => {
    expect(shoppingCartActions.addToCartFailure(error).type).
    toEqual(actionTypes.ADD_TO_CART_FAILURE);
    done();
  });
  it('create an action GET_CART_ID to set user in store', (done) => {
    expect(shoppingCartActions.getCartId().type).
    toEqual(actionTypes.GET_CART_ID);
    done();
  });

  it('create an action to GET_CART_ID_SUCCESS to redux store', (done) => {
    expect(shoppingCartActions.getCartIdSuccess(res).type).
    toEqual(actionTypes.GET_CART_ID_SUCCESS);
    done();
  });

  it('create an action to GET_CART_ID_FAILURE to redux store', (done) => {
    expect(shoppingCartActions.getCartIdFailure(error).type).
    toEqual(actionTypes.GET_CART_ID_FAILURE);
    done();
  });
  it('create an action RETRIEVE_CART to set user in store', (done) => {
    expect(shoppingCartActions.retrieveCart(1).type).
    toEqual(actionTypes.RETRIEVE_CART);
    done();
  });

  it('create an action to RETRIEVE_CART_SUCCESS to redux store', (done) => {
    expect(shoppingCartActions.retrieveCartSuccess(res).type).
    toEqual(actionTypes.RETRIEVE_CART_SUCCESS);
    done();
  });

  it('create an action to RETRIEVE_CART_FAILURE to redux store', (done) => {
    expect(shoppingCartActions.retrieveCartFailure(error).type).
    toEqual(actionTypes.RETRIEVE_CART_FAILURE);
    done();
  });
  it('create an action REMOVE_FROM_CART to set user in store', (done) => {
    expect(shoppingCartActions.removeFromCart(4).type).
    toEqual(actionTypes.REMOVE_FROM_CART);
    done();
  });

  it('create an action to REMOVE_FROM_CART_SUCCESS to redux store', (done) => {
    expect(shoppingCartActions.removeFromCartSuccess(res).type).
    toEqual(actionTypes.REMOVE_FROM_CART_SUCCESS);
    done();
  });

  it('create an action to REMOVE_FROM_CART_FAILURE to redux store', (done) => {
    expect(shoppingCartActions.removeFromCartFailure(error).type).
    toEqual(actionTypes.REMOVE_FROM_CART_FAILURE);
    done();
  });
  it('create an action UPDATE_CART to set user in store', (done) => {
    expect(shoppingCartActions.updateCart({quantity: 3, item_id:4}).type).
    toEqual(actionTypes.UPDATE_CART);
    done();
  });

  it('create an action to UPDATE_CART_SUCCESS to redux store', (done) => {
    expect(shoppingCartActions.updateCartSuccess(res).type).
    toEqual(actionTypes.UPDATE_CART_SUCCESS);
    done();
  });

  it('create an action to UPDATE_CART_FAILURE to redux store', (done) => {
    expect(shoppingCartActions.updateCartFailure(error).type).
    toEqual(actionTypes.UPDATE_CART_FAILURE);
    done();
  });
});
