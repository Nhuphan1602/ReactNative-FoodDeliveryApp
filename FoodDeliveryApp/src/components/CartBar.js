import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../constants'


const CartBar = ({count, price}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>      
         <Text style={styles.countText}>{count}</Text> 
      </View>
      <Text style={styles.viewCartText}>View cart</Text>
      <Text style={styles.priceText}>$ {price}</Text>
    </View>
  )
}


export default CartBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.SECONDARY_RED,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 100,
        marginHorizontal: 20,
    },
    textContainer: {
        justifyContent: 'center',
        width: 30, 
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.LIGHT_RED,
    },
    countText: {
        textAlign: 'center',
        color: colors.DEFAULT_BLACK,
        fontSize: 16,
    },
    viewCartText: {
        fontFamily: fonts.POPPINS_MEDIUM,
        fontSize: 16,
    }, 
    priceText: {
        fontFamily: fonts.POPPINS_MEDIUM,
        fontSize: 16,
        color: colors.DEFAULT_WHITE,
    }, 
});