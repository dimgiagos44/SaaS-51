import React, {Component} from 'react';
import {authenticate, login} from "../auth";
import { Redirect } from "react-router-dom";
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import {Face, Fingerprint} from "@material-ui/icons";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit,
        height: 400,
        marginTop: 100,

    },
    container: {
        justifyContent: 'center',
        width: 500,
        marginLeft: "25%",
        marginTop: "9%",
        height: 500,
        backgroundColor: "lavender"
    }
});

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: "",
            isAuthenticated: false,
            redirectToReferer: false,
            showWrongCredentials: false
        }
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        const user = {
            username,
            password
        };
        login(user).then(data => {
            console.log('this is the response', data);
            if(data.message === "Unauthorized" || data.error === "Not Found") {
                this.setState({ error: data.message, showWrongCredentials: true });
                console.log('error is ', this.state.error);
                return(
                  <div>
                      Not authorized sir/madam
                  </div>
                );
            }
            else {
                authenticate(data, () => {
                    console.log('all went ok')
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('token', data.token);
                    this.setState({ redirectToReferer: true, isAuthenticated: true });
                })
            }
        })
    };

    loginForm = (username, password, classes) => (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} >
                    <Grid item>
                        <Face/>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Username" onChange={this.handleChange("username")} type="email" />
                    </Grid>
                </Grid>
                <Grid container spacing={8} >
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="password" label="Password" onChange={this.handleChange("password")} type="password"/>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="center" justify="space-between">
                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Remember me" />
                    </Grid>
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                    </Grid>
                </Grid>
                <Grid container  justify="center" style={{ marginTop: '10px' }}>
                    <Button variant="outlined" onClick={this.clickSubmit} color="primary" style={{ textTransform: "none" }}>Login</Button>
                </Grid>
                {this.state.showWrongCredentials &&
                    <h3>Invalid Username or Password</h3>
                }
            </div>
        </Paper>
    );

    render() {
        const { classes, setShowHome } = this.props;
        const {
            username,
            password,
            error,
            redirectToReferer
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }
        setShowHome(true);
        return (
            <div className={classes.container}>
                {this.loginForm(username, password, classes)}
            </div>
        );
    }

}

export default withStyles(styles)(Login);