import {CartAction} from '../actions';

const initialState = {
  cart: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (key) {
    case CartAction.types.GET_CART_ITEMS:
      return {...state, cartItems: action?.payload};
    case CartAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};