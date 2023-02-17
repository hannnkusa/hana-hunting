import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Button, Overlay } from 'react-native-elements';
import Lottie from 'lottie-react-native';

export function SuccessUpdatedModal({ visible, toggleOverlay, onSubmit }) {

    return (
        <View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ borderRadius: 16, padding: 24, marginHorizontal: 6 }}>
                <Lottie source={require('@assets/animation/85744-success.json')} autoPlay loop style={{ position: 'absolute' }} />
                <Lottie source={require('@assets/animation/91068-message-sent-successfully-plane.json')} autoPlay loop style={{ width: '40%', alignSelf: 'center' }} />
                <View style={{ position: 'relative', marginTop: 10}}>
                    <Text style={{ marginTop: 30, marginBottom: 16, color: '#004359', fontFamily: 'Inter-Bold', fontSize: 19, textAlign: 'center' }}>Success!</Text>
                    <Text style={{ marginBottom: 32, color: '#004359', fontFamily: 'Inter-Regular', fontSize: 16, textAlign: 'center' }}>Your account updated successfully!</Text>
                    <Button title='Okay' buttonStyle={styles.button} titleStyle={{ textAlign: 'center' }} onPress={() => onSubmit()} />
                </View>
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