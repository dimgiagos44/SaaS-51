import React, { Component } from "react";
import {Card, CardContent, Typography, withStyles} from "@material-ui/core";
import {readUser} from "./apiUser";

const styles = theme => ({
    card: {
        height: 500,
        width: 450,
        marginLeft: 700,
        backgroundColor: "LightBlue"
    },
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805
    },
});

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    };

    loadMyInfo = () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        readUser(userId, token).then(data => {
            this.setState({ user: data });
        });
    }

    componentDidMount() {
        this.loadMyInfo();
    }

    render() {
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        return(
            <div className={classes.root}>
              <Card className={classes.card}>
                  <CardContent>
                      <Typography align="center" color="textSecondary" gutterBottom>
                          My info
                      </Typography>
                      <br/>
                      <Typography>
                          Firstname: {this.state.user.firstname}
                      </Typography>
                      <br/>
                      <Typography>
                          Lastname: {this.state.user.lastname}
                      </Typography>
                      <br/>
                      <Typography>
                          Email: {this.state.user.email}
                      </Typography>
                      <br/>
                      <Typography>
                          Username: {this.state.user.username}
                      </Typography>

                  </CardContent>
              </Card>
            </div>
        );
    };
}

export default withStyles(styles)(MyAccount);