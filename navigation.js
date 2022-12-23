import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import Account from "./screens/Account";
import BtabNav from "./BtabNav";
import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import Auth from './screens/Auth/Auth.js';


const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };


  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth" screenOptions={screenOptions}>
        <Stack.Screen name="Auth" component={Auth} />
         <Stack.Screen name="Loginz" component={Login} />
         <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BtabNav" component={BtabNav} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}