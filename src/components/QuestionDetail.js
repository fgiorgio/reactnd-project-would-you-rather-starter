import React, {Component} from 'react'
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom"
import {Button, Card, Row, Col, Image, Container, Form, ProgressBar, Badge} from "react-bootstrap";
import {handleSubmitAnswer} from "../actions/shared";

class QuestionDetail extends Component {

    state = {
        selectedOption: null
    }

    selectOption = (e) => this.setState({selectedOption: e.target.value})


    handleAnswer = (e) => {
        e.preventDefault()
        const {selectedOption} = this.state;
        const {dispatch,match} = this.props;
        dispatch(handleSubmitAnswer(match.params.qid,selectedOption))
    }

    render() {

        const {authedUser, questions, users, match} = this.props;

        // Redirect user if not authenticated
        if (authedUser === null) {
            return <Redirect to={{
                pathname: '/login',
                requestedURL: match.url,
            }}/>
        }

        // Redirect user if question doesn't exist
        if (Object.keys(questions).indexOf(match.params.qid) < 0) {
            return <Redirect to="/error"/>
        }

        const question = questions[match.params.qid];
        const ts = new Date(question.timestamp);
        const date = ts.toDateString();
        const unanswered = Object.keys(users[authedUser].answers).indexOf(question.id) < 0
        const votes = {
            'optionOne': question.optionOne.votes.length,
            'optionTwo': question.optionTwo.votes.length,
        }
        const totalVotes = votes.optionOne + votes.optionTwo


        return (
            <Container fluid>
                <Row>
                    <Col md="8" lg="6" className="mx-auto my-5">
                        <Card className="my-3 question-card">
                            <Card.Header as="h2" className="h5">
                                {unanswered
                                    ? users[question.author].name + ' asks:'
                                    : 'Asked by ' + users[question.author].name
                                }
                            </Card.Header>
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
                                        {unanswered
                                            ?
                                            <Form onSubmit={this.handleAnswer}>
                                                {['optionOne','optionTwo'].map((option)=>(
                                                    <Form.Check
                                                        key={option}
                                                        type="radio"
                                                        id={option}
                                                        name="option"
                                                        label={question[option].text}
                                                        value={option}
                                                        onChange={this.selectOption}
                                                        checked={this.state.selectedOption === option}
                                                    />
                                                ))}
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    disabled={this.state.selectedOption === null}
                                                    className="mt-3"
                                                >Submit</Button>
                                            </Form>
                                            :
                                            <div>
                                                {['optionOne','optionTwo'].map((option)=>(
                                                    <Card className="mb-3" key={option}>
                                                        <Card.Body>
                                                            {question[option].text}
                                                            {question[option].votes.find((element)=>(element===authedUser)) &&
                                                            <Badge variant="primary" className="vote-badge">Your vote</Badge>}
                                                            <ProgressBar
                                                                now={Math.round(votes[option]*100/totalVotes)}
                                                                label={Math.round(votes[option]*100/totalVotes)+'%'}
                                                                className="mt-2"
                                                            />
                                                            <small>{votes[option]} votes</small>
                                                        </Card.Body>
                                                    </Card>
                                                ))}
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(connect((state) => ({
    authedUser: state.authedUser,
    users: state.users,
    questions: state.questions,
}))(QuestionDetail))
