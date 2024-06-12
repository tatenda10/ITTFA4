import React, { createContext, useReducer, useContext } from 'react';

// Create context
const UserContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null
};

// Reducer function to manage state changes
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...state, user: null };
    default:
      return state;
  }
};

// UserProvider component to wrap around parts of your app where you need access to the user state
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the UserContext
const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
