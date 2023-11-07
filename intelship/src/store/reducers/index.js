import { combineReducers } from "redux";
import fueltankReducer from "./fueltankReducer";
import vesselReducer from "./vesselReducer";
import userReducer from "./userReducer";
import companyReducer from "./companyReducer";


const rootReducer = combineReducers({
    fueltankReducer,
    vesselReducer,
    userReducer,
    companyReducer,
})


export default rootReducer;