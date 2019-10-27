import React from 'react'
import StationsList from '../StationsList/StationsList'
import './StationSearch.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setFilteredStations, handleStationClick, setMarkers } from '../../redux/actions/map'

import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import blue_icon from 'leaflet/dist/images/marker-icon.png';
import icon from '../../icons/marker.png'

const marker = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    /* shadowSize:   [50, 64], */
    iconAnchor:   [12, 41],
    shadowAnchor: [12, 41],
	popupAnchor:  [-3, -76]
})

L.Marker.prototype.options.icon = marker;


const blue_marker = L.icon({
    iconUrl: blue_icon,
    shadowUrl: iconShadow
})
class StationSearch extends React.Component {
    // Dropdown will begin to show when the user is searching. It will close when the
    //    user clicks one of the items in the dropdown or clicks outside of the component.
    state = {
        showDropdown: false
    }
    
    toggleDropdown = value => {
        this.setState({
            show_dropdown: value
        })
    }

    handleSearch = query => {
        // keep all stations where the name of the station contains the search query
        const desired_station = query.target.value.toLowerCase();
        // show dropdown while searching
        this.toggleDropdown(true)
        this.props.markers.clearLayers()    /////////////////////////////////////////////

        // if the search is deleted, clear the list of stations in the search results
        if (desired_station === '') {
            this.props.setFilteredStations([])
            // remove dropdown
            this.toggleDropdown(false)
        } 
        
        // Get a list of all stations that include the search query within their names
        else {
            // Filter down list of all stations to stations that contain the search query in their names
            const filtered_stations = this.props.all_stations.filter(station => {
                const station_name = station.name.toLowerCase()
                return station_name.includes(desired_station)
            });
    
            this.props.setFilteredStations(filtered_stations)

            filtered_stations.forEach(station => {
                const name = station.name
                const lines = station.trains_list
                const notes = station.notes
            
                L.marker([station.coordinates[0], station.coordinates[1]])
                    .bindPopup(`<b><h3></b>${name}<br>${lines}<br></h3>`)
                    .openPopup()
                    .addTo(this.props.markers)
            })
            this.props.toggleMap('search')
        }

    }


    render() {
        return (
            <div className="Search">
                <div className="SearchBarContainer">
                    <i class="fas fa-search fa-2x"></i>
                    <input 
                        className='SearchBar'
                        placeholder="Search for a station" 
                        onChange={this.handleSearch}
                    />
                </div>
                <StationsList
                    stations={this.props.filtered_stations} 
                    serviceInfo={this.props.service_info} 
                    handleStationClick={this.props.handleStationClick}
                    showDropdown={this.state.show_dropdown}
                    toggleDropdown={this.toggleDropdown}
                    showDetailMarker={this.props.showDetailMarker}
                    toggleMap={this.props.toggleMap}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    all_stations: state.map.all_stations,
    filtered_stations: state.map.filtered_stations,
    service_info: state.map.service_info,
    markers: state.map.markers
})

export default connect(mapStateToProps, { setFilteredStations, handleStationClick, setMarkers })(StationSearch)