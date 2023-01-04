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
import React , { useState, useEffect } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';


    const Profiledata = ({itemData}) => {

      const [usersName, setUsersName] = useState("");
      const [userEmail, setUserEmail] = useState("");
    
      useEffect(() => {
        // Perform localStorage action
        const users = AsyncStorage.getItem("displayName");
        const email = AsyncStorage.getItem("email");
        console.log(email, "local storage");
        setUsersName(users !== null && users !== undefined ? users : "");
        setUserEmail(email);
      }, []);
    

      const signOut = () => {
            // if (usersName !== "logged Out") {
            //       AsyncStorage.clear();
            //   const users = null;
            //   navigation.navigate("Auth");
            // }
          };
      
  return (
<>

     <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Image 
    style={styles.userImg}
    source={{ uri: itemData?.image }}
    />
    <Text style={styles.userName}>{itemData.name}</Text>
    <Text style={styles.aboutUser}>
    This is your profile page. You can see the progress you've made with your work and manage your profile.
    </Text>
   </View>

<View style={styles.userBtnWrapper}>
      <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
      <Text styles={styles.userBtnTxt}>Logout</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
      <Text styles={styles.userBtnTxt}>Edit Profile</Text>  
      </TouchableOpacity>  
      </View>
      
      <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
      
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
   

    <View style={{  padding: 1, alignItems:"center", width:"100%" }}>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Name</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.name}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Email</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.email}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Password</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.password}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>City</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.city}</Text>
</View>


<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Country</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.country}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Type</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.select}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>State</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.state}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Currency</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.currency}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Phone</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.phone}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Zip</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.zipcode}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Acc No#</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.account_number}</Text>
</View>

    </View>
     </ScrollView>
   
</>
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
        width:"95%",
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

export default Profiledata;