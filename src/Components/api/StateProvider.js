//setUp data layer
//this is like a gloabl variable that will store
//info and we can pass it wherever
//we need this to track the basket
import React, { createContext, useContext, useReducer } from "react";

//this is the data layer
export const StateContext = createContext();

//Build a provider:
//      to wrap the entire app inside the provider
//and give it acces to the data layer we have created
//here

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//this is how we use it inside of component
export const useStateValue = () => useContext(StateContext);
