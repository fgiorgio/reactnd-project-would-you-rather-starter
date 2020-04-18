import React, {Component} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import Leaderboard from "./Leaderboard";
import {Route,Redirect,withRouter} from "react-router-dom";

class App extends Component {

    componentDidMount () {
        this.props.dispatch(handleInitialData())
    }

    render(){

        // Redirect user if not authenticated
        if(this.props.authedUser===null && this.props.location.pathname!=='/login'){
            return <Redirect to={{
                pathname: '/login',
                requestedURL: this.props.location.pathname!=='/logout'?this.props.location.pathname:null
            }} />
        }

        return (
            <div>
                <Navigation />
                <Route exact path="/" render={()=>(
                    <Dashboard />
                )}/>
                <Route path="/login" render={()=>(
                    <Login />
                )}/>
                <Route path="/new" render={()=>(
                    <NewQuestion />
                )}/>
                <Route path="/leaderboard" render={()=>(
                    <Leaderboard />
                )}/>
                <Route path="/questions/:question" render={()=>(
                    <Leaderboard />
                )}/>
                <Route path="/logout" render={()=>(
                    <Login />
                )}/>
            </div>
        )
    }
}

export default withRouter(connect((state)=>({
    authedUser: state.authedUser,
    users: state.users,
}))(App))
