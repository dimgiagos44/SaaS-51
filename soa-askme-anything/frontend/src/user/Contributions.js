import React, { Component } from "react";
import {Card, CardActionArea, CardActions, MenuItem, CardHeader, CardContent, Grid, Typography, withStyles} from "@material-ui/core";
import { readQuestionsByUserIdToday } from "../question/apiQuestion";
import { readAnswersByUserIdToday } from "../Answer/apiAnswer";
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805,
    },
    first: {
        width: 550,
        backgroundColor: "seashell",
        marginTop: 180,
        height: 350,
        marginLeft: 100,
    },
    second: {
        width: 550,
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
    },
    title: {
        color: "red"
    }
});


class Contributions extends Component {
    constructor(props){
        super(props);
        this.state = {
            myQuestions: [],
            myAnswers: [],
            isLoaded: false
        };
    }

    handleMyQuestions = (myQuestions) => {
        console.log('myQ ', myQuestions)
        this.setState({ myQuestions: myQuestions, isLoaded: true} );
    };

    loadMyQuestions = () => {
        const userId = localStorage.getItem('userId');
        const today = new Date().toISOString().slice(0, 10);
        console.log('user id = ', userId);
        console.log('today = ', today);
        readQuestionsByUserIdToday(Number(userId), today).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleMyQuestions(data);
            }
        })
    };

    handleMyAnswers = (myAnswers) => {
        this.setState({ myAnswers: myAnswers, isLoaded:true });
    };

    loadMyAnswers = () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const today = new Date().toISOString().slice(0, 10);
        console.log('user id = ', userId);
        console.log('today = ', today);
        readAnswersByUserIdToday(token, Number(userId), today).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleMyAnswers(data);
            }
        })
    }

    componentDidMount(){
        this.loadMyQuestions();
        this.loadMyAnswers();
    }



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
                                    <Typography variant="h5" className={classes.title}>Titles of mine today's questions</Typography>
                                        {this.state.myQuestions.map((question, i) => (
                                            <MenuItem value={question.id}>
                                                <Typography variant="h6">{i+1}. {question.title}</Typography>
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
                                    <Typography variant="h5" className={classes.title}>Answers of mine today's questions</Typography>
                                        {this.state.myAnswers.map((answer, i) => (
                                            <MenuItem value={answer.id}>
                                                <Typography variant="h6">{i+1}. {answer.text}</Typography>
                                            </MenuItem>
                                        ))}
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