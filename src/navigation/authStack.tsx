import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import SignOutScreen from '../screens/SignUpScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Sign In" component={SignInScreen} />
                <Stack.Screen name="Sign Up" component={SignOutScreen} />
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