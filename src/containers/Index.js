import React from 'react'
import Map from '../components/Map/Map'
import { connect } from 'react-redux'
import StationDetail from '../components/StationDetail/StationDetail'
import StationSearch from '../components/StationSearch/StationSearch'
import { setAllStations, setServiceInformation } from '../redux/actions/map'
import { addFavorite, loadFavorites, getFavorites, deleteFavorite } from '../redux/actions/favorites'
import '../App.css'



class Index extends React.Component {

  componentDidMount() {
    this.props.setAllStations()
    this.props.setServiceInformation()
    //this.props.getFavorites()  //vhanged from loadfavorites

    // If user is logged in, load thier favorite stations
    if (this.props.auth.isAuthenticated) {
      this.props.getFavorites()  //vhanged from loadfavorites
      console.log('called getfavorites in INDEX.JS', this.props.favorites)
    }
    

  }

  render() {
    const a = 1
    const b = 2

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
              <StationSearch />

              <StationDetail 
                station={this.props.map.station_detail}
                serviceInfo={this.props.map.service_information}
                timeUpdated={this.props.map.time_updated}
              />
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
    favorites: state.favorites
  }
}

export default connect(mapStateToProps, { setAllStations, setServiceInformation, addFavorite, deleteFavorite, loadFavorites, getFavorites })(Index)
  
