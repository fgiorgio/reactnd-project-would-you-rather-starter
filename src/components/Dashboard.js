import React, {Component} from 'react'
import {Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import {connect} from "react-redux";
import QuestionPreview from "./QuestionPreview";
import {Redirect} from "react-router-dom";

class Dashboard extends Component {
    render() {

        const {authedUser, users, questions} = this.props;

        // Redirect user if not authenticated
        if (authedUser === null) {
            return <Redirect to={{
                pathname: '/login',
                requestedURL: '/',
            }}/>
        }

        return (
            <Container fluid>
                <Row>
                    <Col md="8" lg="6" className="mx-auto my-5">
                        <Tabs defaultActiveKey="unanswered" id="tab-questions">
                            <Tab eventKey="unanswered" title="Unanswered">
                                {Object.keys(questions)
                                    .filter((qid) => !users[authedUser].answers[qid])
                                    .sort((a, b) => (questions[b].timestamp - questions[a].timestamp))
                                    .map((qid) => (
                                        <QuestionPreview key={qid} qid={qid}/>
                                    ))
                                }
                            </Tab>
                            <Tab eventKey="answered" title="Answered">
                                {Object.keys(questions)
                                    .filter((qid) => users[authedUser].answers[qid])
                                    .sort((a, b) => (questions[b].timestamp - questions[a].timestamp))
                                    .map((qid) => (
                                        <QuestionPreview key={qid} qid={qid}/>
                                    ))
                                }
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect((state) => ({
    authedUser: state.authedUser,
    users: state.users,
    questions: state.questions,
}))(Dashboard)
