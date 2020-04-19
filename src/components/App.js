import React, {Component} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import Leaderboard from "./Leaderboard";
import QuestionDetail from "./QuestionDetail";
import Error from "./Error";
import {Route} from "react-router-dom";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <div>
                <Navigation/>
                <Route exact path="/" component={() => (<Dashboard/>)}/>
                <Route path="/login" component={() => (<Login/>)}/>
                <Route path="/new" component={() => (<NewQuestion/>)}/>
                <Route path="/leaderboard" component={() => (<Leaderboard/>)}/>
                <Route path="/questions/:qid" component={() => (<QuestionDetail/>)}/>
                <Route path="/logout" component={() => (<Login/>)}/>
                <Route path="/error" component={() => (<Error/>)}/>
            </div>
        )
    }
}

export default connect((state) => ({
    authedUser: state.authedUser,
    users: state.users,
}))(App)
