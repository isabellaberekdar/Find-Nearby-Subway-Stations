import React from 'react'
import StationDetail from '../StationDetail/StationDetail'
import Station from '../Station/Station'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setUserCoordinates,
    setNearbyStations, 
    setMarkers, 
    handleStationClick, 
    handleNearbyStationClick,
    setFilteredStations,
    setStationDetail,
    setNearbyStationDetail
} from '../../redux/actions/map'
import './NearbyStations.css'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class NearbyStations extends React.Component {
    componentDidMount() {
        
    const reset = { 
        name: 'unknown',
        coordinates: 'unknown', 
        trains: 'unknown',
        trains_string: 'unknown', 
        train_icons: 'unknown', 
        notes: 'unknown'
      }
      this.props.markers.clearLayers() 
  
      // clear map
      this.props.setFilteredStations([])
      this.props.setStationDetail(reset)
      this.props.setNearbyStationDetail(reset)
    }


    state = {
        showList: true
    }

    // determines if a subway station is near a based on user's and station's coordinates
    // Returns true if the station is close, otherwise returns false
    nearby = (position, lat_or_lon) => {
        return ((Math.abs(position - lat_or_lon)) < 0.011)
    }      

    setMap = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.findStations(position)
            })
        } else {
            console.log('Geolocation is not supported.')
        }
    }

    
    // Called when the button is pushed - user submits location
    findStations = location => {
        const lat = location.coords.latitude
        const lon = location.coords.longitude

        this.props.setUserCoordinates(lat, lon)

        L.circle([lat, lon], {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.8,
            radius: 25
        }).addTo(this.props.nearby_markers)  

/*         this.state.map.setView([lat, lon], 14.5)
 */        
        const nearby_stations = this.props.all_stations.filter(station => this.isNearby(station, lat, lon))
        // clear map, add nearby stations to layer group and place onto map
        this.addNearbyToMap(nearby_stations)
        this.props.setNearbyStations(nearby_stations)
    }

    addNearbyToMap = (nearby_stations) => {
        /* this.state.markers.clearLayers() */
        this.props.markers.clearLayers() 

        nearby_stations.forEach(station => {
            const name = station.name
            const lines = station.trains_list
            const notes = station.notes
            
            // add nearby station markers to nearby_markers layer group
            L.marker([station.coordinates[0], station.coordinates[1]])
                .bindPopup(`<b><h3></b>${name}<br>${lines}<br></h3>`)
                .openPopup()
                .addTo(this.props.nearby_markers)
        })
    }

    isNearby = (station, user_lat, user_lon) => {
        // extracts coordinates
        let coordinates = station.coordinates

        // converts coordinates into floats
        const subway_lat = coordinates[0]
        const subway_lon = coordinates[1]
        
        // if the station is close to the user, add the station to the map
        if (this.nearby(user_lat, subway_lat)  && this.nearby(user_lon, subway_lon)) {
            return true;
        }
        return false;
    }

    //show list of nearby stations and when one is clicked, show detail instead
    // with button on top to go back to the list
    showList = state => {
        this.setState({ showList: state })
    }

    
    click = station => {
        this.showList(false)
        this.props.handleNearbyStationClick(station)
    }
    render() {
        if (this.props.showButton) {
            return (
                <div className='ButtonContainer'>
                    <button className='NearbyStationsList' onClick={() => this.setMap()}>Submit location</button>
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.showList ?
                            (
                                <div className='NearbyStationsList'>
                                    {this.props.nearbyStations.map(station => 
                                        <Station 
                                            key={`${station.name} ${station.trains_list}`} 
                                            stationInfo={station} 
                                            serviceInfo={this.props.serviceInfo} 
                                            handleStationClick={() => this.click(station)}
                                        />
                                    )}
                                </div>
                            )
                        :   
                            (
                                <div className='DetailContainer'>
                                    <StationDetail 
                                        station={this.props.nearbyStationDetail}
                                        serviceInfo={this.props.serviceInfo}
                                        timeUpdated={this.props.timeUpdated}
                                        showDetail={this.props.nearbyStationDetail.name !== 'unknown'}
                                    />
                                    <div class='Back' onClick={() => this.showList(true)}>
                                        <i class="fas fa-arrow-alt-circle-left fa-2x"></i>
                                        <p>Back to list</p>
                                    </div>
                                </div>
                            )
                    }
                </div>
            )
        }
    }
}
 
NearbyStations.propTypes = {
  showButton: PropTypes.bool.isRequired,

} 

const mapStateToProps = state => ({
    markers: state.map.markers,
    nearby_markers: state.map.nearby_markers,
    detail_marker: state.map.detail_marker,
    all_stations: state.map.all_stations,
    nearbyStationDetail: state.map.nearby_station_detail
})
export default connect(mapStateToProps, { 
    setFilteredStations,
    setStationDetail,
    setNearbyStationDetail, 
    setUserCoordinates, 
    setNearbyStations, 
    setMarkers, 
    handleStationClick, 
    handleNearbyStationClick 
})(NearbyStations)
  
/* stationClick = () => {

    // set station detail to clicked station

    // remove all stations other than the current station detail from filtered_stations so that only detail is on map
    if (this.props.nearbyStationDetail.name !== 'unknown') {
        const { name, coordinates, trains_string, train_icons, notes } = this.props.nearbyStationDetail            
        this.props.setFilteredStations([this.props.nearbyStationDetail])
        
        // add station detail marker to the map
        L.marker([coordinates[0], coordinates[1]])
            .bindPopup(`<b><h3></b>${name}<br>${trains_string}<br></h3>`)
            .openPopup()
            .addTo(this.props.markers)
    }
} */