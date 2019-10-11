import React from 'react'
import './App.css'
import BaseLayout from './containers/Layout'
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes'
import { connect, Provider } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/auth'
import { getFavorites } from './redux/actions/favorites'


class App extends React.Component {
  componentDidMount() {
    // loads user info into local storage, if the user is logged in
    store.dispatch(loadUser())
    store.dispatch(getFavorites())
    //console.log('called getfavorites in APP.JS', this.props.favorites)

    // loads user's favorites information (if logged in)
    // IF LOGGED IN LOAD FAVORITES
    //if (store.getState().auth.token) {
      //   console.log(store.getState().auth.token)
    //  store.dispatch(loadFavorites())
    //}
  }

  

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <BaseLayout {...this.props}>
              <BaseRouter />
            </BaseLayout>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
