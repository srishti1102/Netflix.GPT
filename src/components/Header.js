import React from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const handleSignOut=()=>{
    signOut(auth)
    .then(() => {
    })
    .catch((error) => {
      navigate("/error");
    });
  };

  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL}= user;
          dispatch
          (addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL})
        );
          navigate("/browse");
        
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
      // Unsubscribe when component unmounts
      return () => unsubscribe();
},[])

  return (
    <div className='absolute  w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img 
        className='w-44' src={LOGO} alt="logo"/>

        {user &&(<div className='flex'>
         <img className='w-12 h-12 p-2'alt="usericon" src="user?.photoURL"></img>
         <button onClick={handleSignOut}className='font-bold text-white flex p-2'>(Sign Out)
         </button>
         </div>
        )};

    </div>
  
  );
};

export default Header;