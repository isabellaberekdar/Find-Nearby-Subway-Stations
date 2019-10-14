import React from 'react'
import './StationDetail.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addFavorite, deleteFavorite } from '../../redux/actions/favorites'
import Status from '../Status/Status'


const StationDetail = props => {
  let showDetail = false;
  if (props.station.trains !== 'unknown') {
    showDetail = true;
  }
    if (showDetail) {
      return (
    <div className='stationDetail'>
        <div className='StationName'>
          <h1>{props.station.name}</h1>
        </div>
        <div className='DetailLineList'>
          {props.station.train_icons}
        </div>
          {props.station.trains}
        
        <p>{props.station.notes}</p>
        {props.isAuthenticated ?
          null
        : 
          (<h5>Log in to add any subway line to your favorites for quick access to service information.</h5>)
        }
        
        <div className='LineService'>
          <h2>Line Service:</h2>
          <Status 
            linesList={props.station.trains_list} 
            serviceInfo={props.serviceInfo} 
            addFavorite={props.addFavorite}
            deleteFavorite={props.deleteFavorite}
            favorites={props.favorites}
          />
        </div>

        <p>{`Updated at ${props.timeUpdated}`}</p>
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
/* 
StationDetail.propTypes = {
  station: PropTypes.object.isRequired,
  serviceInfo: PropTypes.array.isRequired,
  timeUpdated: PropTypes.string.isRequired
} */

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  favorites: state.favorites.favorites
})

export default connect(mapStateToProps, { addFavorite, deleteFavorite })(StationDetail)
