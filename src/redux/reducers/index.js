import { combineReducers } from "redux";
import auth from "./auth";
import map from "./map";
import favorites from "./favorites";

export default combineReducers({
    map,
    auth,
    favorites
});
