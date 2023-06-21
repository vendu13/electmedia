import { combineReducers } from "redux";
import { authDetails } from "./AdminAuth/AdminDetails";
import { navSections } from "./NavSectionReducer/navSectionReducer";

// import { userReducer } from "./userReducer";

const rootReducer=combineReducers(
    {
        // user: userReducer,
        adminAuth:authDetails,
        navSection:navSections
    }
)

export default rootReducer;