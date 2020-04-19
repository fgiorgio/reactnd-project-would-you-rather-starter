import React, {Component} from 'react'
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

class Error extends Component {
    render(){
        return (
            <Container className="text-center p-5">
                <h1>Error 404</h1>
                <span className="d-block">The requested page cannot be found</span>
                <Link to="/">Return to Home</Link>
            </Container>
        )
    }
}

export default Error
