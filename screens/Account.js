import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useEffect, useState }from 'react';
import firebase from "../firebase";
import {query, addDoc, collection, onSnapshot } from 'firebase/firestore';
import Profiledata from '../components/Account/Profiledata';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function  Account() {
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');

    const getData = () => {
        try {
            AsyncStorage.getItem("email")
            .then(value => {
                if (value != null) {
                    setEmail(JSON.parse(value))
                }
            })
        } catch (error){
            console.log(error);
        }
    }

    const getAccounts =  () => {
      firebase.firestore().collection("userid").where("email", "==", email.toLowerCase())
        .onSnapshot(snapshot => {            
            setUser(snapshot.docs.map(doc => (
            {
                data: doc.data()
            }
            )))
        });
    }

    const myData = () => {
      getAccounts();
    };

    useEffect(() =>  {
        getData();
        myData();
        if (email !== null) {
            getAccounts();
        }
        // else{
        //     getAccounts();
        // }
 
    }, [email]);

    // useEffect(()=>{
    //   if (email !== null) {
    //     console.log(email , "alpha is")
    //     getAccounts();
    //   }
    // }, [email])


    const renderUser = () => {
      if (user.length > 0) {
        async function trying(url) {
            let image = await url.then(async (url) => { return url })
            return image.toString()
        }

        return user.map((item, index) => {
            var detail = []

            for (const i in item) {
                detail.push(item[i])
            }

            return detail.map((item, index) => {
                return (
                    <Profiledata itemData={item}/>
                );
            })
        })
      }
    };

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            {
            renderUser()
            }
        </SafeAreaView>
    )
}

