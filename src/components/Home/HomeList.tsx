import React from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { storage } from '../../config/firebase'
import { ref, getDownloadURL } from "firebase/storage";

// const image = { uri: 'https://reactjs.org/logo-og.png' };

function Card({ item }) {

    return (
        <View style={{
            alignSelf: 'flex-start',
            // marginHorizontal: '1%',
            marginBottom: 6,
            minWidth: '48%',
        }}>
            {/* <Text>{item.thumbnail}</Text> */}
            <ImageBackground source={{ uri: item.thumbnail }} resizeMode="cover" imageStyle={styles.imageStyle} style={styles.image}>
            {/* <View style={styles.image}> */}
                <View style={{ marginTop: 77 }}>
                    <Text style={{ fontSize: 10, fontFamily: 'Inter-Regular', color: '#FFFFFF' }}>Kota Bandung</Text>
                    <Text style={{ maxHeight: 48, fontSize: 18, fontFamily: 'Inter-SemiBold', color: '#FFFFFF' }}>{item.nama_cafe}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: '#FFFFFF' }}>3.5</Text>
                        <Icon
                            color='#FAB005'
                            name="star"
                            size={12}
                        />
                    </View>
                </View>
                <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'Inter-Regular' }}>ESTIMATION</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Inter-SemiBold', alignSelf: 'flex-end' }}>Rp50K</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'Inter-Regular', alignSelf: 'flex-end' }}>/ORG</Text>
                    </View>
                </View>
            {/* </View> */}
            </ImageBackground>
        </View>

    )
}

export function HomeList({ data }) {

    return (
        <ScrollView>
            {/* <Image source={{ uri: getImage() }} /> */}
            <View style={styles.container}>
                {data.map(item => (
                    <Card key={item.id} item={item.data} />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
        // padding: 9
        // height: 100
    },
    imageStyle: {
        borderRadius: 16,
        height: 200,
        width: 154,
    },
    image: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        borderRadius: 16,
        width: 154,
        paddingHorizontal: 9
        // height: 100
    },
    text: {
        color: 'white',
        // fontSize: 42,
        // textAlign: 'center',
    },
});
