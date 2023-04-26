import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { auth } from '../firebase'

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    return (
        <UserContext.Provider value={{createUser, logIn, logOut, user}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}