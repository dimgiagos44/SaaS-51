import React, { Component } from "react";
import {signup} from "../auth";
import { Link } from "react-router-dom";
import {Button, Grid, TextField, withStyles} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Signup extends Component {
    constructor(props) {
        super(props);
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

    copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Ask me anything
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }



    render() {
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        const { open } = this.state;
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    onChange={this.handleChange("username")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={this.handleChange("password")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    onChange={this.handleChange("email")}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={this.handleChange("firstname")}
                                    name="firstName"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    onChange={this.handleChange("lastname")}
                                    name="lastName"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.clickSubmit}
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="http://localhost:3000/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/login">Log in</Link>.
                </div>
                <Box mt={5}>
                    {this.copyright}
                </Box>
            </Container>
        );
    }
}

export default withStyles(styles)(Signup);