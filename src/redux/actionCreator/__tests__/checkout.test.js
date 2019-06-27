import * as actionTypes from '../../constants/actionTypes';
import * as checkoutActions from '../checkout';

const res = {
  data:{},
  error: false
};

const error = '';

describe('Test for checkout actions', () => {
  it('create an action GET_SHIPPING_REGIONS to set user in store', (done) => {
    expect(checkoutActions.getShippingRegions().type).
    toEqual(actionTypes.GET_SHIPPING_REGIONS);
    done();
  });

  it('create an action to GET_SHIPPING_REGIONS_SUCCESS to redux store', (done) => {
    expect(checkoutActions.getShippingRegionsSuccess(res).type).
    toEqual(actionTypes.GET_SHIPPING_REGIONS_SUCCESS);
    done();
  });

  it('create an action to GET_SHIPPING_REGIONS_FAILURE to redux store', (done) => {
    expect(checkoutActions.getShippingRegionsFailure(error).type).
    toEqual(actionTypes.GET_SHIPPING_REGIONS_FAILURE);
    done();
  });
  it('create an action GET_SHIPPING_COSTS to set user in store', (done) => {
    expect(checkoutActions.getShippingCost().type).
    toEqual(actionTypes.GET_SHIPPING_COSTS);
    done();
  });

  it('create an action to GET_SHIPPING_COSTS_SUCCESS to redux store', (done) => {
    expect(checkoutActions.getShippingCostSuccess(res).type).
    toEqual(actionTypes.GET_SHIPPING_COSTS_SUCCESS);
    done();
  });

  it('create an action to GET_SHIPPING_COSTS_FAILURE to redux store', (done) => {
    expect(checkoutActions.getShippingCostFailure(error).type).
    toEqual(actionTypes.GET_SHIPPING_COSTS_FAILURE);
    done();
  });
  it('create an action CREATE_ORDER to set user in store', (done) => {
    expect(checkoutActions.createOrder({ cart_id:1, shipping_id:3 }).type).
    toEqual(actionTypes.CREATE_ORDER);
    done();
  });

  it('create an action to CREATE_ORDER_SUCCESS to redux store', (done) => {
    expect(checkoutActions.createOrderSuccess(res).type).
    toEqual(actionTypes.CREATE_ORDER_SUCCESS);
    done();
  });

  it('create an action to CREATE_ORDER_FAILURE to redux store', (done) => {
    expect(checkoutActions.createOrderFailure(error).type).
    toEqual(actionTypes.CREATE_ORDER_FAILURE);
    done();
  });
  it('create an action STRIPE_CHARGE to set user in store', (done) => {
    expect(checkoutActions.stripeCharge({ stripeToken:1, order_id:3, description: "described", amount: 644 }).type).
    toEqual(actionTypes.STRIPE_CHARGE);
    done();
  });

  it('create an action to STRIPE_CHARGE_SUCCESS to redux store', (done) => {
    expect(checkoutActions.stripeChargeSuccess(res).type).
    toEqual(actionTypes.STRIPE_CHARGE_SUCCESS);
    done();
  });

  it('create an action to STRIPE_CHARGE_FAILURE to redux store', (done) => {
    expect(checkoutActions.stripeChargeFailure(error).type).
    toEqual(actionTypes.STRIPE_CHARGE_FAILURE);
    done();
  });
});
