import React from "react";
import { createStore ,applyMiddleware,compose} from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk'
import rootreducer from "./Reducer";

const store=createStore(rootreducer,applyMiddleware(thunk))
export default store
