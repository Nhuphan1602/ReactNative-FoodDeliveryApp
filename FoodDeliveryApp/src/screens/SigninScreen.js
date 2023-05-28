import React from "react";
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Separator } from "../components";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SigninScreen = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons
                name="credit-card"
                size={25}
                color="rgba(245,73,88,255)"
            />
            <StatusBar />
            <Separator />
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default SigninScreen;