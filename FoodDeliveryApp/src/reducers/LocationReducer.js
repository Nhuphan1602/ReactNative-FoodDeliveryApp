import { LocationAction } from "../actions";

const initialState = {
    location: {}
}

export default (state = initialState, action) => {
      switch(action.type){
        case LocationAction.types.SET_LOCATION:
            return {...state, location: action.payload};
        default:
            return state;
      }
};
