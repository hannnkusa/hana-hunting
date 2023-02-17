import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, ScrollView, Linking, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { db } from '../config/firebase'
import { doc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { nFormatter } from '../utils/format'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient'

export const SCREEN_WIDTH = Dimensions.get('screen').width
export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const SLIDER_WIDTH = SCREEN_WIDTH + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export default function CafeDetailScreen({ route, navigation }) {
    const [cafe, setCafe] = useState({});
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const { itemId } = route.params

    async function loadData() {
        setLoading(true)
        const docRef = doc(db, "cafes", itemId);
        const querySnapshot = await getDoc(docRef);
        setCafe(querySnapshot.data());
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, []);

    const isCarousel = React.useRef(null)

    function CarouselCardItem({ item, index }) {
        return (
            <View style={styles.carouselItemContainer} key={index}>
                <Image
                    source={{ uri: item }}
                    style={styles.image}
                />
            </View>
        )
    }

    if (!loading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={{ paddingHorizontal: 16, flex: 1 }}>
                        <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                            <Carousel
                                layout="default"
                                layoutCardOffset={1}
                                ref={isCarousel}
                                data={cafe?.galeri}
                                renderItem={CarouselCardItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={SCREEN_WIDTH}
                                itemHeight={366}
                                onSnapToItem={(index) => setIndex(index)}
                                useScrollView={true}
                                loop={true}
                                autoplay={true}
                                autoplayInterval={5000}
                                loopClonesPerSide={2}
                                enableSnap={false}
                            />
                            <Pagination
                                dotsLength={cafe.galeri && cafe.galeri.length}
                                activeDotIndex={index}
                                carouselRef={isCarousel}
                                dotStyle={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                    marginHorizontal: 0,
                                    backgroundColor: '#004359'
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                tappableDots={true}
                                containerStyle={{
                                    paddingVertical: 15
                                }}
                            />
                            {/* <Text>{cafe.galeri[0]}</Text> */}
                        </View>
                        {/* <Image source={{ uri: cafe.galeri[0] }} style={{height: 200}}></Image> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                {/* <Text>{cafe.galeri}</Text> */}
                                <Text style={styles.title1}>CAFE</Text>
                                <Text style={styles.namaCafe}>{cafe.nama_cafe}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.title1}>ESTIMATION</Text>
                                {cafe.estimasi && <Text style={styles.estimasi}>Rp{nFormatter(cafe.estimasi.dari)} - {nFormatter(cafe.estimasi.sampai)}/org</Text>}
                            </View>
                        </View>
                        <View style={{ marginTop: 17 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    name='clock'
                                    size={15}
                                    color='#004359'
                                    style={{ marginRight: 7 }}
                                />
                                {<Text style={styles.text4}>{cafe?.hari_buka?.dari} - {cafe?.hari_buka?.sampai} • {cafe?.jam_buka?.dari} - {cafe?.jam_buka?.sampai}</Text>}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    name='phone-alt'
                                    size={15}
                                    color='#004359'
                                    style={{ marginRight: 7 }}
                                />
                                <Text style={styles.text4}>{cafe.telepon}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 41 }}>
                            <Text style={styles.updated}>UPDATED  02-01-22</Text>
                        </View>
                        <View style={{ marginTop: 7 }}>
                            <Text style={styles.desc}>{cafe.tentang}</Text>
                        </View>
                        <View style={{ marginTop: 41 }}>
                            <Text style={styles.subtitle}>Facility</Text>
                            <Text style={styles.desc}>{cafe.fasilitas}</Text>
                        </View>
                        <View style={{ marginTop: 41 }}>
                            <Text style={styles.subtitle}>Location</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='map-marker-alt'
                                    size={15}
                                    color='#004359'
                                    style={{ marginTop: 20 }}
                                />
                                <Text style={{ ...styles.desc, marginLeft: 5 }}>{cafe.alamat}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, zIndex: 5, height: 200, width: SCREEN_WIDTH - 32, marginTop: 22 }}>
                            <MapView
                                pointerEvents="none"
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: cafe?.geolocation?.latitude || -6.91924168059367,
                                    longitude: cafe?.geolocation?.longitude || 107.61933912435552,
                                    latitudeDelta: 0.0005,
                                    longitudeDelta: 0.0005,
                                }}
                            >
                                <Marker
                                    // draggable={ }
                                    coordinate={{
                                        latitude: cafe?.geolocation?.latitude || -6.91924168059367,
                                        longitude: cafe?.geolocation?.longitude || 107.61933912435552
                                    }}
                                // onDragEnd={handleDragMarker}
                                />
                            </MapView>
                        </View>
                        <View style={{ marginBottom: 21, marginTop: 22, alignItems: 'center' }}>
                            <Button
                                title="Direction"
                                onPress={() => { Linking.openURL(cafe.maps) }}
                                buttonStyle={{ borderRadius: 16, backgroundColor: '#004359', height: 40, width: 138 }}
                                titleStyle={{ marginLeft: 10 }}
                                icon={
                                    <Icon
                                        name="paper-plane"
                                        size={14}
                                        color="#FFF"
                                    />
                                }
                            />
                        </View>
                    </View>
                    <View style={{ position: 'absolute', zIndex: 6 }}>
                        <Button
                            type="outline"
                            buttonStyle={styles.button}
                            // containerStyle={{ height: 40, width: 40 }}
                            onPress={() => navigation.goBack()}
                            icon={
                                <Icon
                                    name="arrow-left"
                                    size={14}
                                    color="#004359"
                                />
                            }
                        />
                    </View>
                    <View style={{ position: 'absolute', width: '100%' }}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['rgba(33, 37, 41, 0.3)', '#212529']}
                            locations={[0.6, 1]}
                            style={{
                                width: '100%',
                                height: 366,
                                paddingLeft: 16,
                                paddingTop: 297,
                                paddingBottom: 10
                            }}
                        >
                            <Text style={{ fontSize: 15, fontFamily: 'Inter-Bold', color: '#FFFFFF' }}>Rating</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 30, fontFamily: 'Inter-Bold', color: '#FFFFFF' }}>{cafe.rating}</Text>
                                <Icon
                                    color='#FAB005'
                                    name="star"
                                    size={24}
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 6
                                    }}
                                    solid
                                />
                            </View>
                        </LinearGradient>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        return (
            <View style={{ height: '100%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#004359" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // minHeight: SCREEN_HEIGHT,
        flexGrow: 1,
        width: '100%',
    },
    carouselItemContainer: {
        width: SCREEN_WIDTH,
        height: 366,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title1: {
        color: 'rgba(0, 67, 89, 0.75)',
        fontFamily: 'Inter-Regular',
        fontSize: 16,
    },
    namaCafe: {
        color: '#001F29',
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        maxWidth: '70%'
    },
    estimasi: {
        color: '#DB3A34',
        fontFamily: 'Inter-ExtraBold',
        fontSize: 20,
        // maxWidth: '60%'
    },
    text4: {
        color: '#004359',
        fontFamily: 'Inter-Regular',
        fontSize: 14
    },
    updated: {
        color: 'rgba(219, 58, 52, 0.5)',
        fontFamily: 'Inter-Regular',
        fontSize: 14
    },
    desc: {
        color: 'rgba(0, 67, 89, 0.75)',
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        marginTop: 14
    },
    subtitle: {
        color: '#001F29',
        fontFamily: 'Inter-Bold',
        fontSize: 20
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
    mapView: {
        // flex: 1,
        // justifyContent: "center",
        // zIndex: 100,
        height: 132,
        width: 327
    },
});
