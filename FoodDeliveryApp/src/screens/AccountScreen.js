import React from 'react'
import { View,StyleSheet, Text } from 'react-native'
import { colors, fonts } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StorageService } from '../services';
import { GeneralAction } from '../actions';
import {useDispatch} from 'react-redux';

const AccountScreen = () => {
    const dispatch = useDispatch();
    
    const logout = () => {
        StorageService.setToken('').then(() => {
          dispatch(GeneralAction.setToken(''));
          dispatch(GeneralAction.setUserData(null));
        });
      };
    return (
    <View style={styles.container}>
          <TouchableOpacity
            style={styles.sectionTextContainer}
            activeOpacity={0.8}
            onPress={() => logout()}>
            <MaterialCommunityIcons
              name="logout"
              size={18}
              color={colors.DEFAULT_GREEN}
            />
            <Text style={styles.sectionText}>Logout</Text>
          </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: colors.SECONDARY_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      sectionText: {
        fontSize: 13,
        fontFamily: fonts.POPPINS_REGULAR,
        lineHeight: 13 * 1.4,
        color: colors.INACTIVE_GREY,
        marginLeft: 10,
      },
});
export default AccountScreen
