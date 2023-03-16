import React, { Component } from 'react';
import './User.css';

class User extends Component {
    render() {
        return (
            <div className="user">
                <h1 className="title">Welcome David Hill</h1>
                <button className="signout-btn">Sign out</button>
            </div>
        );
    }
}

export default User;
