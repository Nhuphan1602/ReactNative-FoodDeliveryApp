import { apiConstants } from '../constants';
import axios from 'axios';
import { authHeader } from '../utils/generator';
import { getToken } from '../Store';

const getBookmarks = async () => {
  console.log(`BookmarkService | getBookmarks`);
  try {
    let response = await axios.get(
      `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.BOOKMARK}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Bookmark data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Bookmark data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Bookmark data not found`,
    };
  }
};

const addBookmark = async ({ restaurantId }) => {
    console.log(`BookmarkService | addBookmark`);
    try {
      let response = await axios.post(
        `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.BOOKMARK}/${restaurantId}`,
        {},
        {
          headers: authHeader(getToken()),
        },
      );
      if (response?.status === 200) {
        return {
          status: true,
          message: `Bookmark added successfully`,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `Bookmark adding failed`,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: `Bookmark added failed`,
      };
    }
  };

const removeBookmark = async ({ restaurantId }) => {
    console.log(`BookmarkService | removeBookmark`);
    try {
      let response = await axios.delete(
        `${apiConstants.BACKEND_API.BASE_API_URL}${apiConstants.BACKEND_API.BOOKMARK}/${restaurantId}`,
        {
          headers: authHeader(getToken()),
        },
      );
      if (response?.status === 200) {
        return {
          status: true,
          message: `Bookmark removed successfully`,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `Bookmark removing failed`,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: `Bookmark removing failed`,
      };
    }
  };

export default {getBookmarks, addBookmark, removeBookmark};