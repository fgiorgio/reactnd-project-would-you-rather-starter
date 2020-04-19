import React, {Component} from 'react'
import {Container, Row, Col, Card, Button, Form, Image} from 'react-bootstrap'
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";
import {withRouter} from 'react-router-dom'

class Login extends Component {

    state = {
        selectedUser: null
    }

    selectUser = (e) => this.setState({selectedUser: e.target.value === '' ? null : e.target.value})

    handleLogin = (e) => {
        e.preventDefault();
        const {selectedUser} = this.state;
        const {dispatch, history, location} = this.props;
        dispatch(setAuthedUser(selectedUser));
        if (location.requestedURL) {
            history.push(location.requestedURL)
        } else {
            history.push('/')
        }
    };

    handleLogout = () => {
        const {dispatch} = this.props;
        dispatch(setAuthedUser(null));
    };

    componentDidMount() {
        const {location, authedUser} = this.props;
        if (location.pathname === '/logout') {
            this.handleLogout();
        } else {
            this.setState({selectedUser: authedUser})
        }
    }

    render() {

        const {selectedUser} = this.state;
        const {users} = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col sm="6" lg="4" className="mx-auto my-5">
                        <Card className="text-center">
                            <Card.Header as="h1" className="h5">Would you rather App</Card.Header>
                            <Card.Body>
                                <Image
                                    className="login-avatar"
                                    src={selectedUser
                                        ?users[selectedUser].avatarURL
                                        :'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvMnBz41Gy9bGqcJ5vg16CzxbIfDswwov8wtyVXuXP76rOyQr4&usqp=CAU'}
                                    roundedCircle
                                />
                                <form onSubmit={this.handleLogin}>
                                    <Form.Group className="login-user-input">
                                        <Form.Label>Select a user:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            defaultValue={selectedUser}
                                            onChange={this.selectUser}
                                            disabled={Object.keys(users).length === 0}
                                        >
                                            <option> </option>
                                            {Object.keys(users).map((uid) => (
                                                <option
                                                    key={users[uid].id}
                                                    value={users[uid].id}
                                                >{users[uid].name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={selectedUser === null}
                                    >Login</Button>
                                </form>
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
}))(Login))
