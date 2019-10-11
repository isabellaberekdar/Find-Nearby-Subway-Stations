import { 
  SET_STATIONS,
  SET_FILTERED_STATIONS,
  SET_NEARBY_STATIONS,
  SET_STATION_DETAIL,
  SET_MARKERS,
  SET_SERVICE_INFORMATION,
  SET_TIME_UPDATED,
  HANDLE_STATION_CLICK,
  SET_USER_COORDINATES
} from './types'

import processStation from '../../functions/ProcessStation'
import serviceInfo from '../../service' 

// Fetches the list of all subway stations in NYC from NYC Open Data.
export const setAllStations = () => dispatch => {  
  const url = 'https://data.cityofnewyork.us/api/views/kk4q-3rt2/rows.json'
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
export const setMarkers = markers => dispatch => {  
  dispatch({
    type: SET_MARKERS,
    payload: markers
  })
}


export const handleStationClick = event => dispatch => {
  dispatch({
    type: HANDLE_STATION_CLICK,
    payload: event
  })
}

export const setUserCoordinates = (lat, lon) => dispatch => {
  dispatch({
    type: SET_USER_COORDINATES,
    payload: [lat, lon]
  })
}



/* 
export const setTimeUpdated = time_updated => dispatch => {  
  dispatch({
    type: SET_TIME_UPDATED,
    payload: time_updated
  })
} */


/* 

fetchService = async () => {
  // Get information about subway stations
  //const service_info = await fetch('https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP')
  //const data = await service_info.json()
  //const last_updated = data.lastUpdated
  //const {routeDetails} = data
  //console.log('!!!', routeDetails)
  const filtered_service_info = serviceInfo.routeDetails.filter(element => element.mode === 'subway')

  // convert service info into a js object
  const filtered_service_info_obj = {}

  filtered_service_info.forEach(station => {
    let station_name = station.route.toLowerCase()
    const status_details = station.statusDetails
    if (station_name.length > 1 && station_name !== 'sir') {
      station_name = `${station_name[0]} Express`
    }

    station = {
      route: station_name,
      status: status_details
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

  this.setState({
    serviceInfo: filtered_service_info_obj, 
    timeUpdated: time_updated
  })

}


 */






/* 
export const setServiceInformation = service_information => dispatch => {  
  dispatch({
    type: SET_SERVICE_INFORMATION,
    payload: service_information
  })
}

export const setTimeUpdated = time_updated => dispatch => {  
  dispatch({
    type: SET_TIME_UPDATED,
    payload: time_updated
  })
}

 */




