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

    // Handle username update
    if (userData.username && userData.username !== existingUser.username) {
      // Update username in the users collection
      await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .updateOne(
          { username },
          { $set: { username: userData.username } }
        );

      // Update username in the bookmarks collection
      await MongoDB.db
        .collection(mongoConfig.collections.BOOKMARKS)
        .updateMany(
          { username: existingUser.username },
          { $set: { username: userData.username } }
        );

      // Update username in the carts collection
      await MongoDB.db
        .collection(mongoConfig.collections.CARTS)
        .updateMany(
          { username: existingUser.username },
          { $set: { username: userData.username } }
        );
    }

    // Handle email and password update
    const updateFields = {};

    if (userData.email && userData.email !== existingUser.email) {
      updateFields.email = userData.email;
    }

    if (userData.password) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      updateFields.password = passwordHash;
    }

    // Update user data in the users collection
    if (Object.keys(updateFields).length > 0) {
      await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .updateOne(
          { username: userData.username },
          { $set: updateFields } 
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


