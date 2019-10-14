import React from 'react'
import Map from '../components/Map/Map'
import NearbyStations from '../components/NearbyStations/NearbyStations'
import { connect } from 'react-redux'
import StationDetail from '../components/StationDetail/StationDetail'
import StationSearch from '../components/StationSearch/StationSearch'
import { setAllStations, setServiceInformation, setFilteredStations } from '../redux/actions/map'
import { addFavorite, loadFavorites, getFavorites, deleteFavorite } from '../redux/actions/favorites'
import '../App.css'


class Index extends React.Component {

  state = {
    mode: 'search'
  }

  // new_mode should be a string: 'search' or 'nearby'
  toggleMode = new_mode => {
    if (this.state.mode !== new_mode) {
      this.setState({ mode: new_mode })
    }
    // clear map
    this.props.setFilteredStations([])
  }

  componentDidMount() {
    this.props.setAllStations()
    this.props.setServiceInformation()

    // If user is logged in, load thier favorite stations
    if (this.props.auth.isAuthenticated) {
      this.props.getFavorites()  
    }    
  }

  render() {
    console.log('NULL?',this.props.nearby)
    let components;
    if (this.state.mode === 'nearby') {
      components = (
        <NearbyStations 
          showButton={this.props.map.nearby_stations === null}
          nearbyStationDetail={this.props.map.nearby_station_detail}
          serviceInfo={this.props.map.service_information}
          timeUpdated={this.props.map.time_updated}
          nearbyStations={this.props.map.nearby_stations}
        />
      )
    } else {
      components = (
          <div>
            <StationSearch /> 
            <StationDetail 
              station={this.props.map.station_detail}
              serviceInfo={this.props.map.service_information}
              timeUpdated={this.props.map.time_updated}
            /> 
        </div>
      )
    }
    return (
      <div className='All'>
        <div className='Middle'>
          <div className='Left'>
            <Map 
              stations={this.props.map.filtered_stations} 
            /> 
          </div>
          <div className='Right'>
            <div className='Right-Search'>
              <div className='SwitchModes'>
                {this.state.mode === 'nearby' ?
                  (
                    <div className='SearchMode' onClick={() => this.toggleMode('search')}>
                      <p>Search for stations</p>
                    </div>
                  )
                :
                  (
                    <div className='NearbyMode' onClick={() => this.toggleMode('nearby')}>
                      <p>Find Nearby Stations</p>
                    </div>
                  )
                }
              </div>
              {components}
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    map: state.map,
    auth: state.auth,
    favorites: state.favorites,
  }
}

export default connect(mapStateToProps, { 
  setAllStations,
  setServiceInformation, 
  addFavorite, 
  deleteFavorite, 
  loadFavorites, 
  getFavorites ,
  setFilteredStations
})(Index)
  
