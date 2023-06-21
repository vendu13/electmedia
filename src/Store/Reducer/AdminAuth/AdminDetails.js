import { ADMIN_DETAILS, IS_ADMIN_AUTHENTICATED, NAV_LOADING } from "../../Types/AdminType/AuthTypes"

const AdminAuthDetails={
    userDetails:{},
    isAuthenticated:false,
    isnavloading:false
}

export const authDetails=(state=AdminAuthDetails,action)=>{
    switch(action.type){
        case IS_ADMIN_AUTHENTICATED:
        return ({
            ...state,
            isAuthenticated:action.ifAuthenticated
        })
        case NAV_LOADING:
        return ({
            ...state,
            isnavloading:action.isnavloading
        })
        case ADMIN_DETAILS:
            return ({
                ...state,
                userDetails: action.userDetails
            })
        default:
            return({
                ...state
            })
    }
}