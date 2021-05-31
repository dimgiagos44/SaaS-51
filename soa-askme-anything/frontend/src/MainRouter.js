 import React from 'react';
 import { Switch, Route } from "react-router-dom";
 import Home from "./core/Home";
 import Signup from "./user/Signup";
 import Login from "./user/Login";
 import Header from "./core/Header";
 import Question from "./question/Question";
 import AskQuestion from "./question/AskQuestion";
 import RandomQuestion from "./question/RandomQuestion";
 import Account from "./user/Account";
 import MyQuestion from "./question/MyQuestion";
 import MyAnswer from "./Answer/MyAnswer";
 import MyAccount from "./user/MyAccount";
 import QuestionPerKeyword from "./question/QuestionPerKeyword";

function MainRouter() {
    const [showHome, setShowHome] = React.useState(false);
    return (
        <div>
            <Header showHome={showHome} setShowHome={setShowHome}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route
                    exact path='/signup'
                    render={(props) => (
                        <Signup {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/login'
                    render={(props) => (
                        <Login {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/questions'
                    render={(props) => (
                        <Question {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/questions/ask'
                    render={(props) => (
                        <AskQuestion {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/questions/random'
                    render={(props) => (
                        <RandomQuestion {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/account'
                    render={(props) => (
                        <Account {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/myquestions'
                    render={(props) => (
                        <MyQuestion {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/myanswers'
                    render={(props) => (
                        <MyAnswer {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/myaccount'
                    render={(props) => (
                        <MyAccount {...props} setShowHome={setShowHome}/>
                    )}
                />
                <Route
                    exact path='/questionsperkeyword'
                    render={(props) => (
                        <QuestionPerKeyword {...props} setShowHome={setShowHome}/>
                    )}
                />
            </Switch>
        </div>
    );
}

export default MainRouter;