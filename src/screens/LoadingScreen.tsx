import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

function LoadingScreen({ route, navigation }) {
    const nextScreen = route?.params?.nextScreen

    useEffect(() => {
        if (!!nextScreen) {
            setTimeout(() => {
                navigation.navigate(nextScreen)
            }, 1500)
        }
    })

    return (
        <View style={[styles.container, styles.horizontal]}>
            <Lottie source={require('@assets/animation/9844-loading-40-paperplane.json')} autoPlay loop />
            <Text style={styles.title}>Loading.{nextScreen === 'Map' ? ' Opening Google Maps.' : ''}..</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    title: {
        color: 'rgba(0, 67, 89, 0.75)',
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        marginTop: 480
    },
});

export default LoadingScreen;