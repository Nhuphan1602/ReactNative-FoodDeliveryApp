import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constants';
import {BookmarkCard, Separator} from '../components';
import {display} from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const ListItemSeparator = () => (
  <View
    style={{
      height: 0.5,
      backgroundColor: colors.DEFAULT_GREY,
      width: '100%',
      marginVertical: 10,
    }}
  />
);

const BookmarkScreen = ({navigation}) => {
  const bookmarks = useSelector(state => state?.bookmarkState?.bookmarks);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      <FlatList
        style={styles.bookmarkList}
        data={bookmarks}
        keyExtractor={item => item?.restaurantId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Separator height={10} />}
        ListFooterComponent={() => <Separator height={10} />}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({item}) => (
          <BookmarkCard
            {...item?.restaurant}
            navigate={restaurantId =>
              navigation.navigate('Restaurant', {restaurantId})
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: display.setWidth(75),
    textAlign: 'center',
  },
  bookmarkList: {
    marginHorizontal: 20,
  },
});

export default BookmarkScreen;
