import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Button, Overlay } from 'react-native-elements';
import WelcomeImg from '../../../assets/welcome_cuate.svg'

export function SuccessModal({ visible, toggleOverlay, onSubmit }) {

    return (
        <View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ borderRadius: 16, padding: 24, marginHorizontal: 6 }}>
                <WelcomeImg style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: 30, marginBottom: 16, color: '#004359', fontFamily: 'Inter-Bold', fontSize: 19, textAlign: 'center' }}>Great!</Text>
                <Text style={{ marginBottom: 32, color: '#004359', fontFamily: 'Inter-Regular', fontSize: 16, textAlign: 'center' }}>Your account has been created successfully!</Text>
                <Button title='Okay' buttonStyle={styles.button} titleStyle={{ textAlign: 'center' }} onPress={() => onSubmit()} />
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