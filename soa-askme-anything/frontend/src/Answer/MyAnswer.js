import React, { Component } from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles} from "@material-ui/core";
import {readAnswer, readAnswerByUserId2} from "./apiAnswer";
import {readQuestionByUserId} from "../question/apiQuestion";


const styles = theme => ({
    table: {
        marginTop: 10,
    },
    root: {
        backgroundColor: "lavender",
        height: 800
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

class MyAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myAnswers: [],
        };
    };


    handleMyAnswers = (myAnswers) => {
        this.setState({ myAnswers: myAnswers });
        console.log(this.state.myAnswers)
    }

    loadMyAnswers = () => {
        const userId = localStorage.getItem('userId');
        readAnswerByUserId2(userId).then(data => {
            if (data.error){
                console.log(data.error);
            }
            else {
                this.handleMyAnswers(data);
            }
        })
    }

    componentDidMount() {
        this.loadMyAnswers();
    };


    render() {
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        return(
            <div className={classes.root}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table className={classes.table} aria-label="My answers">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Answer Text</StyledTableCell>
                                <StyledTableCell align="center">Question Title</StyledTableCell>
                                <StyledTableCell align="center">Question Text</StyledTableCell>
                                <StyledTableCell align="right">Answered at</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.myAnswers.map(answer => (
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        {answer.text}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{answer.question.title}</StyledTableCell>
                                    <StyledTableCell align="center">{answer.question.text}</StyledTableCell>
                                    <StyledTableCell align="right">{answer.createdAt.split('T')[0]} at {answer.createdAt.split('T')[1].split('Z')[0].split('.')[0]}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default withStyles(styles)(MyAnswer);