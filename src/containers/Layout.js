import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header/Header'
import './Layout.css'


class CustomLayout extends React.Component {
    render() {
        return (
            <div>
                <Header title={'Find Subway Stations'} />
                <div className='Body'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(CustomLayout)
