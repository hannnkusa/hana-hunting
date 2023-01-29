import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// const image = { uri: 'https://reactjs.org/logo-og.png' };

export function CustomButton({ title, iconLeftName, onPress }) {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <View style={{ width: 24, marginRight: 12 }}>
                    <Icon
                        // style={styles.icon}
                        color='#004359'
                        name={iconLeftName}
                        size={20}
                    />
                </View>
                <Text style={{ flex: 1, color: 'rgba(0, 67, 89, 0.5)', fontSize: 16, fontFamily: 'Inter-Regular' }}>{title}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Icon
                        // style={styles.icon}
                        color='#004359'
                        name="chevron-right"
                        size={12}
                    />
                </View>
            </TouchableOpacity>
        </View>

    )
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
        fontFamily: 'Inter-Regular'
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
        borderRadius: 10,
        width: '100%'
    },
});
