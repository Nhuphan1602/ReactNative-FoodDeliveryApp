import { AuthenticationService, StorageService } from "../services";
import UserService from "../services/UserService";
import { display } from "../utils"
import BookmarkAction from "./BookmarkAction";
import CartAction from "./CartAction";

const types = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_TOKEN: 'SET_TOKEN',
    SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
    SET_USER_DATA: 'SET_USER_DATA',
}

const setIsAppLoading = (isAppLoading) => {
    return {
        type: types.SET_IS_APP_LOADING,
        payload: isAppLoading
    }
}

const setToken = token => {
    return {
        type: types.SET_TOKEN,
        payload: token
    };
};

const setIsFirstTimeUse = () => {
    return {
        type: types.SET_FIRST_TIME_USE,
        payload: false
    };
};

const appStart = () => {
    return(dispatch, getState) => {
        StorageService.getFirstTimeUse().then(isFirstTimeUse => {
            dispatch({
                type: types.SET_FIRST_TIME_USE,
                payload: isFirstTimeUse ? false : true,
            });
        });
        StorageService.getToken().then((token) => {
            if (token) {
                dispatch({
                    type: types.SET_TOKEN,
                    payload: token,
                });
                UserService.getUserData().then(userResponse => {
                    if(userResponse?.status){
                        dispatch({
                            type: types.SET_USER_DATA,
                            payload: userResponse?.data
                        });
                        dispatch(CartAction.getCartItems());

                        setTimeout(() => {
                            dispatch({
                                type: types.SET_IS_APP_LOADING,
                                payload: false
                            });
                        }, 2000);
                        
                    } else if (userResponse?.message === 'TokenExpiredError'){
                        AuthenticationService.refreshToken().then(tokenResponse => {
                            if(tokenResponse?.status) {
                                dispatch({
                                    type: types.SET_TOKEN,
                                    payload: tokenResponse?.data,
                                });
                                UserService.getUserData().then(userResponse => {
                                    if(userResponse?.status){
                                        dispatch({
                                            type: types.SET_USER_DATA,
                                            payload: userResponse?.data
                                        });
                                        dispatch({
                                            type: types.SET_IS_APP_LOADING,
                                            payload: false
                                        });
                                    }
                                });
                            } else {
                                dispatch({
                                    type: types.SET_TOKEN,
                                    payload: '',
                                });
                            }
                        });
                    }
                })
            }
        });
  
        setTimeout(() => {
            dispatch({
                type: types.SET_IS_APP_LOADING,
                payload: false
            });
        }, 2000);
    };
}

const setUserData = userData => {
    return {
      type: types.SET_USER_DATA,
      payload: userData,
    };
}

const updateUserData = (userData) => {
    return async (dispatch) => {
      const response = await UserService.updateUserData(userData);
  
      if (response.status) {
        dispatch(setUserData(response.data));
      }
  
      return response;
    };
  };
  

export default {setIsAppLoading, setToken, appStart, setIsFirstTimeUse, types, setUserData, updateUserData};