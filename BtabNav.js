import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Accounts from './screens/Accounts';
import FoodTruck from './screens/FoodTruck/Foodtruck';
import Orders from './screens/Orders';
// import Cart from './screens/Orders';
import FavoriteScreen from './screens/FavoriteScreen';
import Cart from './screens/Cart';
import Auth from './screens/Auth/Auth';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";




const Tab = createBottomTabNavigator();

export default function BtabNav() {

    const { items, restaurantName } = useSelector(
        (state) => state.cartReducer.selectedItems
      );
    //   console.log(items.length ,"Alpha Items for cart")
  
    return (

   <Tab.Navigator screenOptions={{
    tabBarStyle:{
        backgroundColor: 'black',

    },
    tabBarInactiveTintColor: 'white',
    tabBarActiveTintColor: 'red',
   }}>
   <Tab.Screen name="Home" component={Home} options={{
    headerShown:false,
    tabBarIcon: ({color='red' , size}) => (
        <FontAwesome5 name="home" color={color} size={size} />
    )
   }} />
   <Tab.Screen name="Accounts" component={Accounts} options={{
    headerShown:false,
    tabBarIcon: ({color , size}) => (
        <FontAwesome5 name="user" color={color} size={size} />
    )
   }}/>
   <Tab.Screen name="FoodTruck" component={FoodTruck} options={{
    headerShown:false,
    tabBarIcon: ({color , size}) => (
        <FontAwesome5 name="truck" color={color} size={size} />
    )
   }}/>
   <Tab.Screen name="Orders" component={Orders} options={{
    headerShown:false,
    tabBarIcon: ({color , size}) => (
        <FontAwesome5 name="receipt" color={color} size={size} />
    )
   }}/>
   <Tab.Screen name="Cart" component={Cart} options={{
    tabBarBadge:items.length,
    tabBarBadgeStyle: {
        backgroundColor:'yellow'
    },
    tabBarIcon: ({color , size}) => (
        <FontAwesome5 name="shopping-bag" color={color} size={size} />
    )
   }}/>
   <Tab.Screen name="Favorite" component={FavoriteScreen} options={{
    tabBarIcon: ({color , size}) => (
        <FontAwesome5 name="heart" color={color} size={size} />
    )
   }}/>

   <Tab.Screen name="Login" component={Auth} options={{
    headerShown:false,
    tabBarIcon: ({color , size}) => (
        <FontAwesome5 name="sign" color={color} size={size} />
    )
   }}/>
   
   </Tab.Navigator>
  )
}