import React, {Component} from 'react'
import {Redirect,withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {handleSubmitPoll} from "../actions/shared";

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleChange = (e) => this.setState({[e.target.name]: e.target.value.trim()})

    handleNewPoll = (e) => {
        e.preventDefault()
        const {optionOne,optionTwo} = this.state;
        const {dispatch,history} = this.props;
        dispatch(handleSubmitPoll(optionOne,optionTwo))
        history.push('/')
    }

    render(){
        const {authedUser} = this.props;

        // Redirect user if not authenticated
        if (authedUser === null) {
            return <Redirect to={{
                pathname: '/login',
                requestedURL: '/add',
            }} />
        }

        return (
            <Container fluid>
                <Row>
                    <Col md="8" lg="6" className="mx-auto my-5 text-center">
                        <Card>
                            <Card.Header as="h1" className="h5">Create new</Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleNewPoll}>
                                    <h2 className="h5">Complete the question:</h2>
                                    <span>Would you rather ...</span>
                                    <Form.Control
                                        type="text"
                                        className="my-2"
                                        name="optionOne"
                                        placeholder="Enter first option"
                                        value={this.state.optionOne}
                                        onChange={this.handleChange}
                                    />
                                    <span>-- or --</span>
                                    <Form.Control
                                        type="text"
                                        className="my-2"
                                        name="optionTwo"
                                        placeholder="Enter second option"
                                        value={this.state.optionTwo}
                                        onChange={this.handleChange}
                                    />
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={this.state.optionOne === '' || this.state.optionTwo === ''}
                                        className="mt-3"
                                    >Submit</Button>
                                </Form>
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
}))(NewQuestion))
