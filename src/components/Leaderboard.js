import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Leaderboard extends Component {
    render(){

        const {authedUser} = this.props;

        // Redirect user if not authenticated
        if (authedUser === null) {
            return <Redirect to={{
                pathname: '/login',
                requestedURL: '/leaderboard',
            }} />
        }

        return (
            <div>Leaderboard</div>
        )
    }
}

export default connect((state) => ({
    authedUser: state.authedUser,
}))(Leaderboard)
