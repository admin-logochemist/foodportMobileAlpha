import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import Background from '../../components/Authentication/Background';
import Field from '../../components/Authentication/Field';
import Button from '../../components/Authentication/Button';
import Datepick from '../../components/Authentication/Datepick';


export default function Signup(props) {
  return (
    <Background>
    <View style={{ alignItems:'center', width:400 }}>
      <Text style={{ 
        color:'white',
         fontSize: 64,
          fontWeight:"bold",
          marginTop:50,
          marginBottom:20
        }}>Sign Up</Text>
        
        
        <View style={{ backgroundColor:"white",
         height: 700,
          width: 400,
          borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems:'center', width: 400 }}>
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
        First Name </Text>
        <Field palceholder="Email / Username" />
        
        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
       Last Name </Text>
        <Field palceholder="Email / Username" />
        
        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
       Email </Text>
        <Field palceholder="Email / Username" keyboardType={"email-address"} />

        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
       Phone </Text>
        <Field palceholder="Email / Username" keyboardType={"numeric"} />

        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
      }}>
      Password </Text>
      <Field palceholder="Password" secureTextEntry={true} />

      <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
      }}>
      Confirm Password </Text>
      <Field palceholder="Password" secureTextEntry={true} />

      <Text style={{ color: "black",
      fontSize: 17,
      fontWeight: "bold",
      }}>
      Address </Text>
      <Field palceholder="Address" />


        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
        City </Text>
        <Field palceholder="City" />

        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
        State </Text>
        <Field palceholder="State"  />

        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
        Zip Code </Text>
        <Field palceholder="Email / Username" keyboardType={"numeric"} />

        <Text style={{ color: "black",
        fontSize: 17,
        fontWeight: "bold",
        }}>
        Date of Birth </Text>
        <Datepick />

      
      <View style={{ 
        alignItems: 'flex-end', 
        width: '78%',
        paddingRight: 16,
        marginBottom: 100,
      }}>
      <Text style={{ 
        color: "red",
        fontWeight:"bold",
        fontSize: 16,
      }}>
      Forgot Your Password?
      </Text>
      </View>
      <Button textColor="white" bgColor= "red" btnLabel="Sign Up" 
      Press={() => alert("Welcome You Are Signed In") } />
      <View style={{ 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 100,
      }}>
      
      <Text style={{ fontWeight: "bold", fontSize: 17 }}>Do you have an account ? </Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Loginz")}>
      <Text style={{ color:"red", fontWeight: "bold", fontSize: 17 }}>Login</Text>
      </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
      </View>
      </View>
      </Background>
      
  )
}