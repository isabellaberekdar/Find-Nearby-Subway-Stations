import { 
  USER_LOADING, 
  USER_LOADED, 
  AUTH_ERROR, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT_SUCCESS, 
  REGISTRATION_FAIL, 
  REGISTRATION_SUCCESS 
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),   
    isAuthenticated: null,                  // if user is logged in: true
    isLoading: false,                        // when user is loading
    user: null
}

export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case LOGIN_SUCCESS:
      case REGISTRATION_SUCCESS:
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false
        };
      case AUTH_ERROR:      //?????????
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTRATION_FAIL:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        };
      default:
        return state;
    }
}