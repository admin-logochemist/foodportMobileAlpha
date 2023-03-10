import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Rating, AirbnbRating } from "react-native-ratings";
import firebase from "firebase/compat/app";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "Pakistan's Grill",
    image_url:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    categories: ["Pakistani", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];

export default function RestaurantItems({ navigation, ...props }) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
          }
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >
            <RestaurantImage
              restaurant={restaurant}
              image={restaurant.image_url}
            />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () =>
      await AsyncStorage.getItem("email").then((value) => {
        if (value) {
          setEmail(JSON.parse(value));

          if (props.restaurant.id && email) {
            loadData();
          }
        }
      }))();
  }, [email, props.restaurant.id]);

  const loadData = () => {
    firebase
      .firestore()
      .collection("favoritealpha")
      .where("userEmail", "==", email)
      .where("id", "==", props.restaurant.id)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().id === props.restaurant.id) {
            setFavDelId(doc.id);
            setIsFavorite(true);
          }
        });
      });
  };
  const [favorite, setIsFavorite] = useState(false);
  const [favdelid, setFavDelId] = useState("");

  const insertFav = () => {
    firebase
      .firestore()
      .collection("favoritealpha")
      .add({
        name: props.restaurant.name,
        image: props.restaurant.image_url,
        price: props.restaurant.price,
        reviews: props.restaurant.review_count,
        rating: props.restaurant.rating,
        categories: props.restaurant.categories,
        id: props.restaurant.id,
        userEmail: email,
        resName: props.restaurant.name,
      })
      .then((docRef) => {
        setFavDelId(docRef.id);
        return docRef.set({
          userEmail: email,
          favid: docRef.id,
          name: props.restaurant.name,
          image: props.restaurant.image_url,
          price: props.restaurant.price,
          reviews: props.restaurant.review_count,
          rating: props.restaurant.rating,
          categories: props.restaurant.categories,
          id: props.restaurant.id,
          resName: props.restaurant.name,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
  };
  const delFav = () => {
    const docRef = firebase.firestore().doc(`favoritealpha/${favdelid}`);
    docRef
      .delete()
      .then(() => {
        console.log("Document deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
  };
  return (
    <>
      <Image
        source={{
          uri: props.image,
        }}
        style={{ width: "100%", height: 180 }}
      />
      <TouchableOpacity
        onPress={(e) => {
          setIsFavorite(!favorite);
          if (!favorite) {
            insertFav();
          } else {
            delFav();
          }
        }}
        style={{ position: "absolute", right: 20, top: 20 }}
      >
        {favorite ? (
          <MaterialCommunityIcons name="heart" size={25} color="#fff" />
        ) : (
          <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
        )}
      </TouchableOpacity>
    </>
  );
};

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 ??? min</Text>
    </View>
    <View>
      <Rating
        type="star"
        ratingCount={5}
        startingValue={props.rating}
        imageSize={20}
        style={{ paddingVertical: 10 }}
      />
    </View>
  </View>
);
