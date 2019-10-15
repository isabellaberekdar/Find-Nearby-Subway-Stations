import React from 'react';
import './Map.css'
import { connect } from 'react-redux'
import { setUserCoordinates, setNearbyStations, setMarkers, setDetailMarker, setNearbyMarkers } from '../../redux/actions/map'

import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import blue_icon from 'leaflet/dist/images/marker-icon.png';
import icon from '../../icons/marker.png'
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
        // Set up map and set view to times square
        this.setState({ map: L.map('map').setView([40.76, -73.98], 13),}, () => {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.light',
                    accessToken: 'pk.eyJ1IjoiaXNhYmVsbGFiMyIsImEiOiJjanF6cDhtbzkwNWZsNGFveG5peXlveW5qIn0.cuWtbkoJwBfsoYRfKsnGcQ'
            }).addTo(this.state.map)

            // Create groups for each group of markers that will be added to the map so they can all be cleared at once
            this.setState({ markers: L.layerGroup().addTo(this.state.map) });
            this.props.setNearbyMarkers(L.layerGroup().addTo(this.state.map))
            this.props.setDetailMarker(L.layerGroup().addTo(this.state.map))
            this.props.setMarkers(L.layerGroup().addTo(this.state.map))
        })

    }

    componentDidUpdate() {
        // switched to nearby stations view
        if (this.props.show === 'nearby'/*  && this.state.map.hasLayer(this.props.markers) */) { 
            console.log('SHOW NEARBY')
            this.props.markers.remove()

            this.props.detail_marker.clearLayers()            
            
            this.props.detail_marker.remove()
            //this.state.map.removeLayer(this.props.markers)
            this.state.map.addLayer(this.props.nearby_markers)
        }

        // switched to station search view
        else if (this.props.show === 'search') {/*  && this.state.map.hasLayer(this.props.nearby_markers)) { */
            if (this.state.map.hasLayer(this.props.nearby_markers)) {
                this.props.nearby_markers.remove()
            }
            if (this.state.map.hasLayer(this.props.detail_marker)) {
                this.props.detail_marker.remove()
            }         
            if (this.props.detail_marker) {
                this.props.detail_marker.clearLayers()            
            }

            console.log('SEARCH')
            //this.props.detail_marker.remove()
            if (this.state.markers) {
                this.state.map.addLayer(this.props.markers)
            }
            //this.state.map.addLayer(this.props.detail_marker)

        }

        // show only detail marker on map
        else if (this.props.show === 'detail') {
            console.log('DETAIL VIEW')
            this.props.detail_marker.clearLayers()            

            L.marker(this.props.station_detail.coordinates)
                .bindPopup(`<b><h3></b>${this.props.station_detail.name}<br>${this.props.station_detail.trains_string}<br></h3>`)
                .openPopup()
                .addTo(this.props.detail_marker)
            
            //this.props.nearby_markers.remove()
            this.props.markers.remove()
            this.state.map.addLayer(this.props.detail_marker)
        }


    }


    render() {
        return (
            <div className='MapContainer'>
                <div id="map" className='Map'></div>
          </div>
        )
    }
}


const mapStateToProps = state => ({
    all_stations: state.map.all_stations,
    filtered_stations: state.map.filtered_stations,
    markers: state.map.markers,
    nearby_markers: state.map.nearby_markers,
    detail_marker: state.map.detail_marker,
    station_detail: state.map.station_detail
})

export default connect(mapStateToProps, { setUserCoordinates, setNearbyStations, setMarkers, setDetailMarker, setNearbyMarkers })(Map)


    // determines if a subway station is near a based on user's and station's coordinates
    // Returns true if the station is close, otherwise returns false
/*     nearby = (position, lat_or_lon) => {
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
    } */

    
    // Called when the button is pushed - user submits location
 /*    findStations = location => {
        const lat = location.coords.latitude
        const lon = location.coords.longitude

        this.props.setUserCoordinates(lat, lon)

        L.circle([lat, lon], {
            color: 'rgb(134, 194, 194)',
            fillColor: 'rgb(134, 194, 194)',
            fillOpacity: 0.8,
            radius: 25
        }).addTo(this.state.map)  

        this.state.map.setView([lat, lon], 14.5)
        
        const nearby_stations = this.props.all_stations.filter(station => this.isNearby(station, lat, lon))
        // clear map, add nearby stations to layer group and place onto map
        this.addNearbyToMap(nearby_stations)
        this.props.setNearbyStations(nearby_stations)
    } */
/* 
    addNearbyToMap = (nearby_stations) => {
        /* this.state.markers.clearLayers() */
      /*   this.props.markers.clearLayers() 

        nearby_stations.forEach(station => {
            const name = station.name
            const lines = station.trains_list
            const notes = station.notes
            
            L.marker([station.coordinates[0], station.coordinates[1]])
                .bindPopup(`<b><h3></b>${name}<br>${lines}<br></h3>`)
                .openPopup()
                .addTo(this.props.markers)
           /*  const marker = L.marker([subway_lat, subway_lon])
                .addTo(this.state.map)
                .bindPopup(`<b><h5></b>${name}<br>${lines}<br></h5><i>${notes}</i>`)
                .openPopup(); */
 //       })
   // }
/* 
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
 */