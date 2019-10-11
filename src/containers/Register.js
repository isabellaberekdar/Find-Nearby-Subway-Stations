import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import './Auth.css'
import { register } from '../redux/actions/auth'

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state

        if (password !== password2) {
          console.log('Passwords don\'t match')
        } else {
          const new_user = {
            username,
            password,
            email
          }

          this.props.register(new_user)
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }

        const { username, email, password, password2 } = this.state
        return (
            <div className='RegistrationFormContainer'>
                <form onSubmit={this.onSubmit} className='RegistrationForm'>
                    <h1>Register</h1>
                    <label>Username</label>
{/*                     <b>{this.props.error.msg.name ? this.props.error.msg.name : null}</b> */}
                    <input 
                        type='text'
                        name='username'
                        onChange={this.onChange}
                        value={username}
                    />
                    
                    <label>Email</label>{/* 
                    <b>{this.props.error.msg.email ? this.props.error.msg.email : null}</b> */}
                    <input  
                        type='email'
                        name='email'
                        onChange={this.onChange}
                        value={email}
                    />
                    
                    <label>Password</label>
                    {/* <b>{this.props.error.msg.password ? this.props.error.msg.message : null}</b>                     */}
                    <input 
                        type='password'
                        name='password'
                        onChange={this.onChange}
                        value={password}
                    />
                    {/* <b>{this.props.error.msg.password ? this.props.error.msg.message : null}</b>                     */}
                    <label>Retype password</label>                    
                    <input 
                        type='password'
                        name='password2'
                        onChange={this.onChange}
                        value={password2}
                    />
                    <button type='submit'>Submit</button>
                    <p>Already have an account?</p><Link to='/login'>Log in</Link>
                </form>
            </div>
        ) 
    }
}

const mapStateToProps = state => ({
    //error: state.errors,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register)