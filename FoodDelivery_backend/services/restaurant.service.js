const {mongoConfig} = require("../config");
const MongoDB = require("./mongodb.service");

const getAllRestaurant = async () => {
    try {
        let restaurants = await MongoDB.db
        .collection(mongoConfig.collections.RESTAURANTS)
        .find().toArray()

    if (restaurants && restaurants?.length > 0) {
        return {
            status: true,
            message: "Restaurants found successfully",
            data: restaurants,
        };
    } else {
        return {
            status: false,
            message: "No restaurants found (get all)",
        };
    }
    } catch (error) {
        return {
            status: false,
            message: "Restaurant finding failed",
            error: `Restaurant finding failed : ${error?.message}`,
        };
    }
};

const getOneRestaurantById = async (restaurantId) => {
    try {
        let restaurant = await MongoDB.db
        .collection(mongoConfig.collections.RESTAURANTS).aggregate([
            {
              $match: {
                'id': restaurantId
              }
            }, {
              $lookup: {
                from: 'foods', 
                localField: 'id', 
                foreignField: 'restaurantId', 
                as: 'foods'
              }
            }
          ])
        .toArray()

        if (restaurant && restaurant?.length > 0) {
            return {
                status: true,
                message: "Restaurant found successfully",
                data: restaurant[0],
            };
        } else {
            return {
                status: false,
                message: "No restaurant found (get one)",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Restaurant finding failed",
            error: `Restaurant finding failed : ${error?.message}`,
        };
    }
};

const searchRestaurants = async (query) => {
    try {
 
        const searchQuery = {
            $or: [
                { name: { $regex: new RegExp(query, "i") } },
                { type: { $regex: new RegExp(query, "i") } },
                { tags: { $in: [query] } }, // Use $all to match all tags in the array
            ],
        };
        
        const restaurants = await MongoDB.db
        .collection(mongoConfig.collections.RESTAURANTS)
        .find(searchQuery)
        .toArray();

        console.log(restaurants)

        if (restaurants && restaurants.length > 0) {
            return {
                status: true,
                message: "Restaurants found successfully",
                data: restaurants,
            };
        } else {
            return {
                status: false,
                message: "No restaurants found sss",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Restaurant finding failed",
            error: `Restaurant finding failed: ${error?.message}`,
        };
    }
};


module.exports = { getAllRestaurant, getOneRestaurantById, searchRestaurants };