import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button, Overlay } from 'react-native-elements';

export function ComingSoonModal({ visible, toggleOverlay }) {

    return (
        <View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ borderRadius: 16, padding: 24 }}>
                {/* <WelcomeImg style={{ alignSelf: 'center' }} /> */}
                <Image source={require('../../../assets/404.png')} style={{ height: 152.55, width: 192.95, alignSelf: 'center' }} />
                <Text style={{ marginTop: 30, marginBottom: 16, color: '#004359', fontFamily: 'Inter-Bold', fontSize: 19, textAlign: 'center' }}>Coming Soon!</Text>
                <Text style={{ marginBottom: 32, color: '#004359', fontFamily: 'Inter-Regular', fontSize: 16, textAlign: 'center' }}>We are currently undergoing maintenance and should be back up soon</Text>
                <Button title='Okay' buttonStyle={styles.button} titleStyle={{ textAlign: 'center' }} onPress={() => toggleOverlay()} />
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({

    button: {
        fontFamily: 'Inter-Regular',
        backgroundColor: '#004359',
        height: 42,
        // width: '100%',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 22,
        // marginTop: 100,
        marginHorizontal: 16,
        borderRadius: 16
        // flex: 1
        // justifyContent: 'flex-end'
    },
});