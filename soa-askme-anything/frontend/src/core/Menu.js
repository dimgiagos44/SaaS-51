import React from 'react';
import {  isAuthenticated } from '../auth';
import { Link, withRouter } from 'react-router-dom';


function Menu() {
    return(
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link"  to="/">
                        Home
                    </Link>
                </li>

                {isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Log in
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                Sign Up
                            </Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </div>
    );
}

export default withRouter(Menu);