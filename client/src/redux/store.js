import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux"; 

const persistConfig = {
  key: "root", 
  storage,     
};

const rootReducer = combineReducers({
  user: userReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      immutableCheck: false,    
    }),
});

export const persistor = persistStore(store);

export default store;
