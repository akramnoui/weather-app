// useFirebaseAuth.ts
import { useEffect } from 'react';
import { signIn, authListener, auth, firestore } from '../../firebaseConfig';
import { useMainCtx } from '../context/MainContext';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'


const useFirebaseAuth = () => {
    const {uid, setUid, restoredUid} = useMainCtx();

  useEffect(() => {

    const signInAndListen = async () => {
        if(!uid){
            try {
                const user = await signIn(auth);
                const uid = user.user.tenantId;

              } catch (error) {
                console.error(error);
              }
        }
     

      const unsubscribe = authListener(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const docRef = await setDoc(doc(collection(firestore, "users"), uid), {});
          setUid(uid);
        } else {
          // Handle user signed out
        }
      });

      return () => {
        unsubscribe(); // Cleanup function to remove the listener when the component is unmounted
      };
    };
        if(restoredUid){
            signInAndListen();

        }
  }, [restoredUid]);
};

export default useFirebaseAuth;
