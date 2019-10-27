import React from "react";
import { Route } from "react-router-dom";
import Index from "./containers/Index";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Favorites from "./containers/Favorites";

const BaseRouter = () => (
    <div className='router' /* style={{'width':'100vw'}} */>
        <Route exact path='/' component={Index} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/register/' component={Register} />
        <Route exact path='/favorites/' component={Favorites} />
    </div>
);

export default BaseRouter;
