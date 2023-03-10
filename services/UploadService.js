import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * 
 * @param {string} path full path without filename
 * @param {string} fileName filename without extension
 * @param {string} uri file uri
 * @returns download url
 */
export default async function uploadImageAsync(path, fileName, uri) {
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

  const fileRef = ref(getStorage(), path + "/" + fileName);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
