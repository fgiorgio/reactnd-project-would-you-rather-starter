import React, {Component} from 'react'
import {Card, Col, Image, Row} from "react-bootstrap";

class UserScore extends Component {
    render() {

        const {user, pos} = this.props;

        const answered = Object.keys(user.answers).length;
        const created = user.questions.length;

        return (
            <Card className="my-3 leaderboard-card">
                <Card.Header className="h5">
                    #{pos}
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs="12" sm="auto">
                            <Image
                                className="leaderboard-avatar"
                                src={user.avatarURL}
                                roundedCircle
                            />
                        </Col>
                        <Col>
                            <h2 className="h5 mb-3">{user.name}</h2>
                            <span className="d-block">Answered: {answered}</span>
                            <span className="d-block">Created: {created}</span>
                        </Col>
                        <Col xs="12" sm="auto">
                            <Card className="text-center leaderboard-score">
                                <Card.Header className="p-1">Score</Card.Header>
                                <Card.Body className="p-1">
                                    <Card.Text className="h1">
                                        {answered + created}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default UserScore
