import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { RestaurantService } from "../services";
import { colors, fonts, images } from "../constants";
import RestaurantMediumCard from "../components/RestaurantMediumCard";
import Separator from "../components/Separator";
import Ionicons from "react-native-vector-icons/Ionicons";


const SearchScreen = ({ navigation, route }) => {
  const { searchQuery } = route.params;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults([]);
    loadSearchResults();
  }, []);

  const loadSearchResults = async () => {
    try {
      const response = await RestaurantService.searchRestaurants(searchQuery);
      console.log(response)
      console.log(response.status)
      if (response?.status) {
        if(response?.data === undefined) {
          setSearchResults([]);
        } else {
          setSearchResults([...response?.data]);
        }
      }
    } catch (error) {
      console.error("Error searching restaurants:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <Ionicons 
            name="chevron-back-outline" 
            size={22} 
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Search Results for "{searchQuery || "all"}"</Text>
      </View> 
      
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Restaurant", { restaurantId: item?.id })}
          >
            <RestaurantMediumCard {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Image source={images.EMPTY_SEARCH} style={styles.emptyImage} />
            <Text style={styles.emptyListText}>No restaurants found</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <Separator height={10} />}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_WHITE,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 35,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 10,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  emptyListText: {
    fontSize: 16,
    fontFamily: fonts.POPPINS_MEDIUM,
    textAlign: "center",
  },
});

export default SearchScreen;
