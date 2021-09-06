import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
//Firebase config
export const firebaseHandler = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};
//Google Sign In
export const handleSignInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signedIn = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return signedIn;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

//Facebook Sign In
export const handleSignInWithFacebook = () => {
  //console.log("Singed in with facebook");
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      //
      let token = res.credential.accessToken;
      let user = res.user;
      user.success = true;
      return user;
    })
    .catch((err) => {
      // console.log(err);
      console.log(err.message);
    });
};
//SignOut

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const signedOut = {
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
      };
      return signedOut;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logInFromForm = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUser = res.user;
      newUser.error = "";
      newUser.success = true;
      return newUser;
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUser = {};
      newUser.error = errorMessage;
      newUser.success = false;
      return newUser;
    });
};
///create Account from Form
export const createAccountFromForm = (email, password, name) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUser = res.user;
      newUser.error = "";
      newUser.success = true;
      updateUserInfo(name);
      return newUser;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const newUser = {};
      newUser.error = errorMessage;
      newUser.success = false;
      console.log(errorCode, errorMessage);
      return newUser;
      // ..
    });
};
//Update userInfo
export const updateUserInfo = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};
