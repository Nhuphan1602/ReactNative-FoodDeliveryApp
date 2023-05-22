import React from "react";
import { View, StyleSheet, Text, Image} from "react-native";
import { display } from "../utils";
import { colors, fonts, images } from "../constants";

const WelcomeCard = ({title, content, image}) => {
    return (
        <View style= {styles.container}>
            <Image 
                style={styles.image} 
                source={images[image]}
                resizeMode="contain"    
                />
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.contentText}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.DEFAULT_WHITE,
        width: display.setWidth(100)
    },
    image: {
        height: display.setHeight(30),
        width: display.setWidth(60),
    },
    titleText: {
        fontSize: 22,
        fontFamily: fonts.POPPINS_BOLD,
    },
    contentText: {
        fontSize: 18,
        fontFamily: fonts.POPPINS_LIGHT,
        textAlign: 'center',
        marginHorizontal: 20,

    }
});

export default WelcomeCard;
