import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import BtabNav from "./BtabNav";
import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import Auth from './screens/Auth/Auth.js';
import AddFoodTruck from './screens/FoodTruck/AddFoodtruck.js';
import FoodtruckDetail from './screens/FoodTruck/FoodtruckDetail.js';
import AddFoodItems from './screens/FoodTruck/AddFoodItems.js';
import Editaccounts from './screens/Editaccounts.js';
import StripeCard from './screens/StripeCard.js';
import Trucklocation from './screens/FoodTruck/Trucklocation.js';
import Map from './screens/Map/Map';
import AdvertImageUpload from './screens/Advertize/AdvertImageUpload.js';
import Myaddslist from './screens/Advertize/Myaddslist.js';
import Advertpay from './screens/Advertize/Advertpay.js';



const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

 

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BtabNav" screenOptions={screenOptions}>
        <Stack.Screen name="Auth" component={Auth} />
         <Stack.Screen name="Loginz" component={Login} />
         <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BtabNav" component={BtabNav} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="AddFoodTruck" component={AddFoodTruck} />
          <Stack.Screen name="FoodtruckDetail" component={FoodtruckDetail} />
          <Stack.Screen name="AddFoodItems" component={AddFoodItems} />
          <Stack.Screen name="Editaccounts" component={Editaccounts} />
          <Stack.Screen name="StripeCard" component={StripeCard} />
          <Stack.Screen name="Trucklocation" component={Trucklocation} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="AdvertImageUpload" component={AdvertImageUpload} />
          <Stack.Screen name="Myaddslist" component={Myaddslist} />
          <Stack.Screen name="Advertpay" component={Advertpay} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}