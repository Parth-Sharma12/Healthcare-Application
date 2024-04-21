import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, signInAnonymously,onAuthStateChanged} from "firebase/auth";
import Cookies from 'universal-cookie';

const firebaseConfig = {
  apiKey: "AIzaSyDeMeG8Q3v66e9X-jX0F23Z5P7WCF0E38o",
  authDomain: "chatappdemo-12989.firebaseapp.com",
  projectId: "chatappdemo-12989",
  storageBucket: "chatappdemo-12989.appspot.com",
  messagingSenderId: "177786692485",
  appId: "1:177786692485:web:9b6fd7885de756963f5aec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export const db=getFirestore(app);

// export const signInAnonymouslyIfNeeded = async () => {
//   console.log(auth.currentUser);
//   if (!auth.currentUser) {
//     try {
//       await signInAnonymously(auth);
//       console.log("Anonymous user signed in:", auth.currentUser);
//     } catch (error) {
//       console.error("Error signing in anonymously:", error);
//     }
//   } else {
//     console.log("User is already authenticated:", auth.currentUser);
//   }  
//   return auth;
// };
// export const signInAnonymouslyIfNeeded = async () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe(); // Unsubscribe to avoid memory leaks
//       console.log(unsubscribe);
//       if (user) {
//         console.log("User is already authenticated:", user);
//         resolve(auth);
//       } else {
//         signInAnonymously(auth)
//           .then(() => {
//             console.log("Anonymous user signed in:", auth.currentUser);
//             resolve(auth);
//           })
//           .catch((error) => {
//             console.error("Error signing in anonymously:", error);
//             reject(error);
//           });
//       }
//     });
//   });
// };
// export const signInAnonymouslyIfNeeded = async () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe(); //Unsubscribe to avoid memory leaks
//       console.log(unsubscribe);
//       if(user) {
//         console.log("User is already authenticated:", user);
//         resolve(auth);
//       } else {
//         signInAnonymously(auth)
//           .then(() => {
//             console.log("Anonymous user signed in:", auth.currentUser);
//             resolve(auth);
//           })
//           .catch((error) => {
//             console.error("Error signing in anonymously:", error);
//             reject(error);
//           });
//       }
//     });

//     // Handle the case where the initial authentication state check takes too long
//     setTimeout(() => {
//       unsubscribe(); // Unsubscribe if the check takes too long
//       console.log("Initial authentication state check timed out");
//       signInAnonymously(auth)
//         .then(() => {
//           console.log("Anonymous user signed in:", auth.currentUser);
//           resolve(auth);
//         })
//         .catch((error) => {
//           console.error("Error signing in anonymously:", error);
//           reject(error);
//         });
//     }, 15000); // Adjust the timeout duration as needed
//   });
// };
export const signInAnonymouslyIfNeeded = async () => {
  return new Promise((resolve, reject) => {
    let initialAuthCheckCompleted = false; // Flag to track if initial auth check completed
    let anonymousSignInCompleted = false; // Flag to track if anonymous sign-in completed
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!initialAuthCheckCompleted) {
        initialAuthCheckCompleted = true; // Set flag to true after initial check
        unsubscribe(); // Unsubscribe to avoid memory leaks
        if (user) {
          console.log("User is already authenticated:", user);
          resolve(auth);
        } else if (!anonymousSignInCompleted) {
          anonymousSignInCompleted = true; // Set flag to true after anonymous sign-in
          signInAnonymously(auth)
            .then(() => {
              console.log("Anonymous user signed in:", auth.currentUser);
              resolve(auth);
            })
            .catch((error) => {
              console.error("Error signing in anonymously:", error);
              reject(error);
            });
        }
      }
    });

    // Handle the case where the initial authentication state check takes too long
    setTimeout(() => {
      if (!initialAuthCheckCompleted) {
        initialAuthCheckCompleted = true; // Set flag to true if timeout occurs
        unsubscribe(); // Unsubscribe if the check takes too long
        console.log("Initial authentication state check timed out");
        if (!anonymousSignInCompleted) {
          anonymousSignInCompleted = true; // Set flag to true after anonymous sign-in
          signInAnonymously(auth)
            .then(() => {
              console.log("Anonymous user signed in:", auth.currentUser);
              resolve(auth);
            })
            .catch((error) => {
              console.error("Error signing in anonymously:", error);
              reject(error);
            });
        }
      }
    }, 5000); // Adjust the timeout duration as needed
  });
};

