import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addFavorite, deleteFavorite } from '../../redux/actions/favorites'
import { setFilteredStations } from '../../redux/actions/map'
import Status from '../Status/Status'
import './StationDetail.css'


class StationDetail extends React.Component {
  render() {
    if (this.props.showDetail) {
      if (this.props.toggleMap) {
        this.props.toggleMap('detail')
      }
        
      return (
      <div className='stationDetail'>
        <div className='StationName'>
          <h1><mark>{this.props.station.name}</mark></h1>
          {this.props.station.trains}
        </div>
        <div className='DetailLineList'>
        </div>
          
          <p>{this.props.station.notes}</p>
          {this.props.isAuthenticated ?
             null
            : 
              (<h5>Log in to add any subway line to your favorites for quick access to service information.</h5>)
          }
          
          <div className='LineService'>
            <h2><mark>Line Service:</mark></h2>
            <p>{`Updated at ${this.props.timeUpdated}`}</p>
            <Status 
              linesList={this.props.station.trains_list} 
              serviceInfo={this.props.serviceInfo} 
              addFavorite={this.props.addFavorite}
              deleteFavorite={this.props.deleteFavorite}
              favorites={this.props.favorites}

            />
      

    
            
          </div>

      </div>
    )} 
    else {
      return (
        <div className='stationDetail'>
          <p>Click the button to locate stations near you, or search for any station.</p>
        </div>
      )
    }
  }
  }

const mapStateToProps= state => ({
  isAuthenticated: state.auth.isAuthenticated,
  favorites: state.favorites.favorites,
  markers: state.map.markers
})

export default connect(mapStateToProps, { addFavorite, deleteFavorite, setFilteredStations })(StationDetail)
