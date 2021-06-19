import React, {Component} from 'react';
import {authenticate, login} from "../auth";
import { Redirect } from "react-router-dom";
import { withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {

    constructor(props) {
        super(props);
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

    copyright= () => {
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

    render() {
        const { classes, setShowHome } = this.props;
        const {username, password, error, redirectToReferer} = this.state;
        if (redirectToReferer) {
            return <Redirect to="/" />;
        }
        setShowHome(true);
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            onChange={this.handleChange("username")}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            onChange={this.handleChange("password")}
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.clickSubmit}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="http://localhost:3000/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                {this.state.showWrongCredentials &&
                <h3>Invalid Username or Password</h3>
                }
                <Box mt={8}>
                    {this.copyright}
                </Box>
            </Container>
        );
    }

}

export default withStyles(styles)(Login);