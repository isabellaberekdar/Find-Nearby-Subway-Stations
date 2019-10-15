import axios from 'axios'
import { 
    FAVORITES_LOADING, 
    FAVORITES_LOADED,
    FAVORITES_LOADING_ERROR, 
    GET_FAVORITES, 
    DELETE_FAVORITES, 
    ADD_FAVORITE, 
    CREATE_FAVORITES,
    REMOVE_FAVORITE
} from './types'
import favorites from '../reducers/favorites';
import store from '../store'
import { get_id } from '../../functions/getId'


// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
  
    return config;
};

export const getFavorites = () => (dispatch, getState) => {
    const token = localStorage.getItem('token')
    
/*     axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
    } */
    axios.get('/api/favoriteLines/', tokenConfig(getState))
        .then(res => {
            //console.log(res.data[0])
            let { lines, id } = res.data[0]
            
            //lines = lines.map(element => element.name)
            //const id = user.id

            dispatch({
                type: GET_FAVORITES,
                payload: {id: id, favorites: lines}         // remove id? also from serializer
            })
        }).catch(error => console.log(error)
        )
}

 

export const deleteFavorite = line_to_delete => (dispatch, getState) => {
    // if id is null, it's the user's first favorite.
    // do a post request instead and set the id in the reducer.
    let { favorites, id } = getState().favorites

    const line_to_delete_id = get_id[line_to_delete].id
    // remove the line from the array
    favorites = favorites.filter(line_id => line_id !== line_to_delete_id)
    

    const new_favorites = {
        "lines": favorites
    }

    console.log(new_favorites)
    // If user has no favorites yet
    if (id === null) {
        console.log('Error: unknown user')
    } 

    else {
        // User still has favorites left after deleting
        if (favorites.length > 0) {
            console.log("PATCH ", id)
            axios.patch(`/api/favoriteLines/${id}/`, new_favorites, tokenConfig(getState))
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: REMOVE_FAVORITE,
                    payload: res.data
                })
            }).catch(error => console.log(error))
        } 
    
        // Removed last favorite; delete item from database
        else {
            console.log("DELETE ", id)
            axios.delete(`/api/favoriteLines/${id}/`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: DELETE_FAVORITES,
                })
            }).catch(error => console.log(error))
        }
    }

}


export const addFavorite = line_to_add => (dispatch, getState) => {
    let { favorites, id } = getState().favorites
    const line_to_add_id = get_id[line_to_add].id

    favorites = [...favorites, line_to_add_id]
    
    const new_favorites = {
        "lines": favorites
    }
    
    console.log(new_favorites)
    // If user has no favorites yet
    if (id === null) {
        console.log("POST ", id)

        axios.post(`/api/favoriteLines/`, new_favorites, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_FAVORITE,
                payload: res.data
            })
        }).catch(error => console.log(error))

    } 

    // User has favorites; replace old lines with new lines
    else {
        console.log("PATCH ", id)
        axios.patch(`/api/favoriteLines/${id}/`, new_favorites, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_FAVORITE,
                payload: res.data
            })
        }).catch(error => console.log(error))
    }
}



// Loads favorites. Called when app first loads.
export const loadFavorites = () => dispatch => {
    // User Loading
    const token = localStorage.getItem('token')
    //if (token) {

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
    
        dispatch({ type: FAVORITES_LOADING })
        
        axios.get("/api/favoriteLines/")
            .then(res => {
                const { id, lines } = res.data[0]
    
            dispatch({
                type: FAVORITES_LOADED,
                payload: {id: id, favorites: lines}
            })
            })
            .catch(err => {
            //  console.log(err)
                dispatch({
                    type: FAVORITES_LOADING_ERROR,
                })
            })
    //}
    
}