import React, {useRef, useState} from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Image } from "react-native";
import { Separator } from "../components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts, images } from "../constants";
import { display } from "../utils";

const VerificationScreen = ({ 
      route: {
        params: {phoneNumber}
      },
      navigation
    }) => {
        const firstInput = useRef();
        const secondInput = useRef();
        const thirdInput = useRef();
        const fourthInput = useRef();
        const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
          
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
              <View style={styles.logoGroup}>
                  <Image 
                      style={styles.image} 
                      source={images.LOGO}
                      resizeMode="contain"    
                  />
                  <Text style={styles.logoGroupText}>FOOD EXPRESS</Text>
              </View>
            </View> 
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.content}>
                Enter the OTP number just sent you at{' '}
              <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
            </Text>
            <View style={styles.otpContainer}>
                <View style={styles.otpBox}>
                    <TextInput 
                       style={styles.otpText} 
                       keyboardType="number-pad" 
                       maxLength={1}
                       ref={firstInput}
                       onChangeText={(text) => {
                          setOtp({...otp, 1: text})
                          text && secondInput.current.focus()
                       }}
                       />
                </View>
                <View style={styles.otpBox}>
                    <TextInput 
                       style={styles.otpText} 
                       keyboardType="number-pad" 
                       maxLength={1}
                       ref={secondInput}
                       onChangeText={(text) => {
                          setOtp({...otp, 2: text})
                          text ? thirdInput.current.focus() : firstInput.current.focus()
                       }}
                       />
                </View>
                <View style={styles.otpBox}>
                    <TextInput 
                       style={styles.otpText} 
                       keyboardType="number-pad" 
                       maxLength={1}
                       ref={thirdInput}
                       onChangeText={(text) => {
                          setOtp({...otp, 3: text})
                          text ? fourthInput.current.focus() : secondInput.current.focus()
                       }}
                       />
                </View>
                <View style={styles.otpBox}>
                    <TextInput 
                       style={styles.otpText} 
                       keyboardType="number-pad" 
                       maxLength={1}
                       ref={fourthInput}
                       onChangeText={(text) => {
                          setOtp({...otp, 4: text})
                          !text && thirdInput.current.focus()
                       }}
                       />
                </View>
            </View>
            <View style={styles.resendCodeGroup}>
                <Text style={styles.resendCodeGroupText}>Didn't receive code?</Text>
                <Text style={[styles.resendCodeGroupText, {color: colors.SECONDARY_RED}]}>Resend (59s)</Text>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity 
                style={styles.signinButton} 
                onPress={() => console.log(otp)}>
                <Text style={styles.signinButtonText}>Verify</Text>
            </TouchableOpacity>
            <View style={styles.termGroup}>
            <Text style={styles.termGroupText}>By signing up, you agree to our</Text>
            <Text style={[styles.termGroupText, {color: colors.SECONDARY_RED}]}>Terms and Conditions</Text>
          </View>
          <Separator height={30}/>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
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
        marginBottom: 20,
        marginHorizontal: 20,
        textAlign: 'center',
      },
    phoneNumberText: {
        fontSize: 18,
        fontFamily: fonts.POPPINS_REGULAR,
        lineHeight: 18 * 1.4,
        color: colors.SECONDARY_RED,
    },
    otpContainer: {
        marginHorizontal: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    otpBox: {
        borderRadius: 5,
        borderColor: colors.SECONDARY_RED,
        borderWidth: 0.5,
        width: display.setWidth(13),
    },
    otpText: {
        fontSize: 25,
        color: colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    signinButton: {
        backgroundColor: colors.SECONDARY_RED,
        borderRadius: 12,
        marginHorizontal: 20,
        height: display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: colors.DEFAULT_WHITE,
        fontFamily: fonts.POPPINS_MEDIUM,
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: colors.DEFAULT_WHITE,
        fontFamily: fonts.POPPINS_MEDIUM,
      },
    resendCodeGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 20,
      },
    resendCodeGroupText: {
        fontSize: 14,
        fontFamily: fonts.POPPINS_REGULAR,
        color: colors.DARK_GRAYISH_BLUE,
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 5,
        textAlign: 'center',
      },
    termGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 20,
      },
    termGroupText: {
        fontSize: 14,
        fontFamily: fonts.POPPINS_REGULAR,
        color: colors.DARK_GRAYISH_BLUE,
        marginTop: 5,
        marginHorizontal: 5,
        textAlign: 'center',
      },
});

export default VerificationScreen;