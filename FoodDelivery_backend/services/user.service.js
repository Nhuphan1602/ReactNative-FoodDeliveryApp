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

    const updatedUserData = {
      fullName: userData.fullName,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth
    };

    // Update user data in the users collection
    const updateUser = await MongoDB.db
    .collection(mongoConfig.collections.USERS)
    .updateOne(
      { username },
      { $set: updatedUserData }
    );

    // Handle password update
    if (userData.password) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      // Update password in the users collection
      await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .updateOne(
          { username },
          { $set: { password: passwordHash } }
        );
    }
    
    return {
      status: true,
      message: "User data updated successfully",
    };
    
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


