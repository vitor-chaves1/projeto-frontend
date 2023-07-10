import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import { Navigate } from "react-router";

export const AuthGoogleContext = createContext({})

export const AuthGoogleProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const loadStoreAuth = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
            console.log('User: ',currentUser)
        })
        return () => {
            loadStoreAuth();
        }
    }, [])

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
        return <Navigate to="/" />
    }

    return (
        <AuthGoogleContext.Provider value={{ signInGoogle, signed: !!user, user, logOut }}>
            {children}
        </AuthGoogleContext.Provider>
    )
}
