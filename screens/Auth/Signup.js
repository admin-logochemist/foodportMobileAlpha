import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import Background from '../../components/Authentication/Background';
import Field from '../../components/Authentication/Field';
import Buttonz from '../../components/Authentication/Button';
import Datepick from '../../components/Authentication/Datepick';
import { app, auth } from '../../firebase.js';
import firebase from 'firebase/compat/app';
import { login, logout } from '../../redux/reducers/UserSlice';
import { useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Signup({ props, navigation }) {

  const dispatch = useDispatch();
  const auth = firebase.auth();

  const [city, setCity] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [bname, setBName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  // const [uids, setUids] = useState("");
  // const [hasError, Error] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [select, setSelect] = useState("user");


  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }
  function ValidatePassword(pass) {
    if (/^[A-Za-z]\w{7,14}$/.test(pass)) {
      return (true)
    }
    alert("Password must contain 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter")
    return (false)
  }

  const getFormData = () => {
    if (
      city !== ''
      && email !== ''
      && password !== ''
      && firstName !== ''
      && lastName !== ''
      && phone !== ''
      && address !== ''
      && state !== ''
      && day !== ''
      && zipcode !== ''
      && question !== ''
      && answer !== ''
      && select !== ''
    ) {
      return true;
    }
    else {
      console.log(select)
      return false;
    }
  }


  const register = () => {

    if (ValidateEmail(email) && ValidatePassword(password) && getFormData()) {

      auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
        userAuth.user.updateProfile({
          displayName: name,
          usertype: select
        }).then(async () => {
          dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            usertype: select,
          }))
          try {
            await AsyncStorage.multiSet([['email', JSON.stringify(email)], ['Alpha', 'MyUser']])
          } catch (error) {
            console.log(error);
          }
        })

      })

      firebase.firestore().collection("userid").add(
        {
          city: city,
          email: email,
          password: password,
          name: firstName + lastName,
          phone: phone,
          select: select,
          // bname: bname,
          object: "bank_account",
          country: "US",
          currency: "usd",
          routing_number: "110000000",
          account_number: "000123456789",
          address: address,
          zipcode: zipcode,
          state: state,
          question: question,
          answer: answer,
          day: day,
          month: month,
          year: year,
        }
      )
      navigation.navigate("BtabNav")
    } else {
      console.log("not valid data")
    }
  }


  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }


  return (
    <Background>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', width: 400 }}>
          <Text style={{
            color: 'white',
            fontSize: 64,
            fontWeight: "bold",
            marginTop: 50,
            marginBottom: 20
          }}>Sign Up</Text>


          <View style={{
            backgroundColor: "white",
            height: 700,
            width: 400,
            borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center'
          }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center', width: 400 }}>
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
                  First Name </Text>
                <Field value={firstName} onChangeText={text => setFirstName(text)} palceholder="Last Name" />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Last Name </Text>
                <Field value={lastName} onChangeText={text => setLastName(text)} palceholder="Last Name" />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Email </Text>
                <Field value={email} onChangeText={text => setEmail(text)} palceholder="Email" keyboardType={"email-address"} />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Phone </Text>
                <Field value={phone} onChangeText={text => setPhone(text)} palceholder="Phone" keyboardType={"numeric"} />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Password </Text>
                <Field value={password} onChangeText={text => setPassword(text)} palceholder="Password" secureTextEntry={true} />


                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Address </Text>
                <Field value={address} onChangeText={text => setAddress(text)} palceholder="Address" />


                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  City </Text>
                <Field value={city} onChangeText={text => setCity(text)} palceholder="City" />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  State </Text>
                <Field value={state} onChangeText={text => setState(text)} palceholder="State" />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Zip Code </Text>
                <Field value={zipcode} onChangeText={text => setZipcode(text)} palceholder="Email / Username" keyboardType={"numeric"} />


                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Questions </Text>
                <View>
                  <RNPickerSelect
                    onValueChange={(value) => setQuestion(value)}
                    style={pickerSelectStyles}
                    items={[
                      { label: 'What is your pet Name?', value: 'What is your pet Name?' },
                      { label: 'What is your age?', value: 'What is your age?' },
                      { label: 'What is your school Name', value: 'What is your school Name' },
                    ]}
                  />
                </View>
                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Answer </Text>
                <Field value={answer} onChangeText={text => setAnswer(text)} palceholder="Answer" keyboardType={"text"} />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Choose Admin / User</Text>
                <View>
                  <RNPickerSelect
                    onValueChange={(value) => setSelect(value)}
                    style={pickerSelectStyles}
                    items={[
                      { label: 'user', value: 'user' },
                      { label: 'business', value: 'business' },
                    ]}
                  />
                </View>
                <Text style={{
                  color: "black",
                  fontSize: 27,
                  fontWeight: "bold",
                }}>
                  Date of Birth </Text>

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Year </Text>
                <Field value={year} onChangeText={text => setYear(text)} palceholder="Answer" keyboardType={"numeric"} />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Month </Text>
                <Field value={month} onChangeText={text => setMonth(text)} palceholder="Answer" keyboardType={"numeric"} />

                <Text style={{
                  color: "black",
                  fontSize: 17,
                  fontWeight: "bold",
                }}>
                  Day </Text>
                <Field value={day} onChangeText={text => setDay(text)} palceholder="Answer" keyboardType={"numeric"} />


                <View style={{
                  alignItems: 'flex-end',
                  width: '78%',
                  paddingRight: 16,
                  marginBottom: 100,
                }}>
                  <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}>
                    Forgot Your Password?
                  </Text>
                </View>
                <Buttonz textColor="white" bgColor="red" btnLabel="Sign Up"
                  Press={() => register()} />
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 100,
                }}>

                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>Do you have an account ? </Text>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Loginz")}>
                    <Text onPress={() => handleSignUp()} style={{ color: "red", fontWeight: "bold", fontSize: 17 }}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>

  )
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: "18%",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    color: 'black',
    // paddingRight: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});