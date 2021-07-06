import React, { Component } from "react";
import {Card, CardActionArea, CardActions, CardContent, Grid, Typography, withStyles} from "@material-ui/core";
import {readAll2} from "./apiQuestion";

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
    third: {
        width: 250,
        height: 350,
        backgroundColor: "khaki",
        marginTop: 180,
        marginLeft: 50
    },
    fourth: {
        width: 250,
        marginTop: 180,
        height: 350,
        backgroundColor: "linen",
        marginLeft: 50
    },
    fifth: {
        width: 250,
        marginTop: 180,
        backgroundColor: "orchid",
        height: 350,
        marginLeft: 50
    },
    media: {
        marginTop: 30,
        height: 170,
        width: 150,
        marginLeft: 30
    }
});

class RandomQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoaded: false,
            randomIndexes: []
        };
    };

    componentDidMount() {
        let arr = [];
        while(arr.length < 6){
            const r = Math.floor(Math.random() * 10) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        this.setState( {randomIndexes: arr});
        this.loadQuestions();
    };

    handleQuestions = (questions) => {
        this.setState({ questions: questions, isLoaded: true} );
    };

    loadQuestions = () => {
        readAll2().then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleQuestions(data);
            }
        })
    };


    render() {
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        const { questions, randomIndexes } = this.state;
        return(
          <div className={classes.root}>
              {this.state.isLoaded && <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item xs>
                      <Card className={classes.first}>
                          <CardActionArea>
                              <CardContent>
                                  <Typography variant="subtitle1">
                                      {questions[randomIndexes[0]].title}
                                  </Typography>
                                  <br/>
                                  <Typography variant="h5">
                                      {questions[randomIndexes[0]].text}
                                  </Typography>
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
                                  <Typography variant="subtitle1">
                                      {questions[randomIndexes[1]].title}
                                  </Typography>
                                  <br/>
                                  <Typography variant="h5">
                                      {questions[randomIndexes[1]].text}
                                  </Typography>
                              </CardContent>
                          </CardActionArea>
                          <CardActions>
                          </CardActions>
                      </Card>
                  </Grid>
                  <Grid item xs>
                      <Card className={classes.third}>
                          <CardActionArea>
                              <CardContent>
                                  <Typography variant="subtitle1">
                                      {questions[randomIndexes[2]].title}
                                  </Typography>
                                  <br/>
                                  <Typography variant="h5">
                                      {questions[randomIndexes[2]].text}
                                  </Typography>
                              </CardContent>
                          </CardActionArea>
                          <CardActions>
                          </CardActions>
                      </Card>
                  </Grid>
                  <Grid item xs>
                      <Card className={classes.fourth}>
                          <CardActionArea>
                              <CardContent>
                                  <Typography variant="subtitle1">
                                      {questions[randomIndexes[3]].title}
                                  </Typography>
                                  <br/>
                                  <Typography variant="h5">
                                      {questions[randomIndexes[3]].text}
                                  </Typography>
                              </CardContent>
                          </CardActionArea>
                          <CardActions>
                          </CardActions>
                      </Card>
                  </Grid>
                  <Grid item xs>
                      <Card className={classes.fifth}>
                          <CardActionArea>
                              <CardContent>
                                  <Typography variant="subtitle1">
                                      {questions[randomIndexes[4]].title}
                                  </Typography>
                                  <br/>
                                  <Typography variant="h5">
                                      {questions[randomIndexes[4]].text}
                                  </Typography>
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

export default withStyles(styles)(RandomQuestion);