import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ADMIN_DETAILS, IS_ADMIN_AUTHENTICATED, NAV_LOADING } from "../../../Types/AdminType/AuthTypes";
import { auth } from "../../../../Config/firebase";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

// const auth = getAuth();
export const check=()=>dispatch=>{
    const user = auth.currentUser;
    dispatch({
      type:NAV_LOADING,
      isnavloading:true
    })
    console.log("in check")
    if(user){
        dispatch({
            type:ADMIN_DETAILS,
            userDetails:user
          })
          dispatch({
            type:IS_ADMIN_AUTHENTICATED,
            ifAuthenticated:true
          })
          
    }
    else{
        dispatch({
            type:ADMIN_DETAILS,
            userDetails:{}
          })
          dispatch({
            type:IS_ADMIN_AUTHENTICATED,
            ifAuthenticated:false
          })
    }
    dispatch({
      type:NAV_LOADING,
      isnavloading:false
    })
}
export const loginAction=(payload,navigate)=>dispatch=>{
    console.log("here")
    // createUserWithEmailAndPassword(auth, "admin1234@gmail.com", "admin)(*&")
    // .then((userCredential) => {
    //   // Signed in 
    //   const user = userCredential.user;
    //   console.log(user)
    //   dispatch({
    //     type:ADMIN_DETAILS,
    //     userDetails:user
    //   })
    //   dispatch({
    //     type:IS_ADMIN_AUTHENTICATED,
    //     ifAuthenticated:true
    //   })
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // 
    //   console.log("error",errorCode)
    // });
    // signInWithEmailAndPassword(auth, "admin1234@gmail.com","admin)(*&")
    signInWithEmailAndPassword(auth, payload.email,payload.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
       dispatch({
        type:ADMIN_DETAILS,
        userDetails:user
      })
      dispatch({
        type:IS_ADMIN_AUTHENTICATED,
        ifAuthenticated:true
      })
      toast.success("Successfully Logged In !!")
    navigate("/api/v1/admin/article")
      
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log(errorMessage)
    toast.error("Invalid Username / Password")
  });
}

export const logoutAction=()=>dispatch=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signed out successfully")
        dispatch({
            type:ADMIN_DETAILS,
            userDetails:[]
          })
          dispatch({
            type:IS_ADMIN_AUTHENTICATED,
            ifAuthenticated:false
          })
          // console.log("logout action")
          toast.success("Successfully Logged Out !!")
         
      }).catch((error) => {
        // An error happened.
      });
      
}