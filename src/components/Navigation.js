import React, {Component} from 'react'
import {Navbar,Nav,Container,Image} from 'react-bootstrap'
import {Link} from "react-router-dom"
import {connect} from "react-redux";

class Navigation extends Component {
    render(){
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/new" className="nav-link">New Question</Link>
                            <Link to="/leaderboard" className="nav-link mr-auto">Leaderboard</Link>
                        </Nav>
                        {this.props.authedUser &&
                            <Nav className="ml-auto">
                                <Nav.Item>
                                    <Navbar.Text>{ this.props.users[this.props.authedUser].name}</Navbar.Text>
                                    <Image className="navbar-avatar"
                                           src={ this.props.users[this.props.authedUser].avatarURL }
                                           roundedCircle/>
                                </Nav.Item>
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default connect((state) => ({
    authedUser: state.authedUser,
    users: state.users,
}))(Navigation)
