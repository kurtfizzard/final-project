import React, { createContext, useReducer, useEffect } from "react";
import { auth, emailAuthProvider, googleAuthProvider } from "../../firebase";

export const CurrentUserContext = createContext(null);

const initialState = {
  loading: true,
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    // case "SIGN_UP": {
    // }
    case "SIGN_IN": {
      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
    case "SIGN_OUT": {
      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
  }
};

const UserProvider = ({ children }) => {
  const [currentUser, dispatchCurrentUser] = useReducer(
    userReducer,
    initialState
  );

  // const signUp = (e) => {
  //   e.preventDefault();
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       // Signed in
  //       // ...
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // ..
  //     });
  // };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithPopup(emailAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
  };

  useEffect(() => {
    const authListen = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // const response = await fetch("http://localhost:8000/auth/signin", {
        //   method: "POST",
        //   headers: { "content-type": "application/json" },
        //   body: JSON.stringify(user),
        // });
        // const userData = await response.json();
        // console.log(userData);
        dispatchCurrentUser({ type: "SIGN_IN", data: { user } });
      } else {
        dispatchCurrentUser({ type: "SIGN_OUT", data: { user } });
      }
    });
    return () => {
      authListen();
    };
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        dispatchCurrentUser,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        // signUp,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default UserProvider;
