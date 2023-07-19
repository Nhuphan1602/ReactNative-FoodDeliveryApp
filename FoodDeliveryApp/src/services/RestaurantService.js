import { apiConstants } from '../constants';
import axios from 'axios';
import { authHeader } from '../utils/generator';
import { getToken } from '../Store';

const getRestaurants = async () => {
  console.log(`RestaurantService | getRestaurants`);
  try {
    let restaurantResponse = await axios.get(
      `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.RESTAURANT}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Restaurant data fetched`,
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Restaurant data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Restaurant data not found`,
    };
  }
};

const getOneRestaurantById = async (restaurantId) => {
  console.log(`RestaurantService | getOneRestaurantById`);
  try {
    let restaurantResponse = await axios.get(
      `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.RESTAURANT}/${restaurantId}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Restaurant data fetched`,
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Restaurant data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Restaurant data not found`,
    };
  }
};
const searchRestaurants = async (searchQuery) => {
  console.log(`RestaurantService | searchRestaurants: ${searchQuery}`);
  try {
    const response = await axios.get(
      `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.RESTAURANT}/search`,
      {
        params: {
          query: searchQuery,
        },
        headers: authHeader(getToken()),
      }
    );

    if (response?.status === 200) {
      return {
        status: true,
        message: "Restaurants found successfully",
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: "No restaurants found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Restaurant search failed",
      error: error?.message,
    };
  }
};

export default {getRestaurants, getOneRestaurantById, searchRestaurants};