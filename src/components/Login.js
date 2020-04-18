import React, {Component} from 'react'
import {Row, Col, Card, Button, Form, Image} from 'react-bootstrap'
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";
import { withRouter } from 'react-router-dom'

class Login extends Component {
    state = {
        selectedUser: null
    }

    selectUser = (e)=>this.setState({selectedUser:e.target.value})

    handleLogin = (e)=>{
        e.preventDefault();
        const {selectedUser} = this.state;
        const {dispatch} = this.props;
        dispatch(setAuthedUser(selectedUser));
        if(this.props.location.requestedURL){
            this.props.history.push(this.props.location.requestedURL)
        }else{
            this.props.history.push('/')
        }
    };

    handleLogout = ()=>{
        const {dispatch} = this.props;
        dispatch(setAuthedUser(null));
    };

    componentDidMount() {
        const {pathname} = this.props.location;
        if(pathname==='/logout'){
            this.handleLogout();
        }else{
            this.setState({selectedUser: this.props.authedUser})
        }
    }

    render(){
        return (
            <Row>
                <Col sm="6" md="4" lg="3" className="mx-auto my-5">
                    <Card className="text-center">
                        <Card.Header as="h1" className="h5">Would you rather App</Card.Header>
                        <Card.Body>
                            { (this.state.selectedUser)
                            && <Image
                                className="login-avatar"
                                src={this.props.users[this.state.selectedUser].avatarURL}
                                roundedCircle
                            />}
                            <form onSubmit={this.handleLogin}>
                                <Form.Group>
                                    <Form.Label>Select a user:</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.selectedUser} onChange={this.selectUser}>
                                        <option></option>
                                        {Object.keys(this.props.users).map((uid)=>(
                                            <option
                                                key={this.props.users[uid].id}
                                                value={this.props.users[uid].id}
                                            >{this.props.users[uid].name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={this.state.selectedUser===null}
                                >Login</Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(connect((state) => ({
    authedUser: state.authedUser,
    users: state.users,
}))(Login))
