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
        console.log('hovering')
        this.setState({ hover: !this.state.hover })
    }

    render() {
        return (
            <div className='LineStatus'
                onClick={() => this.props.AddOrDeleteFavorite(this.props.line)}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
            >
                    {this.state.hover ? 
                        <i className={this.state.hoverClass} style={{"color":"gold",}}></i>
                    :
                        <i className={this.props.class} style={{"color":"gold",}}></i>
                }


                {this.props.icon}
                {this.props.statusDetails ? 
                        <h3 style={{'color':'rgb(255, 73, 73)'}}>PLANNED WORK</h3> 
                    : 
                        <h3 style={{'color':'rgb(94, 187, 148)'}}>GOOD SERVICE</h3>
                }
            </div>

        )
    }
}
/* 
Status.propTypes = {
    class: this.props.string.isRequired,
    statusDetails: this.props.isRequired,
    icon: this.props.isRequired
  line: PropTypes.???.isRequired,
  serviceInfo: PropTypes.???.isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
} 
 */
export default LineStatus

/* <div dangerouslySetInnerHTML={{ __html: a }} /> */
/* redirect to page with more information, or open information up on page */

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