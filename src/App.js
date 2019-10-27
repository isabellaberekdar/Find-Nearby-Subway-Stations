import React from "react";
import "./App.css";
import BaseLayout from "./containers/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import { connect, Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/auth";
import { getFavorites } from "./redux/actions/favorites";

class App extends React.Component {
    componentDidMount() {
        // loads user info into local storage, if the user is logged in
        store.dispatch(loadUser());
        // loads user's favorite stations
        store.dispatch(getFavorites());
    }

    render() {
        return (
            <div className='App'>
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
