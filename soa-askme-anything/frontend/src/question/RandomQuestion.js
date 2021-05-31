import React, { Component } from "react";
import {withStyles} from "@material-ui/core";

const styles = theme => ({

});

class RandomQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            page: 1,
        };
    };


    renderQuestions = (questions, classes) => {
      return(
          <div>
          </div>
      )
    };

    render() {
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        return(
          <div>Random Questions</div>
        );
    }
}

export default withStyles(styles)(RandomQuestion);