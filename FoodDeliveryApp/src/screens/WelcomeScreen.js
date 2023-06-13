import React, {useState, useRef} from "react";
import { View, StyleSheet, Text, StatusBar, FlatList, TouchableOpacity} from "react-native";
import { colors, general, fonts} from "../constants";
import { WelcomeCard, Separator} from "../components";
import { display } from "../utils";

const pageStyle = isActive =>
    isActive
    ? {...styles.page, width: 20}
    : {...styles.page, backgroundColor: colors.DEFAULT_GREY}

const Pagination = ({index}) => {
    return (
        <View style={styles.pageContainer}>
            {[...Array(general.WELCOME_CONTENTS.length).keys()]
            .map((_, i) => 
                i === index ? (
                    <View style={pageStyle(true)} key={i} />
                ) : (
                    <View style={pageStyle(false)} key={i} />
                ),
            )} 
        </View>
    )
}

const WelcomeScreen = ({navigation}) => {
    const [welcomeListIndex, setWelcomeListIndex] = useState(0);
    const welcomeList = useRef()
    const onViewRef = useRef(({changed}) => {
        setWelcomeListIndex(changed[0].index);
    });

    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

    const pageScroll = () => {
        welcomeList.current.scrollToIndex({
            index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
        });
    };
    
    return (
        <View style= {styles.container}>
            <StatusBar 
                barStyle="dark-content"
                backgroundColor={colors.DEFAULT_WHITE}
                translucent
            />  
            <Separator height={StatusBar.currentHeight}/>
            <Separator height={display.setHeight(8)}/>
            <View style={styles.welcomeListContainer}>
                <FlatList 
                    ref={welcomeList}
                    data={general.WELCOME_CONTENTS}
                    keyExtractor={item => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    overScrollMode='never'
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    renderItem={({item}) => <WelcomeCard {...item} />}
                />
            </View>
            <Separator height={display.setHeight(8)} />
            <Pagination index={welcomeListIndex}/>
            <Separator height={display.setHeight(8)} />
            {welcomeListIndex === 2 ? (
                <TouchableOpacity 
                    style={styles.gettingStartedButton}
                    activeOpacity={.8}
                    onPress={() => navigation.navigate("Signin")}
                >
                    <Text style={styles.gettingStartedButtonText}>Get started</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        activeOpacity={.8}
                        style={{marginLeft: 10}}
                        onPress={() => welcomeList.current.scrollToEnd()}
                    >
                        <Text style={styles.buttonText}>SKIP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => pageScroll()}
                    >
                        <Text 
                            style={styles.buttonText} 
                            activeOpacity={.8}>NEXT
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.DEFAULT_WHITE,
    },
    welcomeListContainer: {
        height: display.setHeight(60),

    },
    pageContainer: {
        flexDirection: 'row',
    },
    page: {
        height: 8,
        width: 8,
        backgroundColor: colors.SECONDARY_RED,
        borderRadius: 32,
        marginHorizontal: 5, 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: display.setWidth(90),    
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: fonts.POPPINS_BOLD,
        lineHeight: 16 * 1.4,
    },
    button: {
        backgroundColor: colors.LIGHT_RED,
        paddingVertical: 20,
        paddingHorizontal: 11,
        borderRadius: 32,
    },
    gettingStartedButton: {
        backgroundColor: colors.SECONDARY_RED,
        paddingVertical: 15,
        paddingHorizontal: 110,
        borderRadius: 12,
        justifyContent: 'center',   
        alignItems: 'center',
        elevation: 2,
    },
    gettingStartedButtonText: {
        fontSize: 20,
        color: colors.DEFAULT_WHITE,
        lineHeight: 20 * 1.4, 
        fontFamily: fonts.POPPINS_MEDIUM,
    }
});

export default WelcomeScreen;
