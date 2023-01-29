import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Button, Overlay } from 'react-native-elements';
import WelcomeImg from '../../../assets/feeling-sorry_cuate.svg'

export function FailedModal({ visible, toggleOverlay }) {

    return (
        <View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ borderRadius: 16, padding: 24 }}>
                <WelcomeImg style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: 30, marginBottom: 16, color: '#DB3A34', fontFamily: 'Inter-Bold', fontSize: 19, textAlign: 'center' }}>Sign In Failed!</Text>
                <Text style={{ marginBottom: 32, color: '#DB3A34', fontFamily: 'Inter-Regular', fontSize: 16, textAlign: 'center' }}>Your username or your password did not match</Text>
                <Button title='Try Again' buttonStyle={styles.button} onPress={() => toggleOverlay()} />
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