import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants";

const RestaurantCard = ({name}) => {
    return (
        <View style={styles.container}>
            <Text style={{color: colors.DEFAULT_BLACK}}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RestaurantCard;