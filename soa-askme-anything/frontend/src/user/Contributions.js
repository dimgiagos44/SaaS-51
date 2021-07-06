import React, { Component } from "react";
import {Card, CardActionArea, CardActions, MenuItem, CardContent, Grid, Typography, withStyles} from "@material-ui/core";
import { readQuestionsByUserIdToday } from "../question/apiQuestion";
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805,
    },
    first: {
        width: 250,
        backgroundColor: "seashell",
        marginTop: 180,
        height: 350,
        marginLeft: 100,
    },
    second: {
        width: 250,
        backgroundColor: "ivory",
        marginTop: 180,
        height: 350,
        marginLeft: 50,
    },
    media: {
        marginTop: 30,
        height: 170,
        width: 150,
        marginLeft: 30
    }
});


class Contributions extends Component {
    constructor(props){
        super(props);
        this.state = {
            myQuestions: [],
            myAnswers: [],
            isLoaded: true
        };
    }

    handleMyQuestions = (myQuestions) => {
        console.log('myQ ', myQuestions)
        this.setState({ myQuestions: myQuestions} );
    };

    loadMyQuestions = () => {
        const userId = localStorage.getItem('userId');
        let today = new Date().toISOString().slice(0, 10)
        readQuestionsByUserIdToday(userId, today).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleMyQuestions(data);
            }
        })
    };



    render(){
        const { classes, setShowHome } = this.props;
        setShowHome(true);

        return(
            <div className={classes.root}>
                {this.state.isLoaded && <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Card className={classes.first}>
                            <CardActionArea>
                                <CardContent>
                                        {this.state.myQuestions.map((question, i) => (
                                            <MenuItem value={question.id}>
                                                <Typography variant="h6">{question.title}</Typography>
                                                <Typography variant="h6">{question.text}</Typography>
                                            </MenuItem>
                                        ))}
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.second}>
                            <CardActionArea>
                                <CardContent>
                                    
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                }
            </div>
          );
    }

    


}

export default withStyles(styles)(Contributions);