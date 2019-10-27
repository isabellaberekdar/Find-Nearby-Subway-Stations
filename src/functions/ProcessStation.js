import { AssignIcons } from "../functions/SubwayIcon";

const processStation = station => {
    // get coordinates:
    // extracts coordinates
    let coordinates = station[11].slice(7, -1);
    coordinates = coordinates.split(" ");

    // converts coordinates into floats
    const lat = parseFloat(coordinates[1]);
    const lon = parseFloat(coordinates[0]);

    // converts list of trains from a string to an array
    let trains_list = station[12].split("-");
    const train_icons = AssignIcons(trains_list);
    trains_list = trains_list.map(train => train.toLowerCase());

    const trains = station[12].replace(/-/g, ", ");

    // add icons for each station

    return {
        name: station[10], // name of station
        coordinates: [lat, lon], // coordinates of station
        trains_string: trains, // string of trains
        trains_list: trains_list, // array of trains
        train_icons: train_icons, // icons for each line at station
        notes: station[13] // notes for station
    };
};

export default processStation;
