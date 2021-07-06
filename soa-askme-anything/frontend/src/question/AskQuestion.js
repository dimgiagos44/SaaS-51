import React, { Component } from "react";
import {Button, TextField, withStyles} from "@material-ui/core";
import {createQuestion2, readAll} from "./apiQuestion";
import {readAllKeywords2} from "../Keyword/apiKeyword";
import {Autocomplete} from "@material-ui/lab";

const styles = theme => ({
    root1:{
        justifyContent: 'center',
        width: "50%",
        marginLeft: "25%",
        marginTop: "7%",
        height: "50%",
        backgroundColor: "lavender",
        margin: theme.spacing(1)
    },
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805,
    },
    keywordsBar:{
      width: 450,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
    submitButton: {
        color: "primary",
        variant: "outlined",
        marginLeft: 650,
    },
    text:{
        marginLeft: 350,
        marginTop: 50,
        width: 700,
    }
});

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newQuestionTitle: "",
            newQuestionText: "",
            keywords: [],
            keywordsSelected: [],
        };
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleKeywords = (keywords) => {
        this.setState({ keywords: keywords} );
    }

    loadKeywords = () => {
        readAllKeywords2().then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleKeywords(data);
            }
        })
    };

    componentDidMount() {
        this.loadKeywords();
    };

    clickSubmit = (event) => {
        event.preventDefault();
        this.handleClickSubmit(this.state.newQuestionTitle, this.state.newQuestionText, this.state.keywords, this.state.keywordsSelected);
    };

    handleClickSubmit = (questionTitle, questionText, keywords, keywordsSelected) => {
        console.log(this.state.keywordsSelected);
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const keywordsSelectedIds = [];
        keywordsSelected.forEach(keyword => {
            keywordsSelectedIds.push(keyword.id);
        })
        const question = {
            "text": questionText,
            "title": questionTitle,
            "user": {
                "id": Number(userId)
            },
            "keywords": keywordsSelectedIds
        };
        //const question2 = JSON.stringify(question);
        createQuestion2(question, token).then(data => {
            if(data.message === "Unauthorized" || data.message === "Bad Request"){
                console.log(data.message);
                console.log('hi');
            }
            else{
                console.log('Your question is submitted correctly. Thank you.');
                this.setState({newQuestionTitle: "", newQuestionText: "", keywordsSelected: []});
            }
        })
    };



    render(){
        const { classes, setShowHome } = this.props;
        const { newQuestionTitle, newQuestionText, keywords } = this.state;
        setShowHome(true);
        return(
          <div className={classes.root}>
              <TextField
                  multiline
                  label="Insert title"
                  rowsMax="5"
                  margin="normal"
                  className={classes.text}
                  variant="outlined"
                  value={newQuestionTitle}
                  onChange={this.handleChange('newQuestionTitle')}
              />
              <br/>
              <TextField
                  multiline
                  label="Insert text"
                  rowsMax="5"
                  margin="normal"
                  className={classes.text}
                  variant="outlined"
                  value={newQuestionText}
                  onChange={this.handleChange('newQuestionText')}
              />
              <br/>
              <br/>
              <Autocomplete
                  multiple
                  id="keyword-tags"
                  options={keywords}
                  className={classes.text}
                  onChange={(event, value) => this.setState({keywordsSelected: value})}
                  getOptionLabel={(option) => option.text}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          variant="standard"
                          label="pick keywords"
                      />
                  )}
              />
              <br/>
              <br/>
              <Button className={classes.submitButton} onClick={this.clickSubmit}>Submit question</Button>

          </div>
        );
    }
}

export default withStyles(styles)(AskQuestion);