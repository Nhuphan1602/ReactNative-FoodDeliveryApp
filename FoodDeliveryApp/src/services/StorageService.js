import AsyncStorage from "@react-native-async-storage/async-storage";

const setFirstTimeUse = () => {
    return AsyncStorage.setItem("isFirstTimeUse", "true");
};

const getFirstTimeUse = () => {
    return AsyncStorage.getItem("isFirstTimeUse");
};

const setToken = (token) => {
    return AsyncStorage.setItem("token", token);
};

const getToken = () => {
    return AsyncStorage.getItem("token");
};

const clearFirstTimeUse = async () => {
    try {
      await AsyncStorage.removeItem('isFirstTimeUse');
      console.log('isFirstTimeUse cleared successfully.');
    } catch (error) {
      console.log('Error clearing isFirstTimeUse:', error);
    }
  };

export default {setFirstTimeUse, getFirstTimeUse, setToken, getToken, clearFirstTimeUse};