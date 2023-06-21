import { FETCH_CATEGORIES, FETCH_POLICY, FETCH_SOCIAL_HANDLES } from "../../Types/AdminType/sectionTypes"
import { SECTION_LOADER } from "../../Types/AdminType/sectionTypes"

const SectionReducer={
    categories:[],
    articles:[],
    policies:[],
    socialHandles:[],
    sectionLoader:false
}

export const navSections=(state=SectionReducer,action)=>{
    switch(action.type){
        case FETCH_CATEGORIES:
            return ({
                ...state,categories:action.categories
            })
        case FETCH_SOCIAL_HANDLES:
            return ({
                ...state,socialHandles:action.socialHandles
            })
        case FETCH_POLICY:
            return ({
                ...state,policies:action.policy
            })
         case SECTION_LOADER:
            return ({
                    ...state,sectionLoader:action.sectionLoader
            })
        default:
            return({
                ...state
            })
    }
}