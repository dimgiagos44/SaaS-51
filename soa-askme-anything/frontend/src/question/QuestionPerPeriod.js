import React, { Component } from "react";
import {Button, Card, CardContent, Grid, TextField, Typography, withStyles} from "@material-ui/core";
import {readQuestionsAfterDay2, readQuestionsBeforeDay2, readQuestionsCurrentDay2} from "./apiQuestion";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805,
    },
    textField: {
        marginLeft: 100,
        width: 250,
        marginTop: 50,
    },
    button: {
      marginLeft: 100,
      marginTop: 30,
      color: "red"
    },
    choiceButton: {
        marginLeft: 850,
        marginTop: 10,
        color: "blue"
    },
    cardAfter: {
        width: 400,
        marginLeft: 50,
        marginTop: 50,
    },
    cardBefore: {
        width: 400,
        marginLeft: 50,
        marginTop:50,
    },
    cardCurrent: {
        width: 400,
        marginLeft: 50,
        marginTop:50,
    },
    answerText: {
        color: "orange",
        fontFamily: "Arial",
        fontSize: "18px",
    },
});

class QuestionPerPeriod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDateAfter: '2021-05-01',
            questionsAfter: [],
            selectedDateBefore: '2021-05-01',
            questionsBefore: [],
            selectedDateCurrent: '2021-05-01',
            questionsCurrent: [],
            showGraph: false,
        };
    }

    handleQuestionsAfter = (questionsAfter) => {
        this.setState({ questionsAfter: questionsAfter} );
    };

    clickButton = (event) => {
        event.preventDefault();
        this.handleDateChange(this.state.selectedDateAfter);
        console.log(this.state.selectedDateAfter);
        readQuestionsAfterDay2(this.state.selectedDateAfter).then(data => {
            console.log('data is ', data);
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleQuestionsAfter(data);
            }
        })
    };

    dateChange = (event) => {
        this.handleDateChange(event.target.value);
    };

    handleDateChange(selectedDateAfter){
        this.setState({ selectedDateAfter: selectedDateAfter });
    };

    handleQuestionsBefore = (questionsBefore) => {
        this.setState({ questionsBefore: questionsBefore} );
    };

    clickButtonBefore = (event) => {
        event.preventDefault();
        this.handleDateChangeBefore(this.state.selectedDateBefore);
        readQuestionsBeforeDay2(this.state.selectedDateBefore).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleQuestionsBefore(data);
            }
        })
    };

    dateChangeBefore = (event) => {
        this.handleDateChangeBefore(event.target.value);
    };

    handleDateChangeBefore(selectedDateBefore){
        this.setState({ selectedDateBefore: selectedDateBefore });
    };

    handleQuestionsCurrent = (questionsCurrent) => {
        this.setState({ questionsCurrent: questionsCurrent} );
    };

    clickButtonCurrent = (event) => {
        event.preventDefault();
        this.handleDateChangeCurrent(this.state.selectedDateCurrent);
        readQuestionsCurrentDay2(this.state.selectedDateCurrent).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleQuestionsCurrent(data);
            }
        })
    };

    dateChangeCurrent = (event) => {
        this.handleDateChangeCurrent(event.target.value);
    };

    handleDateChangeCurrent(selectedDateCurrent){
        this.setState({ selectedDateCurrent: selectedDateCurrent });
    };

    clickGraphButton = () => {
        this.setState({ showGraph: true })
    };

    clickPickersButton = () => {
        this.setState({ showGraph: false })
    };

    render(){
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        return(
            <div className={classes.root}>
                {!this.state.showGraph &&
                <div>
                    <Button className={classes.choiceButton} onClick={this.clickGraphButton}>Show graphs</Button>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs>
                            <Card className={classes.cardAfter}>
                                <CardContent>
                                    <TextField
                                        id="date"
                                        label="Questions after.."
                                        type="date"
                                        value={this.state.selectedDateAfter}
                                        onChange={(e) => {
                                            this.dateChange(e)
                                        }}
                                        className={classes.textField}/>
                                    <Button className={classes.button} onClick={this.clickButton}>Search
                                        questions</Button>
                                    <br/>
                                    <br/>
                                    <Typography color="textSecondary" gutterBottom>
                                        Questions after chosen day
                                    </Typography>
                                    <div>
                                        {this.state.questionsAfter.map((question, i) => {
                                            const questionText = question.text;
                                            return (
                                                <div>
                                                    <Typography className={classes.questionText}
                                                                variant="body1">{i + 1}. {questionText}</Typography>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card className={classes.cardBefore}>
                                <CardContent>
                                    <TextField
                                        id="date"
                                        label="Questions before.."
                                        type="date"
                                        className={classes.textField}
                                        value={this.state.selectedDateBefore}
                                        onChange={(e) => {
                                            this.dateChangeBefore(e)
                                        }}
                                    />
                                    <Button className={classes.button} onClick={this.clickButtonBefore}>Search
                                        questions</Button>
                                    <br/>
                                    <br/>
                                    <Typography color="textSecondary" gutterBottom>
                                        Questions before chosen day
                                    </Typography>
                                    <div>
                                        {this.state.questionsBefore.map((question, i) => {
                                            const questionText = question.text;
                                            return (
                                                <div>
                                                    <Typography className={classes.questionText}
                                                                variant="body1">{i + 1}. {questionText}</Typography>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card className={classes.cardCurrent}>
                                <CardContent>
                                    <TextField
                                        id="date"
                                        label="Questions per day.."
                                        type="date"
                                        className={classes.textField}
                                        value={this.state.selectedDateCurrent}
                                        onChange={(e) => {
                                            this.dateChangeCurrent(e)
                                        }}
                                    />
                                    <Button className={classes.button} onClick={this.clickButtonCurrent}>Search
                                        questions</Button>
                                    <br/>
                                    <br/>
                                    <Typography color="textSecondary" gutterBottom>
                                        Questions at current chosen day
                                    </Typography>
                                    <div>
                                        {this.state.questionsCurrent.map((question, i) => {
                                            const questionText = question.text;
                                            return (
                                                <div>
                                                    <Typography className={classes.questionText}
                                                                variant="body1">{i + 1}. {questionText}</Typography>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                }
                {this.state.showGraph &&
                    <div>
                        <Button className={classes.choiceButton} onClick={this.clickPickersButton}>Show date pickers</Button>

                    </div>
                }
            </div>
        )
    };
}

export default withStyles(styles)(QuestionPerPeriod);