import React, { Component } from "react";
import {Button, withStyles} from "@material-ui/core";
import {readAllKeywords, readKeyword} from "../Keyword/apiKeyword";
import {Bar, Pie} from 'react-chartjs-2';
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "lavender",
        height: 805,
    },
    bar: {
        width: 50,
        height: 40,
        marginLeft: 100,
        marginRight: 700,
    },
    pie: {

        marginLeft: 100,
        marginRight: 700,
        marginBottom: 400,
    }
});

class QuestionPerKeyword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: [],
            keywordLabels: [],
            isLoaded: false,
            keywordData: [],
            columnColor: [],
            showBar: true,
        };
    };

    componentDidMount() {
        this.loadKeywords();
    }

    handleKeywords = (keywords) => {
        const colors = ['red', 'yellow', 'green', 'black', 'orange', 'brown', 'blue', 'pink', 'purple'];
        this.setState({ keywords: keywords} );
        keywords.forEach((keyword, i) => {
            this.state.keywordLabels.push(keyword.text);
            this.state.keywordData.push(keyword.questions.length);
            this.state.columnColor.push(colors[i%colors.length])
        })
        this.setState({ isLoaded: true });
    }

    loadKeywords = () => {
        readAllKeywords().then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else{
                console.log(data);
                this.handleKeywords(data);
            }
        })
    };

    handleClick = () => {
        this.setState({showBar: !this.state.showBar})
    }





    render() {
        const { classes, setShowHome } = this.props;
        setShowHome(true);
        return (
            <div className={classes.root}>
                <Button className={classes.button} onClick={this.handleClick}>Click to change graph</Button>
                {(this.state.isLoaded && this.state.showBar) ?
                    <Bar
                        className={classes.bar}
                        data={{
                            labels: this.state.keywordLabels,
                            datasets: [
                                {
                                    label: '# of questions per keyword',
                                    data: this.state.keywordData,
                                    backgroundColor: this.state.columnColor,
                                    borderBlockColor: this.state.columnColor,
                                }
                            ]
                        }}
                        height={100}
                        width={300}
                    />
                    :
                    <div></div>
                }
                {(this.state.isLoaded && !this.state.showBar) ?
                    <Pie
                        className={classes.pie}
                        data={{
                            labels: this.state.keywordLabels,
                            datasets: [
                                {
                                    label: '# of questions per keyword',
                                    data: this.state.keywordData,
                                    backgroundColor: this.state.columnColor,
                                    borderBlockColor: this.state.columnColor,
                                }
                            ]
                        }}
                        radius={50}
                        height={50}
                        width={50}
                    />
                    :
                    <div></div>
                }
            </div>
        );
    };
}

export default withStyles(styles)(QuestionPerKeyword);
