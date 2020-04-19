import React, {Component} from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {Card, Row, Col, Image} from "react-bootstrap";

class QuestionPreview extends Component {
    render() {

        const {qid, questions, users} = this.props;

        const question = questions[qid];
        const ts = new Date(question.timestamp);
        const date = ts.toDateString();

        return (
            <Card className="my-3 question-card">
                <Card.Header as="h2" className="h5">{users[question.author].name} asks:</Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs="12" sm="auto">
                            <Image
                                className="question-avatar"
                                src={users[question.author].avatarURL}
                                roundedCircle
                            />
                        </Col>
                        <Col>
                            <small className="d-block">{date}</small>
                            <span className="h5 d-block">Would you rather</span>
                            <span className="d-block">... {question.optionOne.text} ...</span>
                            <Link to={"/questions/" + question.id} className="mt-3 btn btn-primary">View Poll</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default connect((state) => ({
    users: state.users,
    questions: state.questions,
}))(QuestionPreview)
