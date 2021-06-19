import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {isAuthenticated} from "../auth";
import {makeStyles} from "@material-ui/core/styles";
import card_answerQuestion from '../static/images/card_answerQuestion.png';
import card_askQuestion from '../static/images/card_askQuestion.png';
import card_questionsPerKeyword from '../static/images/card_questionsPerKeyword.png';
import card_questionPerPeriod from "../static/images/card_questionPerPeriod.png";
const useStyles = makeStyles({
    cardQuestionsPerKeyword: {
        width: 250,
        height: 500,
        marginTop: 180,
        marginLeft: 50
    },
    cardQuestionsPerPeriod: {
        width: 250,
        height: 500,
        marginTop: 180,
        marginLeft: 50,
    },
    cardAsk: {
        width: 250,
        height: 500,
        marginTop: 180,
        marginLeft: 150
    },
    cardAnswer: {
        width: 250,
        height: 500,
        marginTop: 180,
        marginLeft: 50,
    },
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805
    },
    cardRegister: {
        width: 350,
        height: 500,
        marginLeft: 550,
    },
    button: {
        marginTop: 160,
        marginLeft: 40,
        color: "red",
        variant: "contained"
    },
    media: {
        marginTop: 30,
        height: 170,
        width: 170,
        marginLeft: 30
    },

})

function Home(props) {
    const classes = useStyles();
    const { history } = props;
    const handleClickQuestions = (pageURL) => {
        history.push(pageURL);
    };

    return(
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs>
                    <Card className={classes.cardQuestionsPerKeyword}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={card_questionsPerKeyword}
                            />
                            <CardContent>
                                <Typography variant="h5">
                                    Questions per Keyword
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button className={classes.button}  onClick={() => handleClickQuestions('/questionsperkeyword')}>
                                Click to check
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.cardQuestionsPerPeriod}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={card_questionPerPeriod}
                            />
                            <CardContent>
                                <Typography variant="h5">
                                    Questions per Period
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button className={classes.button}  onClick={() => handleClickQuestions('/questionsperperiod')}>
                                Click to check
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
                            {isAuthenticated() &&
                                <Button className={classes.button} size="small"
                                        onClick={() => handleClickQuestions('/questions/ask')}>
                                    Click to ask
                                </Button>
                            }
                            {!isAuthenticated() &&
                                <Typography className={classes.button}>
                                    You need to register
                                </Typography>
                            }
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
                            {isAuthenticated() &&
                                <Button className={classes.button} size="small"
                                        onClick={() => handleClickQuestions('/questions')}>
                                    Click to answer
                                </Button>
                            }
                            {!isAuthenticated() &&
                                <Typography className={classes.button}>
                                    You need to register
                                </Typography>
                            }
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;