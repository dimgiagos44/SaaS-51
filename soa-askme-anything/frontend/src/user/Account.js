import React, { Component } from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, withStyles} from "@material-ui/core";
import card_askQuestion from "../static/images/card_askQuestion.png";
import card_answerQuestion from "../static/images/card_answerQuestion.png";
import card_myQuestionsMyAnswers from "../static/images/card_myQuestionsMyAnswers.png";
import card_contributionsPerDay from "../static/images/card_contributionsPerDay.png"

const styles = theme => ({

    buttonMyAccount:{
      marginTop: 50,
      marginLeft: 200,
    },
    cardMyQuestionsMyAnswers: {
        width: 250,
        marginTop: 180,
        height: 500,
        marginLeft: 100,
    },
    cardContributionsPerDay: {
        width: 250,
        marginTop: 180,
        height: 500,
        marginLeft: 50,
    },
    cardAnswer: {
        width: 250,
        marginTop: 180,
        height: 500,
        marginLeft: 50
    },
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805
    },
    cardAsk: {
        width: 250,
        height: 500,
        marginTop: 180,
        marginLeft: 50
    },
    button: {
        marginTop: 130,
        marginLeft: 40,
        color: "red",
        variant: "contained"
    },
    buttonMyQuestions: {
        marginTop: 100,
        marginLeft: 20,
        color: "red",
        variant: "contained"
    },
    buttonMyAnswers: {
        marginTop: 100,
        marginLeft: 20,
        color: "green",
        variant: "contained"
    },
    media: {
        marginTop: 30,
        height: 170,
        width: 150,
        marginLeft: 30
    }
});

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };


    handleClickQuestions = (pageURL) => {
        this.props.history.push(pageURL);
    };

    render() {
        const { classes, setShowHome } = this.props;

        setShowHome(true);
        return(
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Card className={classes.cardMyQuestionsMyAnswers}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={card_myQuestionsMyAnswers}
                                />
                            </CardActionArea>
                            <CardActions>
                                <Button className={classes.buttonMyQuestions} size="medium" onClick={() => this.handleClickQuestions('/myquestions')}>
                                    My questions
                                </Button>
                                <br/>
                                <Button className={classes.buttonMyAnswers} size="medium" onClick={() => this.handleClickQuestions('/myanswers')}>
                                    My answers
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.cardContributionsPerDay}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={card_contributionsPerDay}
                                />
                                <CardContent>
                                    <Typography variant="h5">
                                        Contributions <br/> per Day
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button className={classes.button} size="small" onClick={() => this.handleClickQuestions('/contributions')}>
                                    Click to browse
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.cardAsk}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={card_askQuestion}
                                />
                                <CardContent>
                                    <Typography variant="h5">
                                        Ask a question
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button className={classes.button} size="small" onClick={() => this.handleClickQuestions('/questions/ask')}>
                                    Click to ask
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.cardAnswer}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={card_answerQuestion}
                                />
                                <CardContent>
                                    <Typography variant="h5">
                                        Answer a question
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button className={classes.button} size="small" onClick={() => this.handleClickQuestions('/questions')}>
                                    Click to answer
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    };
}

export default withStyles(styles)(Account);