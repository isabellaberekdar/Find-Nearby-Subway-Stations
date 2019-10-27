import { 
  SET_STATIONS,
  SET_FILTERED_STATIONS,
  SET_NEARBY_STATIONS,
  SET_STATION_DETAIL,
  SET_NEARBY_STATION_DETAIL,
  SET_MARKERS,
  SET_NEARBY_MARKERS,
  SET_DETAIL_MARKER,
  SET_SERVICE_INFORMATION,
  SET_TIME_UPDATED,
  HANDLE_STATION_CLICK,
  SET_USER_COORDINATES,
  HANDLE_NEARBY_STATION_CLICK,
} from './types'

import processStation from '../../functions/ProcessStation'
//import serviceInfo from '../../service' 

// Fetches the list of all subway stations in NYC from NYC Open Data.
export const setAllStations = () => dispatch => {
  fetch('https://data.cityofnewyork.us/api/views/kk4q-3rt2/rows.json')
    .then(res => res.json())
    .then(json => {
      const stations = json.data.map(station => processStation(station))
      dispatch({
        type: SET_STATIONS,
        payload: stations
      })
  })
}


export const setServiceInformation = () => dispatch => {  
  const url = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'

  fetch(url)
  .then(res => res.json())
  .then(serviceInfo => {
    const filtered_service_info = serviceInfo.routeDetails.filter(element => element.mode === 'subway')
  
    const filtered_service_info_obj = {}
  
    filtered_service_info.forEach(station => {
      let station_name = station.route.toLowerCase()
  
      const status_details = station.statusDetails
      const in_service = station.inService
      if (station_name.length > 1 && station_name !== 'sir') {
        station_name = `${station_name[0]} express`
      }
  
      station = {
        route: station_name,
        statusDetails: status_details,
        in_service: in_service
      }
  
      filtered_service_info_obj[station_name] = station
  
    })
  
    // Get timestamp of when the status data was last updated
    let time_updated = serviceInfo.lastUpdated.split('T')[1]
    time_updated = time_updated.split('-')[0]
    time_updated = time_updated.split(':')
    
    // Assign AM or PM
    let time = ''
  
    if (time_updated[0] >= 12) {
      time = 'PM'
    } else {
      time = 'AM'
    }
  
    // Final timestamp
    time_updated = `${time_updated[0] % 12}:${time_updated[1]}:${time_updated[2]} ${time}`
    
    dispatch({
      type: SET_TIME_UPDATED,
      payload: time_updated
    })
  
    dispatch({
      type: SET_SERVICE_INFORMATION,
      payload: filtered_service_info_obj
    })
})

}
  

export const setFilteredStations = new_stations => dispatch => {  
  dispatch({
    type: SET_FILTERED_STATIONS,
    payload: new_stations
  })
}

export const setNearbyStations = new_stations => dispatch => {  
  dispatch({
    type: SET_NEARBY_STATIONS,
    payload: new_stations
  })
}

export const setStationDetail = detail => dispatch => {  
  dispatch({
    type: SET_STATION_DETAIL,
    payload: detail
  })
}

export const setNearbyStationDetail = detail => dispatch => {  
  dispatch({
    type: SET_NEARBY_STATION_DETAIL,
    payload: detail
  })
}

export const setMarkers = markers => dispatch => {  
  dispatch({
    type: SET_MARKERS,
    payload: markers
  })
}

export const setNearbyMarkers = markers => dispatch => {  
  dispatch({
    type: SET_NEARBY_MARKERS,
    payload: markers
  })
}

export const setDetailMarker = markers => dispatch => {  
  dispatch({
    type: SET_DETAIL_MARKER,
    payload: markers
  })
}

export const handleStationClick = station => dispatch => {
  dispatch({
    type: HANDLE_STATION_CLICK,
    payload: station
  })
}

export const handleNearbyStationClick = event => dispatch => {
  dispatch({
    type: HANDLE_NEARBY_STATION_CLICK,
    payload: event
  })
}

export const setUserCoordinates = (lat, lon) => dispatch => {
  dispatch({
    type: SET_USER_COORDINATES,
    payload: [lat, lon]
  })
}



