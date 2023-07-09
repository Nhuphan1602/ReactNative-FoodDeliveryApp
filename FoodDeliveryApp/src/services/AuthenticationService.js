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
            phoneNumber: user?.phoneNumber,
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

const sendOTP = async (phoneNumber) => {
    try {
        console.log(phoneNumber)
        let sendOTPResponse = await AuthRequest.post(
        apiConstants.BACKEND_API.SEND_OTP,
        { phoneNumber }
        );
        return sendOTPResponse?.data;
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Oops! Something went wrong' };
    }
};
  

const verifyOTP = async (phoneNumber, code) => {
    try {
        console.log(phoneNumber + code)
        let requestBody = { 
            phoneNumber: phoneNumber,
            code: code
         };
        let verifyOTPResponse = await AuthRequest.post(
        apiConstants.BACKEND_API.VERIFY_OTP,
        { requestBody }
        );
        return verifyOTPResponse?.data;
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Oops! Something went wrong' };
    }
};

const refreshToken = async () => {
    try {
        let tokenResponse = await AuthRequest.post(
            apiConstants.BACKEND_API.REFRESH_TOKEN,
            {headers: authHeader(getToken())},
        );
        if (tokenResponse?.status === 200) {
            return {status: true, data: tokenResponse?.data};
        } else {
            return {status: false};
        }
    } catch (error) {
        console.log(error);
        return {status: false, message: 'Oops! Something went wrong'};
    }
    };


export default {register, login, checkUserExist, refreshToken, sendOTP, verifyOTP};