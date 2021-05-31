import React, { Component } from "react";
import {signup} from "../auth";
import { Link } from "react-router-dom";
import {Button, Grid, Paper, TextField, withStyles} from "@material-ui/core";
import {Create, Email, Face,  Lock} from "@material-ui/icons";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit,
    },
    container: {
        justifyContent: 'center',
        width: "50%",
        marginLeft: "25%",
        marginTop: "9%",
        height: "60%",
        backgroundColor: "white"
    }
});

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            firstname: "",
            lastname: "",
            error: false,
            open: false,
            showMessage: true
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({showMessage: false});
        const { username, password, email, firstname, lastname } = this.state;
        const user = {
            username,
            password,
            email,
            firstname,
            lastname
        };
        signup(user).then(data => {
            console.log('this is the response for signup: ', data);
            if (data.message === "Internal server error") this.setState({ error: true });
            else {
                this.setState({
                    error: "",
                    username: "",
                    password: "",
                    email: "",
                    firstname: "",
                    lastname: "",
                    open: true,
                    showMessage: true
                });
            }
        })
    };

    signupForm = (username, password, email, firstname, lastname, classes) => (
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
                        <Lock/>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="password" label="Password" onChange={this.handleChange("password")} type="password"/>
                    </Grid>
                </Grid>
                <Grid container spacing={8} >
                    <Grid item>
                        <Email/>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="email" label="Email" onChange={this.handleChange("email")} type="email"/>
                    </Grid>
                </Grid>
                <Grid container spacing={8} >
                    <Grid item>
                        <Create/>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="firstname" label="Firstname" onChange={this.handleChange("firstname")} type="firstname"/>
                    </Grid>
                </Grid>
                <Grid container spacing={8} >
                    <Grid item>
                        <Create/>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="lastname" label="Lastname" onChange={this.handleChange("lastname")} type="lastname"/>
                    </Grid>
                </Grid>
                <Grid container  justify="center" style={{ marginTop: '10px' }}>
                    <Button variant="outlined" onClick={this.clickSubmit} color="primary" style={{ textTransform: "none" }}>Register</Button>
                </Grid>
            </div>
        </Paper>
    );

    render() {
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        const { username, password, email, firstname, lastname, error, open } = this.state;
        return(
            <div className={classes.container}>
                <h1 className="mt-5 mb-5">SignUp</h1>
                {this.state.showMessage &&
                    <p>Please fill all the fields. Thank you</p>
                }
                <br/>
                {this.state.error &&
                    <p>Bad request sir/madam. Try again</p>
                }
                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/login">Log in</Link>.
                </div>
                {this.signupForm(username, password, email, firstname, lastname, classes)}
            </div>
        );
    }
}

export default withStyles(styles)(Signup);