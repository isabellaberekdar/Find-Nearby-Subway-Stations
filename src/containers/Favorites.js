import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../redux/actions/auth'
import { addFavorite, deleteFavorite } from '../redux/actions/favorites'
import './Favorites.css'
import { getIcon, AssignIcons } from '../functions/SubwayIcon'
import { get_train } from '../functions/getId'

class Favorites extends React.Component {
    
    render() {
        // If not logged in, redirect to homepage
         if (!this.props.isAuthenticated) {
            return <Redirect to='/' />
        } 

        return (
          <div className='FavoritesContainer'>
              <div className='Favorites'>
                <h1>Your Favorite Lines</h1>
                {this.props.favorites.length === 0 ?
                    (<p>You haven't favorited any lines yet. Search for a station on the homepage or find stations near you to add some.</p>)
                :
                this.props.favorites.map(line => {
                  const line_name = get_train[line].name
                  const line_status = this.props.serviceInfo[line_name].statusDetails
                  console.log(typeof line_name, line_name)
                  if (line_status !== undefined) {
                    return (
                      <div className='ServiceInfo'>
                        { getIcon(line_name) }
                        <h3 style={{'color':'rgb(255, 73, 73)'}}>PLANNED WORK</h3>                
                      </div>
                    )
                  }
                  else {
                    return (
                      <div className='ServiceInfo'>
                        { getIcon(line_name)}
                        <h3 style={{'color':'rgb(94, 187, 148)'}}>GOOD SERVICE</h3>               
                      </div>
                    )
                  }
                })
              }
              </div>
            </div>
        )  
    }
}
/* 
<p>{this.props.serviceInfo[line_name].statusDetails ? 
  <h3 style={{'color':'rgb(255, 73, 73)'}}>PLANNED WORK</h3> 
  : 
  <h3 style={{'color':'rgb(94, 187, 148)'}}>GOOD SERVICE</h3>
}</p>   
 */
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    id: state.favorites.id,
    favorites: state.favorites.favorites,
    serviceInfo: state.map.service_information
})
 
export default connect(mapStateToProps, { addFavorite, deleteFavorite })(Favorites)