import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import blue_icon from 'leaflet/dist/images/marker-icon.png';
import icon from '../../icons/marker.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './Map.css'
import { connect } from 'react-redux'
import { setUserCoordinates, setNearbyStations, setMarkers } from '../../redux/actions/map'

const marker = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = marker;


const blue_marker = L.icon({
    iconUrl: blue_icon,
    shadowUrl: iconShadow
})


class Map extends React.Component {

    state = {
        map: null,
        markers: null
    }

    componentDidMount() {
        //const url = 'https://api.mapbox.com/styles/v1/isabellab3/ck0l5pzh40a141ep2fndl2knh.html?fresh=true&title=true&access_token=pk.eyJ1IjoiaXNhYmVsbGFiMyIsImEiOiJjanF6cDhtbzkwNWZsNGFveG5peXlveW5qIn0.cuWtbkoJwBfsoYRfKsnGcQ#9.0/37.785427/-122.168668/0'
        
        // Set up map and set view to times square
        this.setState({ map: L.map('map').setView([40.76, -73.98], 13),}, () => {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.light',
                    accessToken: 'pk.eyJ1IjoiaXNhYmVsbGFiMyIsImEiOiJjanF6cDhtbzkwNWZsNGFveG5peXlveW5qIn0.cuWtbkoJwBfsoYRfKsnGcQ'
            }).addTo(this.state.map)

            // Create a group for all of the markers that will be added to the map so they can all be cleared at once
            this.setState({ markers: L.layerGroup().addTo(this.state.map) });
            this.props.setMarkers(L.layerGroup().addTo(this.state.map))
        })

    }

    componentDidUpdate(prevProps) {
        // clear all markers from map, then add new marker group onto map
        //let markers = L.layerGroup().addTo(this.state.map);
        if (prevProps.markers !== this.state.markers && this.state.markers !== null) {                                              ///////////////////
            this.state.markers.clearLayers()
            this.props.markers.clearLayers() 

            // CHANGE IN PARENT COMPONENT -> STATIONS?
            this.props.stations.forEach(station => {
                L.marker([station.coordinates[0], station.coordinates[1]])
                    .bindPopup(`<b><h3></b>${station.name}<br>${station.trains_string}<br></h3>`)
                    .openPopup()
                    .addTo(this.props.markers)
            })
        }
    }


    // determines if a subway station is near a based on user's and station's coordinates
    // Returns true if the station is close, otherwise returns false
    nearby = (position, lat_or_lon) => {
        return ((Math.abs(position - lat_or_lon)) < 0.0089)
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
    findStations = async (location) => {
        const lat = 40.76
        const lon = -73.98

        this.props.setUserCoordinates(lat, lon)

        L.circle([lat, lon], {
            color: 'rgb(134, 194, 194)',
            fillColor: 'rgb(134, 194, 194)',
            fillOpacity: 0.8,
            radius: 25
        }).addTo(this.state.map)  

        this.state.map.setView([lat, lon], 14.5)
        const nearby_stations = this.props.stations.filter(station => this.isNearby(station, lat, lon))
        this.props.setNearbyStations(nearby_stations)
    }

    isNearby = (station, user_lat, user_lon) => {
        // extracts coordinates
        let coordinates = station.coordinates

        // converts coordinates into floats
        const subway_lon = parseFloat(coordinates[0])
        const subway_lat = parseFloat(coordinates[1])

        // if the station is close to the user, add the station to the map
        if (this.nearby(user_lat, subway_lat)  && this.nearby(user_lon, subway_lon)) {
            const name = station.name
            const lines = station.trains_list
            const notes = station.notes

            const marker = L.marker([subway_lat, subway_lon])
                .addTo(this.state.map)
                .bindPopup(`<b><h5></b>${name}<br>${lines}<br></h5><i>${notes}</i>`)
                .openPopup();
            return true;
        }

        return false;
    }

    render() {
        return (
            <div className='MapContainer'>
                <div id="map" className='Map'></div>
                <button id='location-button' onClick={() => this.setMap()}>Find Nearby Stations</button>
          </div>
        )
    }
}


const mapStateToProps = state => ({
    all_stations: state.map.all_stations,
    markers: state.map.markers,
    station_detail: state.map.station_detail
})

export default connect(mapStateToProps, { setUserCoordinates, setNearbyStations, setMarkers })(Map)