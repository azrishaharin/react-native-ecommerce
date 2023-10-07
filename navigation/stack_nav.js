import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/login_screen'
import RegisterScreen from '../screens/register_screen'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPasswordScreen from '../screens/forgot_password'
import HomeScreen from '../screens/home_screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/profile_screen';
import CartScreen from '../screens/cart_screen';
import ProductsScreen from '../screens/products_screen'


const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{headerShown: false, tabBarLabel: 'Home', tabBarLabelStyle: {color: '#008E97'}, 
                tabBarIcon: ({focused}) => focused? <Entypo name="home" size={24} color="#008E97" /> : <AntDesign name="home" size={24} color="black"/>}}/>
                <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{headerShown: false, tabBarLabel: 'Profile', tabBarLabelStyle: {color: '#008E97'}, 
                tabBarIcon: ({focused}) => focused? <Ionicons name="person" size={24} color="#008E97" /> : <Ionicons name="person-outline" size={24} color="black"/>}}/>
                <Tab.Screen 
                name="Cart" 
                component={CartScreen} 
                options={{headerShown: false, tabBarLabel: 'Cart', tabBarLabelStyle: {color: '#008E97'}, 
                tabBarIcon: ({focused}) => focused? <AntDesign name="shoppingcart" size={24} color="#008E97" /> : <AntDesign name="shoppingcart" size={24} color="black"/>}}/>
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown: false}}/>
                <Stack.Screen name="Products" component={ProductsScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})