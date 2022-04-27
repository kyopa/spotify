import { setDoc, doc } from "firebase/firestore";
import { useState } from "react"
import { useEffect } from "react";
import db from "./firebase.config";



const useFirestore = (init) => {

    const [state, setState] = useState();

    useEffect(() => {
        
    }, [])
}

export default useFirestore