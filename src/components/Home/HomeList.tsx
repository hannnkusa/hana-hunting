import React from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { nFormatter } from '../../utils/format'

// const image = { uri: 'https://reactjs.org/logo-og.png' };

function Card({ item, navigation, id }) {

    return (
        <TouchableOpacity
            style={{
                alignSelf: 'flex-start',
                // marginHorizontal: '1%',
                minWidth: '48%',
                width: 154,
                height: 200,
                marginBottom: 16
                // marginTop: 12
            }}
            onPress={() => navigation.navigate('Cafe Detail', { itemId: id })}
        >
            {/* <Text>{item.thumbnail}</Text> */}
            <ImageBackground source={{ uri: item.thumbnail }} resizeMode="cover" imageStyle={styles.imageStyle} style={styles.image}>
                <View style={{ backgroundColor: 'rgba(0,0,0, 0.30)', width: 154, height: 200, borderRadius: 16, left: -4, paddingHorizontal: 9 }}>
                    <View style={{ top: 40, height: '100%' }}>
                        <Text style={{ fontSize: 10, fontFamily: 'Inter-Regular', color: '#FFFFFF' }}>Kota Bandung</Text>
                        <Text style={{ maxHeight: 48, fontSize: 18, fontFamily: 'Inter-SemiBold', color: '#FFFFFF' }}>{item.nama_cafe}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: '#FFFFFF' }}>{item.rating}</Text>
                            <Icon
                                color='#FAB005'
                                name="star"
                                size={12}
                            />
                        </View>
                    </View>
                    <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', bottom: 10, position: 'absolute', right: 9, height: '100%' }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 10, fontFamily: 'Inter-Regular' }}>ESTIMATION</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Inter-SemiBold', alignSelf: 'flex-end' }}>Rp{item.estimasi && nFormatter(item.estimasi.dari)}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'Inter-Regular', alignSelf: 'flex-end' }}>/ORG</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>

    )
}

export function HomeList({ data, navigation, isLoading }) {
    if (!isLoading) {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* <Image source={{ uri: getImage() }} /> */}
                <View style={styles.container}>
                    {data.map((item, idx) => (
                        <Card key={idx} id={item.id} item={item} navigation={navigation} />
                    ))}
                </View>
            </ScrollView>
        )
    } else {
        return (
            <View style={{ height: 200, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#004359" />
            </View>
        )
    }
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
        justifyContent: 'center',
        borderRadius: 16,
        width: 154,
        paddingHorizontal: 4,
        height: 200,
    },
    text: {
        color: 'white',
        // fontSize: 42,
        // textAlign: 'center',
    },
});
