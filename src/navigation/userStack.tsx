import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@screens/Home';
import SettingsScreen from '@screens/SettingsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import CafeDetailScreen from '@screens/CafeDetailScreen';
import MapScreen from '@screens/MapScreen';
import LoadingScreen from '@screens/LoadingScreen';

const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
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
