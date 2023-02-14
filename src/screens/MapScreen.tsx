import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PlaceList, HomeChip } from '@components';
import { db } from '../config/firebase'
import { collection, getDocs } from "firebase/firestore";
import { Dropdown } from 'react-native-element-dropdown';

const Map = ({ navigation }) => {
    const [cafes, setCafes] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const selectable = ['Ambience', 'Value of Money', 'Service', 'Taste']
    const data = [
        { label: 'Dago', value: 'dago' },
        { label: 'Riau', value: 'riau' },
    ];

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#004359' }]}>
                    Location
                </Text>
            );
        }
        return null;
    };

    const renderItem = (item: any) => {
        if (item) {
            return (
                <View style={styles.item}>
                    <Text style={styles.textItem}>{item.label}</Text>
                    {item.value === value && (
                        <Icon
                            color='#004359'
                            name="map-marker-alt"
                            size={20}
                        />
                    )}
                </View>
            );
        }
    };

    async function loadData() {
        const cafes = []
        // setIsLoading(true)
        const querySnapshot = await getDocs(collection(db, "cafes"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            cafes.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        setCafes(cafes);
        // setIsLoading(false)
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapView}>
                <MapView
                    style={{ flex: 1, borderRadius: 18 }}
                    initialRegion={{
                        latitude: -6.91924168059367,
                        longitude: 107.61933912435552,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {cafes.map((cafe) => (
                        <Marker
                            coordinate={{ latitude: cafe?.geolocation?.latitude, longitude: cafe?.geolocation?.longitude }}
                        />
                    ))
                    }
                </MapView>
            </View>
            <View style={styles.headerContainer}>
                <View style={styles.containerDropdown}>
                    {renderLabel()}
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: '#F1F4F7' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Location' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Icon
                                color='#004359'
                                name="map-marker-alt"
                                size={20}
                            />
                        )}
                        renderRightIcon={() => (
                            <Icon
                                color={'#004359'}
                                name="caret-down"
                                size={20}
                            />
                        )}
                        renderItem={renderItem}
                    // containerStyle={{ paddingHorizontal: 20 }}
                    />
                </View>
                <HomeChip selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectable={selectable} isWhiteBG />
            </View>
            <View style={{ position: 'absolute' }}>
                <Button
                    type="outline"
                    buttonStyle={styles.button}
                    // containerStyle={{ height: 40, width: 40 }}
                    onPress={() => navigation.navigate('Home')}
                    icon={
                        <Icon
                            name="arrow-left"
                            size={14}
                            color="#004359"
                        />
                    }
                />
            </View>
            <View style={{ position: 'absolute', bottom: 40 }}>
                <PlaceList places={cafes} navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center"
    },
    headerContainer: {
        // padding: 16,
        // backgroundColor: 'white',
        position: 'absolute',
        // left: 50,
        height: '100%',
        width: '100%',
        top: 36
    },
    mapView: {
        // flex: 1,
        justifyContent: "center",
        height: "100%",
        width: "100%"
    },
    placeList: {
        position: 'absolute',
        // flex: 1,
        // justifyContent: "center"
    },
    button: {
        borderWidth: 1,
        borderColor: '#F1F4F7',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        width: 40,
        marginLeft: 16,
        marginTop: 36
    },

    containerDropdown: {
        // marginTop: 20,
        // backgroundColor: 'white',
        // paddingTop: 10,
        left: 74,
        marginBottom: 12
        // flex: 1
    },
    dropdown: {
        width: 212,
        height: 40,
        borderColor: '#F1F4F7',
        borderWidth: 1,
        borderRadius: 16,
        padding: 8,
        backgroundColor: 'white'
    },
    label: {
        position: 'absolute',
        // backgroundColor: 'white',
        left: 16,
        bottom: 30,
        zIndex: 999,
        // paddingHorizontal: 8,
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#004359'
    },
    placeholderStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#004359',
        marginLeft: 10
    },
    selectedTextStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#004359',
        marginLeft: 10
    },
    iconStyle: {
        width: 40,
        height: 40,
    },
    inputSearchStyle: {
        height: 40,
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#004359',
        // top: -20
    },
    item: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
})

export default Map;