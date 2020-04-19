import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import UserScore from "./UserScore";
import {Container, Row, Col} from "react-bootstrap";

class Leaderboard extends Component {
    render() {

        const {authedUser, users} = this.props;
        let count = 1;

        // Redirect user if not authenticated
        if (authedUser === null) {
            return <Redirect to={{
                pathname: '/login',
                requestedURL: '/leaderboard',
            }}/>
        }

        return (
            <Container fluid>
                <Row>
                    <Col md="8" lg="6" className="mx-auto my-5">
                        {Object.keys(users)
                            .sort((a, b) => (
                                (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)
                            ))
                            .map((uid) => (
                                <UserScore key={uid} pos={count++} user={users[uid]}/>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect((state) => ({
    authedUser: state.authedUser,
    users: state.users,
}))(Leaderboard)
