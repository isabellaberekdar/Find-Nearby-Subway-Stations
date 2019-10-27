import React from "react";
import "./Station.css";

const Station = props => {
    return (
        <div className='Station' onClick={props.handleStationClick}>
            <p>{`${props.stationInfo.name}`}</p>
            {props.stationInfo.train_icons}
        </div>
    );
};

export default Station;
