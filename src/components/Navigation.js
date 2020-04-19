import React, {Component} from 'react'
import {Navbar, Nav, Container, Image} from 'react-bootstrap'
import {Link} from "react-router-dom"
import {connect} from "react-redux";

class Navigation extends Component {
    render() {

        const {users, authedUser} = this.props

        return (
            <Navbar bg="light" expand="md">
                <Container>
                    <Navbar.Toggle aria-controls="navbar"/>
                    <Navbar.Collapse id="navbar">
                        <Nav>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/add" className="nav-link">New Question</Link>
                            <Link to="/leaderboard" className="nav-link mr-auto">Leaderboard</Link>
                        </Nav>
                        {authedUser &&
                        <Nav className="ml-auto">
                            <Nav.Item>
                                <Navbar.Text>{users[authedUser].name}</Navbar.Text>
                                <Image className="navbar-avatar"
                                       src={users[authedUser].avatarURL}
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
