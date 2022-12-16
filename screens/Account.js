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




export default function Account() {

  const [user, setUser] = useState([]);

     const getAccounts = () => {
    
      firebase.firestore().collection("userid").where("email", "==", "hbl@logochemist.com")
      .onSnapshot(snapshot => (
        setUser(snapshot.docs.map(doc => (
          {
  
            data: doc.data()
          }
        )))
      ))
  
    };

    useEffect(() => {
      getAccounts();
    }, []);


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
  <Profiledata 
                   itemData={item}
               />
              
            );
          })
        })
      }
    };
  

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Image 
    style={styles.userImg}
    source={require('../assets/user/profpic.jpg')}
    />
    <Text style={styles.userName}>Alpha's Darling</Text>
    <Text style={styles.aboutUser}>
    Lorem ipsum dolar sit ammet bharva hat bharvaaa dummy content madarjaaat
    </Text>
   </View>
  
    <ScrollView
    style={styles.container}
    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
    showsVerticalScrollIndicator={false}>
      <View style={styles.userBtnWrapper}>
      <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
      <Text styles={styles.userBtnTxt}>Message</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
      <Text styles={styles.userBtnTxt}>Follow</Text>  
      </TouchableOpacity>  
      </View>
      
      <View style={styles.userInfoWrapper}>
      
      <View style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>222 times</Text>
      <Text style={styles.userInfoSubTitle}>You Ordered</Text>
      </View>
      
      <View style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>10,000</Text>
      <Text style={styles.userInfoSubTitle}>users</Text>
      </View>
      
      <View style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>10,000</Text>
      <Text style={styles.userInfoSubTitle}>users</Text>
      </View>
      
      </View>
      
      
      <View>
      {
        renderUser()
      }
      </View>
      
      </ScrollView>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  containerz: {
    backgroundColor: 'grey',
    padding:15,
    borderRadius:15,
    margin:5,
    marginHorizontal:10,
  },
  innercontainer: {
    alignItems:'center',
    flexDirection:'coloumn',
  },
  itemHeading:{
    fontWeight:'bold',
  },
  itemText:{
    fontWeight:'300',
  },

});