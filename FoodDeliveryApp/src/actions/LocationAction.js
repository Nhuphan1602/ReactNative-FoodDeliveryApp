const types = {
  SET_LOCATION: 'SET_LOCATION',
};

const setLocation = (location) => {
    return dispatch => {
      dispatch({
        type: types.SET_LOCATION,
        payload: location,
      });
    };
};
  
export default {types, setLocation};
