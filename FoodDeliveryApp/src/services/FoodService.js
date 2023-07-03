import { apiConstants } from '../constants';
import axios from 'axios';
import { authHeader } from '../utils/generator';
import { getToken } from '../Store';

const getOneFoodById = async (foodId) => {
  console.log(`FoodService | getOneFoodById`);
  try {
    let foodResponse = await axios.get(
      `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.FOOD}/${foodId}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (foodResponse?.status === 200) {
      return {
        status: true,
        message: `Food data fetched`,
        data: foodResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Food data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Food data not found`,
    };
  }
};

export default {getOneFoodById};