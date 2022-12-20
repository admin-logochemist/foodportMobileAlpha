import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react';
import Background from '../../components/Authentication/Background';
import Field from '../../components/Authentication/Field';
import Button from '../../components/Authentication/Button';
import { app,db  } from '../../firebase.js';
import { useDispatch } from 'react-redux';
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import { login, logout } from '../../redux/reducers/UserSlice';




export default function Login({props, navigation}) {


  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = firebase.auth();


const logintoApp = () => {
  auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
    dispatch(login({
      email: userAuth.user.email,
      uid: userAuth.user.uid,
      displayName: userAuth.user.displayName,
    }))
  })
  navigation.navigate("BtabNav")
  console.log("Alpha is a beast")
}

  return (
    <KeyboardAvoidingView>
    <Background>
    <View style={{ alignItems: 'center', width: 400 }}>
      <Text style={{ 
        color:'white',
         fontSize: 64,
          fontWeight:"bold",
          marginTop:50,
          marginBottom:20
        }}>Login</Text>

        <View style={{ backgroundColor:"white",
         height: 700,
          width: 400,
      borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center' }}>
        <Text style={{ 
          fontSize: 40,
           color: 'red',
            fontWeight: "bold",
           }}>
        Welcome Back</Text>

        <Text style={{ color: "grey",
         fontSize: 19,
          fontWeight: "bold",
         marginBottom: 20, }}>
        Login to your account</Text>
        
        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
       Email / Username </Text>
        <Field value={email} onChangeText={text => setEmail(text)} palceholder="Email / Username" keyboardType={"email-address"} />
        
        <Text style={{ color: "black",
        fontSize: 17,
         fontWeight: "bold",
         }}>
       Password </Text>
        <Field value={password} onChangeText={text => setPassword(text)} palceholder="Password" secureTextEntry={true} />
        <View style={{ 
          alignItems: 'flex-end', 
        width: '78%',
        paddingRight: 16,
        marginBottom: 130,
       }}>
        <Text style={{ 
          color: "red",
         fontWeight:"bold",
         fontSize: 16,
        }}>
        Forgot Your Password?
        </Text>
        </View>
        <Button textColor="white" bgColor= "red" btnLabel="Login" 
        Press={() => logintoApp()} />
        <View style={{ 
          display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
        }}>

        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Dont't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ color:"red", fontWeight: "bold", fontSize: 17 }}>Sign Up</Text>
        </TouchableOpacity>
        </View>
    </View>
    </View>
    </Background>
    </KeyboardAvoidingView>

  )
}