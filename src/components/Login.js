import React, { useState, useRef } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../utils/firebase';


const Login = () => {
    const[isSignInForm ,setIsSignInForm]=useState(true);
    const [errorMessage, setErrorMessage]=useState(null);

    const email=useRef(null);
    const password=useRef(null);

    const handleButtonClick=()=>{
        const message =checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message)return;
       //Sign in Sign Up logic
       if(!isSignInForm){
        //Sign Up Logic
        createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        // ...
            })
        .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         setErrorMessage(errorCode+" "+errorMessage);
          // ..
     });
             
       }else{
           //Sign In Logic
           signInWithEmailAndPassword(auth,email.current.value, password.current.value)
            .then((userCredential) => {
           // Signed in 
           const user = userCredential.user;
            console.log(user);
            })
           .catch((error) => {
             const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+" "+errorMessage);
           });
          }

    };
    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src=" https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_large.jpg" alt="logo">
        </img>
    </div>
    <form onSubmit={(e)=>email.preventDefault} className=' w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
    <h1 className='font-bold text-3xl py-4'>{isSignInForm? "Sign In": "Sign Up"}</h1>
       
        {!isSignInForm &&  <input type='text' placeholder='Name' className='p-2 my-2 w-full bg-gray-700'/>}
        <input ref={email} type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-700'/>
        <input ref={password} type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-700'/>
        <p className='text-red-500 font-bold '>{errorMessage}</p>
        <button className='p-2 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm? "Sign In": "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm? "New to Netflix?Sign Up Now": "Already registered? Sign In Now"}</p>
    </form>
    </div>
  )
}

export default Login;