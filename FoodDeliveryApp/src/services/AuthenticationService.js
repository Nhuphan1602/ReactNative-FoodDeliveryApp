import axios from 'axios';
import {apiConstants} from '../constants';

const AuthRequest = axios.create({
    baseURL: apiConstants.BACKEND_API.BASE_API_URL,
});

const register = async user => {
    if (!user?.username || !user?.email || !user?.password) {
        return {status: false, message: 'Please fill up all fields'};
    }
    try {
    let requestBody = {
        username: user?.username,
        email: user?.email,
        password: user?.password,
    };
    let registerResponse = await AuthRequest.post(
        apiConstants.BACKEND_API.REGISTER,
        requestBody,
    );
    return registerResponse?.data;
    } catch (error) {
        console.log(error);
        return {status: false, message: 'Oops! Something went wrong'};
    }
};

const login = async user => {
    if (!user?.username || !user?.password) {
        return {status: false, message: 'Please fill up all fields'};
    }
    try {
    let requestBody = {
        username: user?.username,
        password: user?.password,
    };
    let loginResponse = await AuthRequest.post(
        apiConstants.BACKEND_API.LOGIN,
        requestBody,
    );
    return loginResponse?.data;
    } catch (error) {
        console.log(error);
        return {status: false, message: 'Oops! Something went wrong'};
    }
};


const checkUserExist = async (type, value) => {
    try {
      let params = {[type]: value};
      let userCheckResponse = await AuthRequest.get(
        apiConstants.BACKEND_API.USER_EXIST,
        {params},
      );
      return userCheckResponse?.data;
    } catch (error) {
      console.log(error);
      return {status: false, message: 'Oops! Something went wrong'};
    }
  };


export default {register, login, checkUserExist};