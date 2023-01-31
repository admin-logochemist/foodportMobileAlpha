import { View, Text, SafeAreaView, ImageBackground, Button, Image } from "react-native";
import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Field from "../../components/Authentication/Field";
import firebase from "../../firebase.js";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttonz from '../../components/Advertizement/Button.js';
import StripeField from '../../components/Stripe/Stripe.js';

export default function AdvertImageUpload({ route }) {
  const [imageUri, setImage] = useState("");
  const [adName, setName] = useState("");
  const [thisUid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const { packageId, durationDays } = route.params;
  const [docRefId, setDocRefId] = useState("");
  const db = firebase.firestore();

  useEffect(() => {
    (async () =>
      await AsyncStorage.getItem("email").then((_email) => {
        if (_email) {
          setEmail(JSON.parse(_email));
        }
      }))();

    (async () =>
      await AsyncStorage.getItem("uid").then((_uid) => {
        if (_uid) {
          setUid(JSON.parse(_uid));
        }
      }))();
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const proceedNext = () => {
    const date = new Date();

    db.collection("advertpackage")
      .add({
        uuid: thisUid,
        uEmail: email,
        name: adName,
        heading: heading,
        description: description,
        active: false,
        packageDateStart: date.setDate(date.getDate()),
        packageDateEnd: date.setDate(date.getDate() + durationDays),
        approved: "pending",
        packageId: packageId,
      })
      .then(async (docRef) => {
        setDocRefId(docRef.id);
        const imageLink = await uploadImageAsync(thisUid, docRef.id, imageUri);

        await db.collection("advertpackage").doc(docRef.id).update({
          image: imageLink,
        });
      });
  };

  return (
    <View>
    <ImageBackground 
    source={require("../../assets/advertize/Group_39.png")}
    style={{
      height: "100%",
      // flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    opacity: 1,
    backgroundColor: 'black',
    }}
    >
    <View style={{alignItems:"center", width:"100%", marginTop:100}}>
    <Image source={require('../../assets/logo/food_port_logo_WHITE-01.png')}
    style={{ width:300, height:70 }}
    />
    </View>
    <ScrollView>
    <View style={{ marginTop: 50, alignItems:"center", width:"100%", marginBottom:200 }}>
          <Text
            style={{
              marginTop:6,
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Advertizment Name{" "}
          </Text>
          <Field
            value={adName}
            onChangeText={(text) => setName(text)}
            palceholder="Ad name"
          />
          <Text
            style={{
              marginTop:6,
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
          Advertizment Heading{" "}
          </Text>
          <Field
            value={heading}
            onChangeText={(text) => setHeading(text)}
            palceholder="Heading"
          />
          <Text
            style={{
              marginTop:6,
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
          Advertizment Description{" "}
          </Text>
          <Field
            value={description}
            onChangeText={(text) => setDescription(text)}
            palceholder="Description"
          />
          <View style={{width:"95%"}}>
          <StripeField />
          </View>
          <Button title="Pick an image from your gallery" onPress={pickImage} />


          <Buttonz textColor="white" bgColor="red" btnLabel="Buy" onPress={proceedNext} />
          </View>

        </ScrollView>
        </ImageBackground>
    </View>
  );
}

// export default AdvertImageUpload;
async function uploadImageAsync(uid, docId, uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), "advertize/" + uid + "/" + docId);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  console.log(fileRef);
  return await getDownloadURL(fileRef);
}
