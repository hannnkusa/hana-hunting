import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CustomButton } from '../components';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Personal Info</Text>
                <CustomButton title='Profile' iconLeftName='user-alt' onPress={() => navigation.navigate('Profile')} />
                <CustomButton title='Change Password' iconLeftName='lock' onPress={() => navigation.navigate('Change Password')} />
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>App Info</Text>
                <TouchableOpacity style={styles.button}>
                    <View style={{ width: 24, marginRight: 12 }}>
                        <Icon
                            // style={styles.icon}
                            color='#004359'
                            name='info-circle'
                            size={20}
                        />
                    </View>
                    <Text style={{ flex: 1, color: 'rgba(0, 67, 89, 0.5)', fontSize: 16, fontFamily: 'Inter-Regular' }}>App Version</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ flex: 1, color: 'rgba(0, 67, 89, 0.5)', fontSize: 16, fontFamily: 'Inter-Regular' }}>0.1</Text>
                    </View>
                </TouchableOpacity>
                <CustomButton title='Privacy Policy' iconLeftName='user-shield' />
                <CustomButton title='Help Center' iconLeftName='headset' />
            </View>
            <View style={{...styles.section, marginTop: 150}}>
                <CustomButton title='Sign Out' iconLeftName='sign-out-alt' onPress={() => signOut(auth)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 20,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%'
    },

    title: {
        color: '#717E95',
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        marginBottom: 8
    },

    section: {
        marginTop: 36,
        width: '100%'
    },

    button: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 67, 89, 0.05)',
        height: 56,
        padding: 16,
        width: '100%'
    },

});
