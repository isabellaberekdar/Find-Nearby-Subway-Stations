import axios from "axios"
import { getFavorites } from './favorites'
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
} from "./types"

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  axios
    .get("/api/auth/user/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })


    }).then(() => getFavorites())
    .catch(err => console.log(err))
}

// LOGIN USER
export const login = (username, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // Request Body
  const body = JSON.stringify({ username, password })
  
  axios
    .post("/api/auth/login/", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

    })
    .catch(error => console.log(error))
}

export const register = ({ username, password, email }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ username, email, password })

  axios
    .post("/api/auth/register/", body, config)

    .then(res => {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: res.data
      })
    })

    .catch(error => console.log(error))
}


// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
    })
    .catch(error => console.log(error))
}


export const tokenConfig = getState => {

  const token = getState().auth.token

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  if (token) {
    config.headers["Authorization"] = `Token ${token}`
  }

  return config
}