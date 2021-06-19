import React, { Component } from "react";
import {readAll, readQuestion} from './apiQuestion';
import {Button, Card, CardContent, MenuItem, TextField, Typography, withStyles} from "@material-ui/core";
import {createAnswer, } from "../Answer/apiAnswer";
import {isAuthenticated} from "../auth";

const styles = theme => ({
    container: {
        justifyContent: 'center',
        width: "50%",
        marginLeft: "25%",
        marginTop: "7%",
        height: "50%",
        backgroundColor: "white",
        margin: theme.spacing(1)
    },
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805,
    },
    card: {
        width: 870,
        marginLeft: 350,
        marginTop: 50,
    },
    cardKeywords: {
        width: 400,
        height: 70,
        marginLeft: 350,
    },
    submitButton: {
      color: "red",
      variant: "outlined",
        marginTop: 50,
        marginLeft: 700,
    },
    questionText: {
        color: "blue",
        fontFamily: "Cursive"
    },
    answerText: {
        color: "orange",
        fontFamily: "Arial",
        fontSize: "18px",
    },
    keywordText: {
        color: "black"
    },
    answerUsername: {
        color: "red"
    }
});

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionPicked: 0,
            questionPickedText: "",
            answersOfQuestionPicked: [],
            keywordsOfQuestionPicked: [],
            newAnswerText: ""
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    componentDidMount() {
        this.loadQuestions();
    };

    handleQuestions = (questions) => {
        this.setState({ questions: questions} );
    };

    loadQuestions = () => {
        readAll().then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleQuestions(data);
            }
        })
    };

    handleQuestionPicked = (questionId) => {
        this.setState({ questionPicked: questionId });
        readQuestion(questionId).then(data => {
            if (data.error){
                console.log(data.error);
            }
            else {

                this.setState({
                    answersOfQuestionPicked: data.answers,
                    questionPickedText: data.text,
                    keywordsOfQuestionPicked: data.keywords
                });
                console.log('read of question done');
            }
        })
    }

    handleSelectChange = (event) => {
        this.handleQuestionPicked(event.target.value);
    };



    handleClickSubmit = (answerText) => {

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        console.log('user id = ', userId);
        console.log('token = ', token);
        const answer = {
            "text": answerText,
            "user": {
                "id": Number(userId)
            },
            "question": {
                "id": this.state.questionPicked
            }
        };
        const answer2 = JSON.stringify(answer);
        createAnswer(answer2, token).then(data => {
            if(data.message === "Unauthorized"){
                console.log(data.message);
            }
            else {
                console.log('Your answer is submitted correctly. Thank you.');
                this.setState({newAnswerText: ""})
            }
        })
    };

    clickSubmit = (event) => {
        event.preventDefault();
        this.handleClickSubmit(this.state.newAnswerText);
    };




    render() {
        const { classes, setShowHome } = this.props;
        const { questions } = this.state;
        setShowHome(true);
        return (
            <div className={classes.root}>
                <TextField
                    variant="outlined"
                    id="listOfQuestions"
                    select
                    label="Select question title"
                    size="medium"
                    className={classes.card}
                    style = {{width: 525}}
                    value={this.state.questionPicked}
                    onChange={this.handleSelectChange}
                >
                    {questions.map(question => (
                        <MenuItem value={question.id}>
                            <Typography variant="h6">{question.title}</Typography>
                        </MenuItem>
                    ))}
                </TextField>
                <br/>
                <br/>
                <Card className={classes.cardKeywords}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>keywords</Typography>
                        {this.state.keywordsOfQuestionPicked.map(keyword => {
                            const keywordText = keyword.text;
                            return(
                                <div>
                                    <Typography className={classes.keywordText} variant="body2">{keywordText}</Typography>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Question Text
                        </Typography>
                        <Typography className={classes.questionText} variant="h6">{this.state.questionPickedText}</Typography>
                    </CardContent>
                </Card>
                <br/>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Answers
                        </Typography>
                        <div>
                            {this.state.answersOfQuestionPicked.map((answer, i) => {
                                const answerText = answer.text;
                                const answerId = answer.id;
                                return (
                                    <div>
                                        <Typography className={classes.answerText} variant="body1">{i+1}. {answerText}</Typography>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
                { isAuthenticated() &&
                <div>
                    <TextField
                        multiline
                        label="Your answer here"
                        rowsMax="5"
                        className={classes.card}
                        value={this.state.newAnswerText}
                        onChange={this.handleChange('newAnswerText')}
                    />
                    <br/>
                    <Button className={classes.submitButton} onClick={this.clickSubmit}>Submit answer</Button>
                </div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Question);