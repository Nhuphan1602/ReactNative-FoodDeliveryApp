import {apiConstants} from '../constants';
import axios from 'axios';
import {authHeader} from '../utils/generator';
import {getToken} from '../Store';

const getUserData = async () => {
    console.log(`UserService | getUserData`);
    try {
        let userResponse = await axios.get(
            `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.USER}/get-user`,
            {
                headers: authHeader(getToken()),
            },
        );

        if (userResponse?.status === 200) {
            return {
            status: true,
            message: `User data fetched`,
            data: userResponse?.data,
            };
        } else {
            return {
            status: false,
            message: `User data not found`,
            };
    }
    } catch (error) {
        return { 
            status: false,
            message: error?.response?.data?.message
            ? error?.response?.data?.message
            : `User data not found`,
        };
    }
};

const updateUserData = async (userData) => {
  try {
    const response = await axios.put(
      `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.USER}/update-user`,
      userData,
      { headers: authHeader(getToken()) }
    );

    return {
      status: true,
      message: 'User data updated successfully',
      data: response.data
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: 'User data update failed',
      error: error?.response?.data?.message || 'User data update failed',
    };
  }
};

export default {getUserData, updateUserData};