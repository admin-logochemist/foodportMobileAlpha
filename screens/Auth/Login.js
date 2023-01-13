import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Background from '../../components/Authentication/Background';
import Field from '../../components/Authentication/Field';
import Button from '../../components/Authentication/Button';
import { app, db } from '../../firebase.js';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/compat/app';
import { login, logout } from '../../redux/reducers/UserSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Login({ props, navigation }) {


  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userdata, setUserdata] = useState('');

  const auth = firebase.auth();
  const ForStorage =  () => {
    if(userdata.length > 1)
    try {
   AsyncStorage.multiSet([['email', JSON.stringify(email)], ['userType', JSON.stringify(userdata?.select)]])
  } catch (e) {
    console.log('Failed to store data in AsyncStorage.');
}
    navigation.navigate("BtabNav")

  }

  // =================working here====================
  let tempdata;
  const savingEmail = () => {
    let firebaseCollection = firebase.firestore().collection("userid").where("email", "==", email.toLowerCase())
    firebaseCollection.onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        tempdata = doc.data()
      })
      setUserdata(tempdata);

      if(userdata.length > 1){
      ForStorage();
      }
      else{
        setUserdata(tempdata);
        console.log(userdata , "my data is empty")
      }
    
    })

  }

  // =================working here====================


  const logintoApp = () => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data, 'User logged in successfully');
        console.log(email, 'User logged in successfully');
        dispatch(login({
          email: data.email,
          uid: data.uid,
          displayName: data.displayName,
        }))
        savingEmail();
      })
      .catch((error) => {
        setError(error.message);
        alert(error.message);
      });
  }

  return (
    <KeyboardAvoidingView>
      <Background>
        <View style={{ alignItems: 'center', width: 400 }}>
          <Text style={{
            color: 'white',
            fontSize: 64,
            fontWeight: "bold",
            marginTop: 50,
            marginBottom: 20
          }}>Login</Text>

          <View style={{
            backgroundColor: "white",
            height: 700,
            width: 400,
            borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 40,
              color: 'red',
              fontWeight: "bold",
            }}>
              Welcome Back</Text>

            <Text style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}>
              Login to your account</Text>

            <Text style={{
              color: "black",
              fontSize: 17,
              fontWeight: "bold",
            }}>
              Email / Username </Text>
            <Field value={email} onChangeText={text => setEmail(text)} palceholder="Email / Username" keyboardType={"email-address"} />

            <Text style={{
              color: "black",
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
                fontWeight: "bold",
                fontSize: 16,
              }}>
                Forgot Your Password?
              </Text>
            </View>
            <Button textColor="white" bgColor="red" btnLabel="Login"
              Press={() => logintoApp()} />
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>

              <Text style={{ fontWeight: "bold", fontSize: 17 }}>Dont't have an account ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={{ color: "red", fontWeight: "bold", fontSize: 17 }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </KeyboardAvoidingView>

  )
}