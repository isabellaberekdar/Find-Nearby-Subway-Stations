import React from "react";
import "./Status.css";
import PropTypes from "prop-types";
import { getIcon } from "../../functions/SubwayIcon";
import { get_id } from "../../functions/getId";
import LineStatus from "./LineStatus";

const Status = props => {
    return (
        <div className='Service'>
            {props.linesList.map(line => (
                <LineStatus
                    icon={getIcon(line)}
                    class={
                        props.favorites.includes(get_id[line].id)
                            ? "fas fa-star fa-2x"
                            : "far fa-star fa-2x"
                    }
                    statusDetails={props.serviceInfo[line].statusDetails}
                    AddOrDeleteFavorite={
                        props.favorites.includes(get_id[line].id)
                            ? props.deleteFavorite
                            : props.addFavorite
                    }
                    AddOrDelete={props.favorites.includes(get_id[line].id) ? "Delete" : "Add"}
                    line={line}
                    popupHeight={props.popupHeight}
                />
            ))}
        </div>
    );
};

Status.propTypes = {
    linesList: PropTypes.array.isRequired,
    serviceInfo: PropTypes.array.isRequired,
    addFavorite: PropTypes.func.isRequired,
    deleteFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired,
    popupHeight: PropTypes.object
};

export default Status;

/* 
    return (
        <div className='Service'>
          {props.linesList.map(line => (
            <div className='ServiceInfo'>
              {props.favorites.includes(get_id[line].id) ? 
                  <div onClick={() => props.deleteFavorite(line)}>
                      <i class="fas fa-heart" onClick={() => props.deleteFavorite(line)}></i>
                  </div>
                :
                  <div onClick={() => props.addFavorite(line)}>
                      <i class="far fa-heart" onClick={() => props.addFavorite(line)}></i>
                  </div>
              }
              {getIcon(line)}
              {props.serviceInfo[line].statusDetails ? 
                      <h3 style={{'color':'rgb(255, 73, 73)'}}>PLANNED WORK</h3> 
                  : 
                      <h3 style={{'color':'rgb(94, 187, 148)'}}>GOOD SERVICE</h3>
              }
              
            </div>
          ))
        }
      </div>
  )
}
/* <div dangerouslySetInnerHTML={{ __html: a }} /> */
/* redirect to page with more information, or open information up on page */
