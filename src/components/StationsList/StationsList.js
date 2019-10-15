import React from 'react'
import Station from '../Station/Station'
import './StationsList.css'
import { connect } from 'react-redux'
import { setFilteredStations } from '../../redux/actions/map'
import PropTypes from 'prop-types'
import L from 'leaflet';
import yellow_icon from 'leaflet/dist/images/marker-icon.png';
import icon from '../../icons/marker.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
const marker = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = marker;


const yellow_marker = L.icon({
    iconUrl: yellow_icon,
    shadowUrl: iconShadow
})

class StationsList extends React.Component {

    componentDidMount() {
        // if outside of stationslist is clicked, or a station is clicked, close the dropdown
        document.addEventListener('click', () => this.stationClick(), false)

    }

    stationClick = () => {
        this.props.toggleDropdown(false)

        // remove all stations other than the current station detail from filtered_stations so that only detail is on map
        if (this.props.station_detail.name !== 'unknown') {
            const { name, coordinates, trains_string, train_icons, notes } = this.props.station_detail
            this.props.setFilteredStations([this.props.station_detail])
            
            // add station detail marker to the map
                if (this.props.station_detail.name !== 'unknown') {
                    console.log('adding detail')
                    //this.props.markers.clearLayers()
                    /* this.props.detail_marker.clearLayers()
                    L.marker([coordinates[0], coordinates[1]])
                        .bindPopup(`<b><h3></b>${name}<br>${trains_string}<br></h3>`)
                        .openPopup()
                        .addTo(this.props.detail_marker) */
                }
                //show detail on map
                /* this.props.toggleMap('detail') */
            
            /* 
            const detail = L.marker([coordinates[0], coordinates[1]], {icon: yellow_marker})
                .bindPopup(`<b><h3></b>${name}<br>${trains_string}<br></h3>`)
                .openPopup()
                .addTo(this.props.markers)

 */
            //this.props.markers.clearLayers()
        }
    }

    componentWillUnmount() {
        // remove event listener     
        document.removeEventListener('click', () => this.props.toggleDropdown(false), false)
    }

    render() {
        if (this.props.showDropdown) {
            return (
                <div className='StationsList'>
                    {this.props.stations.map(station => 
                        <Station 
                            key={station} 
                            stationInfo={station} 
                            serviceInfo={this.props.serviceInfo} 
                            handleStationClick={() => this.props.handleStationClick(station)}
                        />
                    )}
                </div>
            )
        } 
        else 
            return null
    }
}

const mapStateToProps = state => ({
    filtered_stations: state.map.filtered_stations,
    markers: state.map.markers,
    station_detail: state.map.station_detail,
    detail_marker: state.map.detail_marker
})

export default connect(mapStateToProps, { setFilteredStations })(StationsList)