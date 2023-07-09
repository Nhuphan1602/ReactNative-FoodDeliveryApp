const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");
const bcrypt = require("bcrypt");


const getUserData = async (username) => {
  try {
    let userObject = await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .findOne({ username });

    if (userObject) {
        return {
            status: true,
            message: "User found successfully",
            data: userObject,
        };
    } else {
        return {
            status: false,
            message: "No user found",
        };
    }
  } catch (error) {
        return {
            status: false,
            message: "User finding failed",
            error: `User finding failed : ${error?.message}`,
        };
  }
};

const updateUserData = async (username, userData) => {
  try {
    const existingUser = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne({ username });

    if (!existingUser) {
      return {
        status: false,
        message: "User not found",
      };
    }

    if (userData.password) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      userData.password = passwordHash;
    }

    const updatedUser = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOneAndUpdate({ username }, { $set: userData }, { returnOriginal: false });

    if (updatedUser.value) {
      return {
        status: true,
        message: "User data updated successfully",
        data: updatedUser.value,
      };
    } else {
      return {
        status: false,
        message: "User data update failed",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "User data update failed",
      error: error?.toString(),
    };
  }
};

module.exports = { getUserData, updateUserData };



  
module.exports = { getUserData, updateUserData };