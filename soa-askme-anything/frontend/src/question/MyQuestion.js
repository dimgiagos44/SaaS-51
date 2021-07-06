import React, { Component } from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles} from "@material-ui/core";
import {readQuestionByUserId2} from "./apiQuestion";


const styles = theme => ({
    table: {
        marginTop: 0,
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

class MyQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myQuestions: [],
        };
    };

    handleMyQuestions = (myQuestions) => {
        this.setState({myQuestions: myQuestions});
    };

    loadMyQuestions = () => {
        const userId = localStorage.getItem('userId');
        readQuestionByUserId2(userId).then(data => {
            if (data.error){
                console.log(data.error);
            }
            else {
                this.handleMyQuestions(data);
            }
        })
    };

    componentDidMount() {
      this.loadMyQuestions();
    };

    render() {
        const { classes, setShowHome } = this.props;

        setShowHome(true);
        return(
            <div className={classes.root}>
              <TableContainer component={Paper} className={classes.table}>
                  <Table className={classes.table} aria-label="My questions">
                      <TableHead>
                          <TableRow>
                              <StyledTableCell>Question Title</StyledTableCell>
                              <StyledTableCell align="center">Question Text</StyledTableCell>
                              <StyledTableCell align="right">Date created</StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {this.state.myQuestions.map(question => (
                              <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                      {question.title}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">{question.text}</StyledTableCell>
                                  <StyledTableCell align="right">{question.createdAt.split('T')[0]} at {question.createdAt.split('T')[1].split('Z')[0].split('.')[0]}</StyledTableCell>
                              </StyledTableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
            </div>
        );
    }
}

export default withStyles(styles)(MyQuestion);
