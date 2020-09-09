import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import Home from './pages/Home';
import Traceability from './pages/Traceability';
import Locality from './pages/Locality';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" 
            screenOptions={{cardStyle: { backgroundColor: '#f0f0f5'}
            }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Traceability" component={Traceability} />
                <AppStack.Screen name="Locality" component={Locality} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;