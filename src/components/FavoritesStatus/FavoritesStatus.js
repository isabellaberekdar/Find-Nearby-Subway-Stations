import React from 'react'
import PropTypes from 'prop-types'
import './FavoritesStatus.css'
/* 
  
*/
class FavoritesStatus extends React.Component {

    constructor(props) {
        super(props)

        let hoverClass;
        if (this.props.class === 'fas fa-times-circle fa-2x') {
            hoverClass = 'far fa-times-circle fa-2x'
        } else {
            hoverClass = 'fas fa-times-circle fa-2x'
        }
 
        this.state = {
            hover: false,
            hoverClass: hoverClass
        }
    }


    toggleHover = () => {
        console.log('hovering')
        this.setState({ hover: !this.state.hover })
    }

    render() {
        let lineStatus = {}
        return (
            
            <div className='FavoritesStatus'>
                <div 
                    onClick={() => this.props.AddOrDeleteFavorite(this.props.line)}
                    onMouseEnter={this.toggleHover}
                    onMouseLeave={this.toggleHover}
                >
                     {this.state.hover ? 
                            <i className={this.state.hoverClass} style={{"color":"red",}}></i>
                        :
                            <i className={this.props.class} style={{"color":"red",}}></i>
                    }

 
                    {this.props.icon}
                    {this.props.statusDetails ? 
                            <h3 style={{'color':'rgb(255, 73, 73)'}}>PLANNED WORK</h3> 
                        : 
                            <h3 style={{'color':'rgb(94, 187, 148)'}}>GOOD SERVICE</h3>
                    }

                    {this.state.hover && this.props.statusDetails ? 
                    (
                        <div className='FavoritesLineStatusDetail'>
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
                </div>
            </div>
        )
    }
}

export default FavoritesStatus