import React from 'react';
import { Button } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { navigationRef } from "@navigation";

import HomeScreen from '@screens/Home';
import SettingsScreen from '@screens/SettingsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import ChangePasswordScreen from '@screens/ChangePasswordScreen';
import CafeDetailScreen from '@screens/CafeDetailScreen';
import MapScreen from '@screens/MapScreen';
import LoadingScreen from '@screens/LoadingScreen';

const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    options={{
                        headerShadowVisible: false,
                        headerLeft: (props) => (
                            <Button
                                type="clear"
                                buttonStyle={styles.button}
                                // containerStyle={{ height: 40, width: 40 }}
                                onPress={() => {
                                    if (navigationRef.isReady()) navigationRef.dispatch(StackActions.pop(1))
                                }}
                                // onPress={() => console.log('kehed')}
                                icon={
                                    <Icon
                                        name="arrow-left"
                                        size={14}
                                        color="#004359"
                                    />
                                }
                            />
                        )
                    }}
                    name="Settings"
                    component={SettingsScreen}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Cafe Detail"
                    component={CafeDetailScreen}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Map"
                    component={MapScreen}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Loading Screen"
                    component={LoadingScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: '#F1F4F7',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        width: 40,
        marginLeft: 16
    },
})