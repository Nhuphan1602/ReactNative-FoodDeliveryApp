import React, {useState} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Image, 
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { colors, fonts, countryCode } from '../constants';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Separator, FlagItem } from "../components";
import { display } from "../utils";
import { StaticImageService } from '../services';

const getDropdownStyle = y => ({...styles.countryDropdown, top: y + 60});

const RegisterPhoneScreen = ({navigation}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countryCode.find(country => country.name === 'Viet Nam'),
  );
  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("")

  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout?.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };

  const handleContainerPress = () => {
    Keyboard.dismiss();
    setIsDropdownOpen(false);
  };
  
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={handleContainerPress}>
        <View
          style={styles.container}
          onStartShouldSetResponder={({nativeEvent: {pageX, pageY}}) =>
            closeDropdown(pageX, pageY)}
          >
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
              <Text style={styles.headerTitle}>RegisterPhone</Text>
          </View>
          <Text style={styles.title}>RegisterPhone</Text>
          <Text style={styles.content}>
              Enter your register phone number to login.
          </Text>
          <View
            style={styles.inputsContainer}
            onLayout={({
              nativeEvent: {
                layout: {y},
              },
            }) => setInputsContainerY(y)}
          >
            <TouchableOpacity 
              style={styles.countryListContainer}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Image
                source={{uri: StaticImageService.getFlagIcon(selectedCountry.code)}}
                style={styles.flatIcon}
              />
              <Text style={styles.countryCodeText}>{selectedCountry.dial_code}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={18}/>
            </TouchableOpacity>
            <View style={styles.phoneInputContainer}>
              <TextInput 
                placeholder='Phone number'
                placeholderTextColor={colors.DEFAULT_GREY}
                selectionColor={colors.DEFAULT_GREY}
                keyboardType='number-pad'
                onFocus={() =>  setIsDropdownOpen(false)}
                // vẫn lỗi khi đang focus input => bấm dropdown => bấm input dropdown vẫn k ẩn
                style={styles.inputText}
                onChangeText={(text) => setPhoneNumber(selectedCountry?.dial_code + text)} />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.signinButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Verification", {phoneNumber})}>
            <Text style={styles.signinButtonText}>Continue</Text>
          </TouchableOpacity>
          { isDropdownOpen && (
            <View
              style={getDropdownStyle(inputsContainerY)}
              onLayout={({
                nativeEvent: {
                  layout: {x, y, height, width},
                },
              }) => setDropdownLayout({x, y, height, width})}>
              <FlatList
                data={countryCode}
                keyExtractor={item => item.code}
                renderItem={({item}) => (
                  <FlagItem
                    {...item}
                    onPress={country => {
                      setSelectedCountry(country);
                      setIsDropdownOpen(false);
                    }}
                  />
                )}
              />
            </View>
          )}
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
inputsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
  marginVertical: 50,
},
countryListContainer: {
  backgroundColor: colors.LIGHT_GREY,
  width: display.setWidth(22),
  marginRight: 10,
  borderRadius: 8,
  height: display.setHeight(6),
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderWidth: 0.5,
  borderColor: colors.LIGHT_GREY2,
  flexDirection: 'row',
},
phoneInputContainer: {
  backgroundColor: colors.LIGHT_GREY,
  paddingHorizontal: 10,
  borderRadius: 8,
  borderWidth: 0.5,
  borderColor: colors.LIGHT_GREY2,
  justifyContent: 'center',
  flex: 1,
},
flatIcon: {
  height: 20,
  width: 20,
},
countryCodeText: {
  fontSize: 14,
  lineHeight: 14 * 1.4,
  color: colors.DEFAULT_BLACK,
  fontFamily: fonts.POPPINS_MEDIUM,
},
inputText: {
  fontSize: 18,
  textAlignVertical: 'center',
  padding: 0,
  height: display.setHeight(6),
  color: colors.DEFAULT_BLACK,
},
countryDropdown: {
  backgroundColor: colors.LIGHT_GREY,
  position: 'absolute',
  width: display.setWidth(80),
  height: display.setHeight(50),
  marginLeft: 20,
  borderRadius: 10,
  borderWidth: 0.5,
  borderColor: colors.LIGHT_GREY2,
  zIndex: 3,
},
signinButton: {
  backgroundColor: colors.SECONDARY_RED,
  borderRadius: 8,
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

});

export default RegisterPhoneScreen;
