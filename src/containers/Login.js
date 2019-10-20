import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../redux/actions/auth'
import { loadFavorites } from '../redux/actions/favorites'
import './Auth.css'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    onSubmit = e => {
        e.preventDefault()
        console.log(this.state.username, this.state.password)
        this.props.login(
            this.state.username, 
            this.state.password
        )
         //this.props.loadFavorites() 
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        // If already logged in, redirect to homepage
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }

        const { username, password } = this.state
        return (
          <div className='FormContainer'>
                <form onSubmit={this.onSubmit} className='Form'>
                    <h1>Log in</h1> 
                    <label>Username</label>
                    <input 
                        type='text'
                        name='username'
                        onChange={this.onChange}
                        value={username}
                    />
                    
                    <label>Password</label>
                    <input 
                        type='password'
                        name='password'
                        onChange={this.onChange}
                        value={password}
                    />
                    <button type='submit'>Submit</button>

                    <p>Don't have an account?</p>
                    <Link to='/register' className='nav-link'>Register</Link>
                </form>
            </div>
        )  
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps, { login, loadFavorites })(Login)