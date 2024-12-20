import Swal from "sweetalert2";
import React from "react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, db } from "../init-firebase";
import {doc, setDoc } from "firebase/firestore";
import Mycontext from "./Mycontext";
import {useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

      const Myprovider = ({ children }) => {
         const Navigate=useNavigate()
         const SignupFirebase = async (name, email, password,doners,Age,contact,city,url) => {
          
            if (!password || password.length < 8 || password.length > 20 || !/[a-z]/.test(password)) {
              Swal.fire("Password must be between 8-20 characters, contain at least one lowercase letter letter, one number.");
              return false;
            }
            
       
          
         if (name && email && password) {
         createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
        })
        setDoc(doc(db, "SinupUser", user.uid),
        {
          Name:name,
          UserEmail:email,
          UserPassword:password,
          Who:doners,
          age: Age,
          city: city,
          mobilt: contact,
          url:url
        })
        Swal.fire(`Wow ${name}, good job! Now  registered successfully.`);
        console.log("User saved to Firestore:", user);
        Navigate('/login')
       }) 
    .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log("Error signing up:", errorCode,errorMessage);
     Swal.fire("Error signing up. Please try again.");
  });
  
  }else{
  Swal.fire("Please fill all fields.");
}
  };
  // SignIn Exist User
  const SignInfirebase = async (email, password) => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
          Swal.fire(`Wow , Great! .`);
          console.log("Signed in user:", user);
           
          await setDoc(doc(db, "signinInUser", user.uid), {
            userEmail: email,
            userPassword: password,
            userId:userCredential?.user.uid
          });
        
         Navigate("/home");
      } catch (error) {
        console.error("Error signing in:", error.message);
        Swal.fire("Error signing in. check your password.");
      }
    } else {
      Swal.fire("Please fill all fields.");
    }
  };
  
  const ForgetPassword = async (email) => {
         if (email) {
        try {
        await sendPasswordResetEmail(auth, email);
        Swal.fire("Password reset email sent successfully!");
        } catch (error) {
        console.error("Error resetting password:", error.message);
        Swal.fire("Error resetting password. Please try again.");
        }
        } else {
        Swal.fire("Please provide your email.");
     }
  };
  




  return (
    <Mycontext.Provider value={{SignupFirebase,SignInfirebase, ForgetPassword}}>
      {children}
    </Mycontext.Provider>
  );
};

export default Myprovider;
