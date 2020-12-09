import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext(null);

const initialState = {
  loading: true,
  user: null,
};

const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SIGN_UP": {
      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
    case "SIGN_IN": {
      return {
        ...state,
        user: action.data,
        loading: false,
      };
    }
    case "SIGN_OUT": {
      return {
        ...state,
        user: action.data,
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

  const signOut = (e) => {
    e.preventDefault();
    dispatchCurrentUser({ type: "SIGN_OUT", data: null });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        dispatchCurrentUser,
        // signInWithEmail,
        signOut,
        // signUp,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default UserProvider;
