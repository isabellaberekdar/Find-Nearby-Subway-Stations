import React from 'react'
import Map from '../components/Map/Map'
import NearbyStations from '../components/NearbyStations/NearbyStations'
import { connect } from 'react-redux'
import StationDetail from '../components/StationDetail/StationDetail'
import StationSearch from '../components/StationSearch/StationSearch'
import { setAllStations, setServiceInformation, setFilteredStations, setStationDetail, setNearbyStationDetail } from '../redux/actions/map'
import { addFavorite, loadFavorites, getFavorites, deleteFavorite } from '../redux/actions/favorites'
import '../App.css'


class Index extends React.Component {

  state = {
    mode: 'search',  // modes: 'nearby', 'search'
    mapView: 'search' // what to show on the map. 'search', 'nearby', or 'detail'
  }

  toggleMapView = new_view => {
    this.setState({ mapView: new_view })

    // switching view: clear all layers off of map
/*     this.props.map.markers.remove()
    this.props.map.detail_marker.remove()
    this.props.map.nearby_markers.remove() */
    
    // added back



  }

  // new_mode should be a string: 'search' or 'nearby'
  toggleMode = new_mode => {
    this.toggleMapView(new_mode)
    this.setState({ mode: new_mode })

    const reset = { 
      name: 'unknown',
      coordinates: 'unknown', 
      trains: 'unknown',
      trains_string: 'unknown', 
      train_icons: 'unknown', 
      notes: 'unknown'
    }
    this.props.setNearbyStationDetail(reset)

    /* 
   
    this.props.map.markers.clearLayers() 

    // clear map
    this.props.setFilteredStations([])
    this.props.setStationDetail(reset)
    this.props.setNearbyStationDetail(reset)
    if (this.state.mode !== new_mode) {
      this.setState({ mode: new_mode }, () => {
        if (this.state.mode === 'nearby' && this.props.map.nearby_stations !== null) {
          this.props.setFilteredStations([this.props.map.nearby_stations])
        }
      })
    } */
  }

  componentDidMount() {
    this.props.setAllStations()
    this.props.setServiceInformation()

    // If user is logged in, load their favorite stations
    if (this.props.auth.isAuthenticated) {
      this.props.getFavorites()  
    } 
  }

  render() {
    let components;
    if (this.state.mode === 'nearby') {
      components = (
        <NearbyStations 
          showButton={this.props.map.nearby_stations === null}
         /*  nearbyStationDetail={this.props.map.nearby_station_detail} */
          serviceInfo={this.props.map.service_information}
          timeUpdated={this.props.map.time_updated}
          nearbyStations={this.props.map.nearby_stations}
          toggleMap={this.toggleMapView}

        />
      )
    } else {
        components = (
            <div>
              <StationSearch 
                showDetailMarker={this.state.mode === 'search'}
                toggleMap={this.toggleMapView}
              /> 
              <StationDetail 
                station={this.props.map.station_detail}
                serviceInfo={this.props.map.service_information}
                timeUpdated={this.props.map.time_updated}
                showDetail={this.props.map.station_detail.name !== 'unknown'}
                toggleMap={this.toggleMapView}
              /> 
          </div>
        )
    }
    return (
      <div className='All'>
        <div className='Middle'>
          <div className='Left'>
            <Map 
              layerGroup={this.state.mode === 'nearby' ? this.props.map.nearby_markers : this.props.map.markers}
              show={this.state.mapView}

            /> 

          </div>
          <div className='Right'>
            <div className='Right-Search'>
              <div className='SwitchModes'>
                {this.state.mode === 'nearby' ?
                  (
                    <button className='ChangeMode' onClick={() => this.toggleMode('search')}>Search for stations</button>
                  )
                :
                  (
                    <button className='ChangeMode' onClick={() => this.toggleMode('nearby')}>Find nearby stations</button>
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
  setFilteredStations,
  setStationDetail,
  setNearbyStationDetail
})(Index)
  
