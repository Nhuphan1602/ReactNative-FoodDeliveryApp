import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar, 
    TextInput, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView, 
    Keyboard,
    Image,
} from 'react-native';
import { Separator } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { colors, fonts, images } from "../constants";
import { display } from "../utils";

const ForgotPasswordScreen = ({navigation}) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            size={22} 
                            onPress={() => navigation.goBack()} 
                        />
                        <View style={styles.logoGroup}>
                            <Image 
                                style={styles.image} 
                                source={images.LOGO}
                                resizeMode="contain"    
                            />
                            <Text style={styles.logoGroupText}>FOOD EXPRESS</Text>
                        </View>
                    </View> 
                    <Text style={styles.title}>Forgot password</Text>
                    <Text style={styles.content}>
                        Enter your email, so that we can help you to recover your password.
                    </Text>
                    <Separator height={15}/>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>
                            <Feather 
                                name="mail" 
                                size={22} 
                                color={colors.DEFAULT_GREY} 
                                style={{marginRight:10}}
                            />
                            <TextInput 
                                multiline={false}
                                maxLength={12}
                                autoCorrect={false} // Disable auto correction
                                autoCapitalize="none" // Disable auto capitalization
                                placeholder="Email" 
                                placeholderTextColor={colors.DEFAULT_GREY}
                                selectionColor={colors.DEFAULT_GREY}
                                style={styles.inputText}
                            />
                        </View>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.signinButton}>
                        <Text style={styles.signinButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                    <Separator height={30}/>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.DEFAULT_WHITE
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 30,
    },
    logoGroup:{
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    image: {
        height: display.setHeight(15),
        width: display.setWidth(15),
        overflow: 'visible',
        borderRadius: 20,
      },
    logoGroupText: {
        fontSize: 14,
        fontFamily: fonts.POPPINS_MEDIUM,
        color: colors.SECONDARY_RED,
        marginLeft: 8,
        marginRight: 25,
        alignSelf: 'center'
      },
    title: {
        fontSize: 24,
        fontFamily: fonts.POPPINS_BOLD,
        lineHeight: 20 * 1.4,
        marginHorizontal: 20,
        textAlign: 'center',
      },
    content: {
        fontSize: 15,
        fontFamily: fonts.POPPINS_MEDIUM,
        color: colors.DARK_GRAYISH_BLUE,
        marginTop: 5,
        marginHorizontal: 20,
        textAlign: 'center',
      },
    inputContainer: {
        backgroundColor: colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: colors.LIGHT_GREY2,
        justifyContent: 'center',
      },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        fontSize: 16,
        textAlignVertical: 'center',
        padding: 0,
        height: display.setHeight(6),
        color: colors.DEFAULT_BLACK,
        flex: 1,
    },
    signinButton:{
        backgroundColor: colors.SECONDARY_RED,
        borderRadius: 12,
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
});

export default ForgotPasswordScreen;