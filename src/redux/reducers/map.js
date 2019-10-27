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
    HANDLE_NEARBY_STATION_CLICK,
    SET_USER_COORDINATES
} from "../actions/types";

const initialState = {
    all_stations: null, // all stations in the city
    filtered_stations: [], // stations filtered by user's search
    nearby_stations: null, // stations near the user
    station_detail: {
        // the station that is currently being displayed in the station detail box
        name: "unknown",
        coordinates: "unknown",
        trains: "unknown",
        trains_string: "unknown",
        train_icons: "unknown",
        notes: "unknown"
    },
    nearby_station_detail: {
        // the station that is currently being displayed in the nearby stations detail box
        name: "unknown",
        coordinates: "unknown",
        trains: "unknown",
        trains_string: "unknown",
        train_icons: "unknown",
        notes: "unknown"
    },
    markers: null, // the group of markers currently being displayed on the map
    detail_marker: null,
    nearby_markers: null,

    service_information: null, // information about current subway service
    time_updated: null, // timestamp of when the subway service information was updated by the mta
    user_coordinates: null // the user's coordinates, given when they push the button
};

const subwayReducer = (state = initialState, action) => {
    switch (action.type) {
        // Sets the array which contains information about every station in the city.
        case SET_STATIONS:
            return {
                ...state,
                all_stations: action.payload
            };

        case SET_FILTERED_STATIONS:
            return {
                ...state,
                filtered_stations: action.payload
            };

        case SET_NEARBY_STATIONS:
            return {
                ...state,
                nearby_stations: action.payload
            };

        case SET_NEARBY_STATION_DETAIL:
            return {
                ...state,
                nearby_station_detail: action.payload
            };

        case SET_STATION_DETAIL:
            return {
                ...state,
                station_detail: action.payload
            };

        case SET_MARKERS:
            return {
                ...state,
                markers: action.payload
            };

        case SET_DETAIL_MARKER:
            return {
                ...state,
                detail_marker: action.payload
            };

        case SET_NEARBY_MARKERS:
            return {
                ...state,
                nearby_markers: action.payload
            };

        case SET_SERVICE_INFORMATION:
            return {
                ...state,
                service_information: action.payload
            };

        case SET_TIME_UPDATED:
            return {
                ...state,
                time_updated: action.payload
            };

        case HANDLE_STATION_CLICK:
            return {
                ...state,
                station_detail: action.payload
            };

        case HANDLE_NEARBY_STATION_CLICK:
            return {
                ...state,
                nearby_station_detail: action.payload
            };

        case SET_USER_COORDINATES:
            return {
                ...state,
                user_coordinates: action.payload
            };
        default:
            return state;
    }
};

export default subwayReducer;
