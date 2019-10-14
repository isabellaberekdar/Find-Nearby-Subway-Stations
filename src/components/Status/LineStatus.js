import React from 'react'
import PropTypes from 'prop-types'
import './Status.css'
/* 
  
*/
class LineStatus extends React.Component {

    state = {
        hover: false
    }

    handleClick = line_id => {
    /*     console.log(line_id, typeof line_id)
        console.log(this.props.favorites)
        console.log(this.props.favorites.includes(line_id)) */
    }

    handleHover = e => {

    }
//"fas fa-heart" or "far fa-heart"
render() {
    return (
        <div className='LineStatus'>
            <div onClick={() => this.props.AddOrDeleteFavorite(this.props.line)}>
                <i class={this.props.class}></i>
            </div>
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