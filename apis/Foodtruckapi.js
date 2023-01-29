import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import 'react-native-get-random-values';

// import { v4 as uuidv4 } from 'uuid';

// export function login({ email, password }) {
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((value) => console.log(value))
// }

// export function signup({ email, password, displayName }) {
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userInfo) => {
//       console.log(userInfo)
//       userInfo.user.updateProfile({ displayName: displayName.trim() })
//         .then(() => { })
//     })
// }

// export function subscribeToAuthChanges(authStateChanged) {
//   firebase.auth().onAuthStateChanged((user) => {
//     authStateChanged(user);
//   })
// }

// export function signout(onSignedOut) {
//   firebase.auth().signOut()
//     .then(() => {
//       onSignedOut();
//     })
// }

// export function updateFood(food, updateComplete) {
//   food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
//   console.log("Updating food in firebase");

//   firebase.firestore()
//     .collection('Foods')
//     .doc(food.id).set(food)
//     .then(() => updateComplete(food))
//     .catch((error) => console.log(error));
// }

// export function deleteFood(food, deleteComplete) {
//   console.log(food);

//   firebase.firestore()
//     .collection('Foods')
//     .doc(food.id).delete()
//     .then(() => deleteComplete())
//     .catch((error) => console.log(error));
// }

// export async function getFoods(foodsRetreived) {

//   var foodList = [];

//   var snapshot = await firebase.firestore()
//     .collection('Foods')
//     .orderBy('createdAt')
//     .get()

//   snapshot.forEach((doc) => {
//     const foodItem = doc.data();
//     foodItem.id = doc.id;
//     foodList.push(foodItem);
//   });

//   foodsRetreived(foodList);
// }

// export function uploadFood(food, onFoodUploaded, { updating }) {

//   if (food.imageUri) {
//     const fileExtension = food.imageUri.split('.').pop();
//     console.log("EXT: " + fileExtension);

//     var uuid = uuidv4();

//     const fileName = `${uuid}.${fileExtension}`;
//     console.log(fileName);

//     var storageRef = firebase.storage().ref(`foods/images/${fileName}`);

//     storageRef.putFile(food.imageUri)
//       .on(
//         firebase.storage.TaskEvent.STATE_CHANGED,
//         snapshot => {
//           console.log("snapshot: " + snapshot.state);
//           console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

//           if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
//             console.log("Success");
//           }
//         },
//         error => {
//           unsubscribe();
//           console.log("image upload error: " + error.toString());
//         },
//         () => {
//           storageRef.getDownloadURL()
//             .then((downloadUrl) => {
//               console.log("File available at: " + downloadUrl);

//               food.image = downloadUrl;

//               delete food.imageUri;

//               if (updating) {
//                 console.log("Updating....");
//                 updateFood(food, onFoodUploaded);
//               } else {
//                 console.log("adding...");
//                 addFood(food, onFoodUploaded);
//               }
//             })
//         }
//       )
//   } else {
//     console.log("Skipping image upload");

//     delete food.imageUri;

//     if (updating) {
//       console.log("Updating....");
//       updateFood(food, onFoodUploaded);
//     } else {
//       console.log("adding...");
//       addFood(food, onFoodUploaded);
//     }
//   }
// }

export function addFoodTruck(foodtruck, addComplete) {
  //   foodtruck.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  //   firebase.firestore()
  //     .collection('alphatest')
  //     .add(foodtruck)
  //     .then((snapshot) => {
  //       foodtruck.id = snapshot.id;
  //       snapshot.set(foodtruck);
  //     }).then(() => addComplete(foodtruck))
  //     .catch((error) => console.log(error));
  firebase
    .firestore()
    .collection("alphatest")
    .add({
      name: foodtruck.name,
      address: foodtruck.address,
      cusine: foodtruck.dishname,
      phone: foodtruck.phone,
      image: foodtruck.image,
      type: foodtruck.type,
      monday: foodtruck.monday,
      tuesday: foodtruck.tuesday,
      wednesday: foodtruck.wednesday,
      thursday: foodtruck.thursday,
      friday: foodtruck.friday,
      saturday: foodtruck.saturday,
      sunday: foodtruck.sunday,
      about: foodtruck.about,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((snapshot) => snapshot.get())
    .then((foodtruckData) => foodtruckData.data())
    .catch((error) => console.log(error));
}

export async function getFoodTruck(foodtruckRetrived) {
  var foodTruckList = [];

  var snapshot = await firebase
    .firestore()
    .collection("FoodTruck")
    .orderBy("createdAt")
    .get();

  snapshot.forEach((doc) => {
    foodTruckList.push(doc.data());
  });

  foodsRetreived(foodTruckList);
}

/*
export async function getFoodTrucks (isAdmin = false) {
    let firebaseCollection = firebase.firestore().collection("resturant")
    
    if (isAdmin) { 
        firebaseCollection = firebaseCollection.where("remail", "==", "hamburger@gmail.com")
    } 
    
    firebase.onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
            tempdata.push({...doc.data()})
        })
        setFoodTruck(tempdata);
        })
  }
*/
// var foodList = [];

// var snapshot = await firebase.firestore()
//   .collection('Foods')
//   .orderBy('createdAt')
//   .get()

// snapshot.forEach((doc) => {
//   const foodItem = doc.data();
//   foodItem.id = doc.id;
//   foodList.push(foodItem);
// });

// foodsRetreived(foodList);
