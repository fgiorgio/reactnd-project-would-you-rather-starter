import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class NewQuestion extends Component {

    render(){
        const {authedUser} = this.props;

        // Redirect user if not authenticated
        if (authedUser === null) {
            return <Redirect to={{
                pathname: '/login',
                requestedURL: '/new',
            }} />
        }

        return (
            <div>NewPoll</div>
        )
    }
}

export default connect((state) => ({
    authedUser: state.authedUser,
}))(NewQuestion)
