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
    Keyboard  
} from 'react-native';
import { Separator } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { colors, fonts } from "../constants";
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
                        size={25} 
                        onPress={() => navigation.goBack()} 
                        />
                        <Text style={styles.headerTitle}>Forgot Password</Text>
                    </View>
                    <Text style={styles.title}>Forgot password</Text>
                    <Text style={styles.content}>
                        Enter your email, so that we can help you to recover your password.
                    </Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>
                            <Feather 
                            name="mail" 
                            size={22} 
                            color={colors.DEFAULT_GREY} 
                            style={{marginRight:10}}
                            />
                            <TextInput 
                            placeholder="Email" 
                            placeholderTextColor={colors.DEFAULT_GREY}
                            selectionColor={colors.DEFAULT_GREY}
                            style={styles.inputText}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.signinButton}>
                        <Text style={styles.signinButtonText}>Reset Password</Text>
                    </TouchableOpacity>
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
    signinButton:{
        backgroundColor: colors.SECONDARY_RED,
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
});

export default ForgotPasswordScreen;