import { combineReducers } from "redux";
import bioReducer from "./bio/slice";
import balanceReducer from "./balance/slice";
import urlReducer from "./url/slice";
import usersReducer from "./users/slice";

const rootReducer = combineReducers({
    users: usersReducer,
    bio: bioReducer,
    url: urlReducer,
    balance: balanceReducer,
});

export default rootReducer;
