import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react';
import Background from '../../components/Authentication/Background';
import Field from '../../components/Authentication/Field';
import Button from '../../components/Authentication/Button';
// import { updateDoc, collection, onSnapshot, orderBy, query, doc, getDocs, where, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { app,db } from '../../firebase.js';



export default function Login(props) {
  
//   const [email,setemail] =useState()
//   const [password,setpassword] =useState()


//   const logintoApp =  async  (e) => {
//     const querySnapshot = await getDocs(collection(db, "userid"), where("select", "==", "admin"));
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       data.push({ id: doc.id, ...doc.data() })
//     })
//     try{
//     const filterData =  data.filter((item) => item.select === "user" && item.email === email && item.password === password)
//     if (filterData) {
//       console.log(filterData,"Show")
//     }
//   }
//  catch(e){
//    console.log(e)
//  }
//   }
 
//   console.log(email,password,"assadsasd")

  return (
    <Background>
    <View style={{ alignItems:'center', width:400 }}>
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
        <Field onChangeText={newText => setemail(newText)} palceholder="Email / Username" keyboardType={"email-address"} />
        
        <Text style={{ color: "black",
        fontSize: 17,
         fontWeight: "bold",
         }}>
       Password </Text>
        <Field onChangeText={newText => setpassword(newText)} palceholder="Password" secureTextEntry={true} />

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
        <Button  textColor="white" bgColor= "red" btnLabel="Login" 
        Press={() => logintoApp()} />
        <View style={{ 
          display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
        }}>

        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Dont't have an account ? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
        <Text style={{ color:"red", fontWeight: "bold", fontSize: 17 }}>Sign Up</Text>
        </TouchableOpacity>
        </View>
    </View>
    </View>
    </Background>

  )
}