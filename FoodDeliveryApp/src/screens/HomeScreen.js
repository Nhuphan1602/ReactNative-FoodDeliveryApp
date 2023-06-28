import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { CategoryMenuItem, Separator } from "../components";
import { colors, fonts, mock } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather"
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { RestaurantService } from "../services";
import RestaurantCard from "../components/RestaurantCard";

const HomeScreen = ({navigation}) => {
    const [activeCategory, setActiveCategory] = useState()
    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            RestaurantService.getRestaurants().then(response => {
                if (response?.status) {
                    console.log(response?.data);
                    setRestaurants(response?.data);
                }
            });
        });
        return unsubscribe;
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor={colors.SECONDARY_RED}
                translucent
            />
            <Separator height={StatusBar.currentHeight}/>
            <View style={styles.backgroundCurvedContainer}/>
            <View style={styles.headerContainer}>
                <View style={styles.locationContainer}>
                    <Ionicons 
                        name="location-outline" 
                        size={15} 
                        color={colors.DEFAULT_WHITE}
                    />
                    <Text style={styles.locationText}>Delivery to</Text>
                    <Text style={styles.selectedLocationText}>HOME</Text>
                    <MaterialIcons 
                        name="keyboard-arrow-down" 
                        size={16} 
                        color={colors.DEFAULT_GREEN}
                    />
                    <Feather 
                        name="bell" 
                        size={24} 
                        color={colors.DEFAULT_WHITE}
                        style={{position: 'absolute', right: 0}}
                    />
                    <View style={styles.alertBadge}>
                        <Text style={styles.alertBadgeText}>12</Text>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.searchSection}>
                        <Ionicons name="search-outline" size={25} color={colors.DEFAULT_GREY}/>
                        <Text style={styles.searchText}>Search..</Text>
                    </View>
                    <Feather 
                        name="sliders" 
                        size={20} 
                        color={colors.DEFAULT_GREEN} 
                        style={{marginRight: 10}}
                    />
                </View>
                <View style={styles.categoriesContainer}>
                    {mock.CATEGORIES.map(({name, logo}) => (
                        <CategoryMenuItem
                        key={name}
                        name={name}
                        logo={logo}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        />
                    ))}
                </View>
            </View>
            <ScrollView style={styles.listContainer}>
                <View style={styles.horizontalListContainer}>
                    <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>Top Rated</Text>
                    <Text style={styles.listHeaderSubtitle}>See All</Text>
                    </View>
                    <FlatList 
                        data={restaurants} 
                        keyExtractor={item => item?.id} 
                        horizontal 
                        renderItem={({item}) => <RestaurantCard {...item}/>}/>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.DEFAULT_WHITE
    },
    headerContainer: {
        justifyContent: 'space-evenly',
    },
    backgroundCurvedContainer: {
        backgroundColor: colors.SECONDARY_RED,
        height: 2000,
        position: 'absolute',
        top: -1 * (2000 - 230),
        width: 2000,
        borderRadius: 2000,
        alignSelf: 'center',
        zIndex: -1
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        marginHorizontal: 20
    },
    locationText: {
        color: colors.DEFAULT_WHITE,
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: fonts.POPPINS_BOLD
    },
    selectedLocationText: {
        color: colors.DEFAULT_GREEN,
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 14 * 1.4,
        fontFamily: fonts.POPPINS_BOLD
    }, 
    alertBadge: {
        borderRadius: 32,
        backgroundColor: colors.DEFAULT_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 16,
        position: 'absolute',
        right: -2,
        top: -10
    },
    alertBadgeText: {
        color: colors.DEFAULT_WHITE,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: fonts.POPPINS_BOLD
    },
    searchContainer: {
        backgroundColor: colors.DEFAULT_WHITE,
        height: 45,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    }, 
    searchText: {
        color: colors.DEFAULT_GREY,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: fonts.POPPINS_MEDIUM,
        marginLeft: 10
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    listContainer: {
        paddingVertical: 5,
        zIndex: -5,
      },
      horizontalListContainer: {
        marginTop: 30,
      },
      listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 5,
      },
      listHeaderTitle: {
        color: colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: fonts.POPPINS_MEDIUM,
      },
      listHeaderSubtitle: {
        color: colors.DEFAULT_YELLOW,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: fonts.POPPINS_MEDIUM,
      },
});

export default HomeScreen;