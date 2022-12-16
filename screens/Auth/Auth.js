import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Background from '../../components/Authentication/Background';
import Button from '../../components/Authentication/Button';

export default function Auth(props) {
  return (
    <Background>
    <View style={{ marginHorizontal: 40, marginVertical:100, }}>

    <Text style={{ color: "white", fontSize: 64, }}>Let's Start</Text>
    <Text style={{ color: "red", fontSize: 64, marginBottom: 40  }}>With Us</Text>

    <Button bgColor="red" textColor="white" btnLabel="Login" Press={() =>
    props.navigation.navigate("Loginz") } />
    <Button bgColor="white" textColor="red" btnLabel="Sign Up" Press={() =>
      props.navigation.navigate("Signup") } />
    </View>
    </Background>
    
  )
}