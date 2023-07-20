var express = require("express");
const { 
    getAllRestaurant, 
    getOneRestaurantById, 
    searchRestaurants
} = require("../services/restaurant.service");
var router = express.Router();

router.get("/", async (req, res) => {
    let response = await getAllRestaurant();
    res.json(response);
});

router.get("/search", async (req, res) => {
    const { query } = req.query;
    console.log(query);
    let response = await searchRestaurants(query);
    res.json(response);
});

router.get("/:restaurantId", async (req, res) => {
    let restaurantId = req?.params?.restaurantId
    let response = await getOneRestaurantById(restaurantId);
    res.json(response);
});

module.exports = router;
