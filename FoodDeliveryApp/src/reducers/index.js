import {combineReducers} from 'redux';

import GeneralReducer from './GeneralReducer';
import CartReducer from './CartReducer';
import BookmarkReducer from './BookmarkReducer';
import LocationReducer from './LocationReducer';

export default combineReducers({
  generalState: GeneralReducer,
  cartState: CartReducer,
  bookmarkState: BookmarkReducer,
  locationState: LocationReducer,
});
