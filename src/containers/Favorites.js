import React from 'react'
import FavoritesStatus from '../components/FavoritesStatus/FavoritesStatus'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addFavorite, deleteFavorite } from '../redux/actions/favorites'
import './Favorites.css'
import { getIcon, AssignIcons } from '../functions/SubwayIcon'
import { get_train, get_id } from '../functions/getId'

class Favorites extends React.Component {
    
    render() {
        // If not logged in, redirect to homepage
         if (!this.props.isAuthenticated) {
            return <Redirect to='/' />
        } 

        const lines = this.props.favorites.map(line => get_train[line].name)

        return (
          <div className='FavoritesContainer'>
              <div className='Favorites'>
                <h1>Favorite Lines</h1>
                  {this.props.favorites.length === 0 ?
                    (<p>You haven't favorited any lines yet. Search for a station on the homepage or find stations near you to add some.</p>)
                :
                  lines.map(line => (
                    <FavoritesStatus 
                      icon={getIcon(line)}
                      class={this.props.favorites.includes(get_id[line].id) ? "far fa-times-circle fa-2x" : "fas fa-times-circle fa-2x"}
                      statusDetails={this.props.serviceInfo[line].statusDetails}
                      AddOrDeleteFavorite={this.props.favorites.includes(get_id[line].id) ? this.props.deleteFavorite : this.props.addFavorite}
                      AddOrDelete={this.props.favorites.includes(get_id[line].id) ? 'Delete' : 'Add'}
                      line={line}
                    />
                  ))
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
