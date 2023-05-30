import React, {useState} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import { Separator, ToggleButton } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { colors, fonts, images } from "../constants";
import { display } from "../utils";

const SigninScreen = ({navigation}) => {
    const[isPasswordShow,setPasswordShow] = useState(false);
    return (
        <View style={styles.container}>
            <StatusBar 
              barStyle="dark-content" 
              backgroundColor={colors.DEFAULT_WHITE}
              translucent
            />
            <Separator height={StatusBar.currentHeight}/>
            <View style={styles.headerContainer}>
                <Ionicons 
                name="chevron-back-outline" 
                size={25} 
                onPress={() => navigation.goBack()} 
                />
                <Text style={styles.headerTitle}>Sign In</Text>
            </View>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.content}>Enter your username and password, and enjoy ordering food
            </Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather 
                    name="user" 
                    size={22} 
                    color={colors.DEFAULT_GREY} 
                    style={{marginRight:10}}
                    />
                    <TextInput 
                    placeholder="Username" 
                    placeholderTextColor={colors.DEFAULT_GREY}
                    selectionColor={colors.DEFAULT_GREY}
                    style={styles.inputText}
                    />
                </View>
            </View>
            <Separator height={15}/>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather 
                    name="lock" 
                    size={22} 
                    color={colors.DEFAULT_GREY} 
                    style={{marginRight:10}}
                    />
                    <TextInput
                    secureTextEntry={isPasswordShow ? false: true}
                    placeholder="Password" 
                    placeholderTextColor={colors.DEFAULT_GREY}
                    selectionColor={colors.DEFAULT_GREY}
                    style={styles.inputText}
                    />
                    <Feather
                    name={isPasswordShow ? 'eye' : 'eye-off'}
                    size={22} 
                    color={colors.DEFAULT_GREY} 
                    style={{marginRight:10}}
                    onPress={()=> setPasswordShow(!isPasswordShow)}
                    />
                </View>
            </View>
            <Text></Text>
            <View style={styles.forgotPasswordContainer}>
                <View style={styles.toggleContainer}>
                    <ToggleButton size={0.5}/>
                    <Text style={styles.rememberMeText}>Remember me</Text>
                </View>
                <Text style={styles.forgotPasswordText}>Forgot password</Text>
            </View>
            <TouchableOpacity style={styles.signinButton}>
                <Text style={styles.signinButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
                <Text style={styles.accountText}>Don't have an account?</Text>
                <Text style={styles.signupText}>Sign Up</Text>
            </View>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity style={styles.facebookButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.signinButtonLogoContainer}>
                        <Image source={images.FACEBOOK} style={styles.signinButtonLogo}/>
                    </View>
                    <Text style={styles.socialSigninButtonText}>Connect with Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.signinButtonLogoContainer}>
                        <Image source={images.GOOGLE} style={styles.signinButtonLogo}/>
                    </View>
                    <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: fonts.POPPINS_MEDIUM,
        lineHeight:  20 * 1.4,
        width: display.setWidth(83),
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    content: {
        fontSize: 15,
        fontFamily: fonts.POPPINS_MEDIUM,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,

    },
    inputContainer: {
        backgroundColor: colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWWidth: 0.5,
        borderColor: colors.LIGHT_GREY2,
        justifyContent: 'center',
    },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: display.setHeight(6),
        color: colors.DEFAULT_BLACK,
        flex: 1,
    },
    forgotPasswordContainer:{
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rememberMeText:{
        marginLeft: 10,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: colors.DEFAULT_GREY,
        fontFamily: fonts.POPPINS_MEDIUM
    },
    forgotPasswordText:{
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: colors.DEFAULT_GREEN,
        fontFamily: fonts.POPPINS_BOLD
    },
    signinButton:{
        backgroundColor: colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signinButtonText:{
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: colors.DEFAULT_WHITE,
        fontFamily: fonts.POPPINS_MEDIUM
    },
    signupContainer:{
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    accountText:{
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: colors.DEFAULT_BLACK,
        fontFamily: fonts.POPPINS_MEDIUM
    },
    signupText:{
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: colors.DEFAULT_GREEN,
        fontFamily: fonts.POPPINS_MEDIUM,
        marginLeft: 5,
    },
    orText:{
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: colors.DEFAULT_BLACK,
        fontFamily: fonts.POPPINS_MEDIUM,
        marginLeft: 5,
        alignSelf: 'center',
    },
    facebookButton:{
        backgroundColor: colors.FABEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleButton:{
        backgroundColor: colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinButtonLogo:{
        height: 18,
        width: 18,
    },
    signinButtonLogoContainer:{
        backgroundColor: colors.DEFAULT_WHITE,
        padding: 2,
        borderRadius: 3,
        position: 'absolute',
        left: 25,
    },
    socialButtonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    socialSigninButtonText:{
        color: colors.DEFAULT_WHITE,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: fonts.POPPINS_MEDIUM,
    },
    toggleContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default SigninScreen;