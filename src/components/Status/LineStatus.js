import React from 'react'
import PropTypes from 'prop-types'
import './Status.css'
/* 
  
*/
class LineStatus extends React.Component {

    constructor(props) {
        super(props)

        let hoverClass;
        if (this.props.class === 'fas fa-star fa-2x') {
            hoverClass = 'far fa-star fa-2x'
        } else {
            hoverClass = 'fas fa-star fa-2x'
        }
 
        this.state = {
            hover: false,
            hoverClass: hoverClass
        }
    }

    toggleHover = () => {
        this.setState({ hover: !this.state.hover })
    }

    render() {
        let lineStatus = {};
        return (
            <div className='LineStatus'
                onClick={() => this.props.AddOrDeleteFavorite(this.props.line)}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
            >
                {this.state.hover ? 
                        (
                            <i className={this.state.hoverClass} style={{"color":"gold",}}></i>
                        )
                    :
                        (
                            <i className={this.props.class} style={{"color":"gold",}}></i>
                        )
                }
                {this.state.hover && this.props.statusDetails ? 
                    (
                        <div className='LineStatusDetail'>
{/*                             {this.props.statusDetails.map(status => <div dangerouslySetInnerHTML={{ __html: status.statusDescription }} />)}
 */}                            {/* Filter out duplicate status updates */
                                this.props.statusDetails.forEach(status => {
                                    lineStatus[status.statusSummary] = (<div dangerouslySetInnerHTML={{ __html: status.statusDescription }} />)
                                })
                            }
                            {Object.keys(lineStatus).map(key => 
                               lineStatus[key]
                            )}
                         </div>
                      
                    )
                :
                    null
            }

                {this.props.icon}
                {this.props.statusDetails ? 
                        <h3 style={{'color':'rgb(255, 73, 73)'}}>{`${this.props.statusDetails[0].statusSummary}`}</h3> 
                    : 
                        <h3 style={{'color':'rgb(94, 187, 148)'}}>Good Service</h3>
                }
                
                </div>

)
}
}

export default LineStatus
/* {this.state.hover && this.props.statusDetails ? this.props.toggleLine(this.props.statusDetails) : this.props.toggleLine([])} */

/* <div dangerouslySetInnerHTML={{ __html: a }} /> */
/* redirect to page with more information, or open information up on page */
/* 

  {/* <div className='LineStatusDetail'>
                            {this.props.statusDetails.map(status => (
                                <div dangerouslySetInnerHTML={{ __html: status.statusDescription }} />
                            ))}
                            <h1>MORE STATUS INFO</h1>
                        </div> */
/*

{this.props.favorites.includes(get_id[line].id) ? 
  <div onClick={() => this.props.deleteFavorite(line)}>
      <i class="fas fa-heart" onClick={() => this.props.deleteFavorite(line)}></i>
  </div>
:
  <div onClick={() => this.props.addFavorite(line)}>
      <i class="far fa-heart" onClick={() => this.props.addFavorite(line)}></i>
  </div>
}
*/