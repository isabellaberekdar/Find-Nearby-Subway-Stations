import React from 'react'
import './Status.css'
import PropTypes from 'prop-types'
import { getIcon } from '../../functions/SubwayIcon'
import {get_id} from '../../functions/getId'

const Status = props => {

    const handleClick = line_id => {
        console.log(line_id, typeof line_id)
        console.log(props.favorites)
        console.log(props.favorites.includes(line_id))
    }

    return (
        <div className='Service'>
          {/* <div dangerouslySetInnerHTML={{ __html: a }} /> */}
            {props.linesList.map(line => (
              <div className='ServiceInfo'>
                {/* redirect to page with more information, or open information up on page */}
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

Status.propTypes = {
  linesList: PropTypes.array.isRequired,
  serviceInfo: PropTypes.array.isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
} 

export default Status
{/* <div onClick={() => props.deleteFavorite(line)}>
<i class="fas fa-heart"></i>
</div>
:
<div onClick={() => props.addFavorite(line)}>
<i class="far fa-heart"></i>
</div>
 */}