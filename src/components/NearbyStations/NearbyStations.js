import React from 'react'
import StationDetail from '../StationDetail/StationDetail'
import Station from '../Station/Station'

import PropTypes from 'prop-types'

import L from 'leaflet';
import yellow_icon from 'leaflet/dist/images/marker-icon.png';
import icon from '../../icons/marker.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

class NearbyStations extends React.Component {
    state = {
        showList: true
    }

    //show list of nearby stations and when one is clicked, show detail instead
    // with button on top to go back to the list
    showList = state => {
        this.setState({ showList: state })
    }

    stationClick = () => {
        this.props.showList(false)

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
    }

    render() {
        if (this.props.showButton) {
            return (
                <button>Submit location</button>
            )
        } else {
            return (
                <div>
                    {this.state.showList ?
                            (
                                <div className='StationsList'>
                                    {this.props.nearbyStations.map(station => 
                                        <Station 
                                            key={station} 
                                            stationInfo={station} 
                                            serviceInfo={this.props.serviceInfo} 
                                            handleStationClick={() => this.props.handleStationClick(station)}
                                        />
                                    )}
                                </div>
                            )
                        :   
                            (
                                <div>
                                    <div onClick={() => this.showList(false)}>
                                        <p>Back to list</p>
                                    </div>
                                    <StationDetail 
                                        station={this.props.nearbyStationDetail}
                                        serviceInfo={this.props.serviceInfo}
                                        timeUpdated={this.props.map.time_updated}
                                    />
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
  //markers
  //nearbyStationDetail:
  //serviceInfo
  //
  //find_stations = PropTypes.func.isRequired
} 


export default NearbyStations
  
