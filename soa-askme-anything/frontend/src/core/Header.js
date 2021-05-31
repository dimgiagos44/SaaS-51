import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link, withRouter } from 'react-router-dom';
import {Button, Grid,} from "@material-ui/core";
import {isAuthenticated, signout} from "../auth";
import {AccountCircle, FlashOn} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "gold",
    },
    homeButton: {
        color: "gold",
        marginLeft: 20,
    },
    registerButton: {
        color: "black",
        background: "yellow"
    },
    logoutButton: {
        color: "black",
        background: "white"
    },
    title: {
        flexGrow: 1,
        marginLeft: 600,
    },
}));

const Header = props => {
    const { history } = props;
    const classes = useStyles();
    const [showQuestions, setShowQuestions] = React.useState(true);
    //const [showHome, setShowHome] = React.useState(false);


    const handleClick = (pageURL) => {
        history.push(pageURL);
    };

    const handleClickQuestions = (pageURL) => {
        history.push(pageURL);
        setShowQuestions(false);
        props.setShowHome(true);
    };

    const handleClickHome = (pageURL) => {
        history.push(pageURL);
        props.setShowHome(false);
        setShowQuestions(true);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {isAuthenticated() &&
                        <IconButton edge="start" className={classes.menuButton} onClick={() => handleClick('/account')} color="inherit">
                            <FlashOn/>
                        </IconButton>
                    }
                    {isAuthenticated() &&
                        <IconButton className={classes.menuButton} size="small" color="inherit" onClick={() => handleClick('/myaccount')}>
                            <AccountCircle/>
                        </IconButton>
                    }
                    {props.showHome &&
                    <IconButton edge="start" className={classes.homeButton} color="inherit" onClick={() => handleClickHome('/')}>
                        <HomeIcon/>
                    </IconButton>
                    }
                    <Typography variant="h6" className={classes.title}>
                        This is Ask Me Anything
                    </Typography>
                    {showQuestions &&
                    <Button variant="contained" color="secondary" onClick={() => handleClickQuestions('/questions/random')}>Random Questions</Button>
                    }
                    {!isAuthenticated() && (
                        <div>
                            <Button className={classes.registerButton} onClick={() => handleClick('/login')}>Log In</Button>
                            <Button className={classes.registerButton} onClick={() => handleClick('/signup')}>Sign Up</Button>
                        </div>
                    )}
                    {isAuthenticated() && (
                        <div>
                            <Button className={classes.logoutButton} onClick={() => signout(() => handleClick('/'))}>Log out</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Header);