import React from 'react'
import StationsList from '../StationsList/StationsList'
import Station from '../Station/Station'

import './StationSearch.css'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setFilteredStations, handleStationClick } from '../../redux/actions/map'

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
        }

    }

    render() {
        return (
            <div className="Search">
                <div className="SearchBarContainer">
                    <i class="fas fa-search fa-2x" style={{"color":"gray"}}></i>
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
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    all_stations: state.map.all_stations,
    filtered_stations: state.map.filtered_stations,
    service_info: state.map.service_info
})

export default connect(mapStateToProps, { setFilteredStations, handleStationClick })(StationSearch)