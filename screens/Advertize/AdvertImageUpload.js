import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Field from "../../components/Authentication/Field";
import firebase from "../../firebase.js";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <SafeAreaView>
      <View style={{ marginTop: 50 }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        <ScrollView>
          <Text
            style={{
              color: "black",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Ad Name{" "}
          </Text>
          <Field
            value={adName}
            onChangeText={(text) => setName(text)}
            palceholder="Ad name"
          />
          <Text
            style={{
              color: "black",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Heading{" "}
          </Text>
          <Field
            value={heading}
            onChangeText={(text) => setHeading(text)}
            palceholder="Heading"
          />
          <Text
            style={{
              color: "black",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Description{" "}
          </Text>
          <Field
            value={description}
            onChangeText={(text) => setDescription(text)}
            palceholder="Description"
          />
        </ScrollView>

        <Button title="Buy" onPress={proceedNext} />
      </View>
    </SafeAreaView>
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
