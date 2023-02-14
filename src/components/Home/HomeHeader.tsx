import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';

const data = [
    { label: 'Dago', value: 'dago' },
    { label: 'Riau', value: 'riau' },
];

export function HomeHeader({navigation}) {
    const { user } = useAuthentication();
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const redirectScreen = (name) => {
        navigation.navigate('Loading Screen', { nextScreen: name })
    }

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#004359' }]}>
                    Location
                </Text>
            );
        }
        return null;
    };

    const renderItem = (item: any) => {
        if (item) {
            return (
                <View style={styles.item}>
                    <Text style={styles.textItem}>{item.label}</Text>
                    {item.value === value && (
                        <Icon
                            style={styles.icon}
                            color='#004359'
                            name="map-marker-alt"
                            size={20}
                        />
                    )}
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerDropdown}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#F1F4F7' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Location' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <Icon
                            style={styles.icon}
                            color='#004359'
                            name="map-marker-alt"
                            size={20}
                        />
                    )}
                    renderRightIcon={() => (
                        <Icon
                            style={styles.icon}
                            color={'#004359'}
                            name="caret-down"
                            size={20}
                        />
                    )}
                    renderItem={renderItem}
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 32, width: '100%', justifyContent: 'flex-end' }}>
                <Button
                    type="outline"
                    buttonStyle={styles.button}
                    // containerStyle={{ height: 40, width: 40 }}
                    onPress={() => redirectScreen('Map')}
                    icon={
                        <Icon
                            name="map"
                            size={18}
                            color="#004359"
                        />
                    }
                />
                <Button
                    type="outline"
                    buttonStyle={styles.button}
                    onPress={() => redirectScreen('Settings')}
                    icon={
                        <Icon
                            name="cog"
                            size={18}
                            color="#004359"
                        />
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    containerDropdown: {
        marginTop: 20,
        backgroundColor: 'white',
        paddingTop: 10,
        flex: 1
    },
    dropdown: {
        width: 133,
        height: 40,
        borderColor: '#F1F4F7',
        borderWidth: 1,
        borderRadius: 16,
        padding: 8,
    },
    icon: {
        // marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 16,
        zIndex: 999,
        // paddingHorizontal: 8,
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#004359'
    },
    placeholderStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#004359',
        marginLeft: 10
    },
    selectedTextStyle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#004359',
        marginLeft: 10
    },
    iconStyle: {
        width: 40,
        height: 40,
    },
    inputSearchStyle: {
        height: 40,
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#004359',
        // top: -20
    },
    button: {
        borderWidth: 1,
        borderColor: '#F1F4F7',
        borderRadius: 10,
        height: 40,
        width: 40,
        marginLeft: 8
    },
    item: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
});
