/* export const readAll = () => {
    return fetch(`http://localhost:4000/question`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const readAll2 = () => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "readAllQuestions"
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/* export const readQuestion = (questionId) => {
    return fetch(`http://localhost:4000/question/${questionId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const readQuestion2 = (questionId) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "readQuestionById",
            "questionId": questionId
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/* export const readQuestionByUserId = (userId) => {
    return fetch(`http://localhost:4000/question/user/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const readQuestionByUserId2 = (userId) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "readQuestionsByUserId",
            "userId": userId
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readQuestionsByUserIdToday = (userId, chosenDay) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "readQuestionsByUserIdToday",
            "userId": userId,
            "chosenDay": chosenDay
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/* export const createQuestion = (question, token) => {
    return fetch(`http://localhost:4000/question`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
        body: question
    })
        .then(response => {
            console.log('question object is', question);
            console.log(token)
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const createQuestion2 = (question, token) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "createQuestion",
            "token": token,
            "text": question.text,
            "title": question.title,
            "user": question.user,
            "keywords": question.keywords
        })
    })
        .then(response => {
            console.log('question object is', question);
            console.log(token)
            return response.json();
        })
        .catch(err => console.log(err));
};

/* export const readQuestionsAfterDay = (chosenDay) => {
    return fetch(`http://localhost:4002/question/afterday/${chosenDay}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
} */

export const readQuestionsAfterDay2 = (chosenDay) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "url": "getQuestionsAfterChosenDay",
            "chosenDay": chosenDay
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

/* export const readQuestionsBeforeDay = (chosenDay) => {
    return fetch(`http://localhost:4002/question/beforeday/${chosenDay}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
} */

export const readQuestionsBeforeDay2 = (chosenDay) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "url": "getQuestionsBeforeChosenDay",
            "chosenDay": chosenDay
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

/* export const readQuestionsCurrentDay = (chosenDay) => {
    return fetch(`http://localhost:4002/question/currentday/${chosenDay}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
} */

export const readQuestionsCurrentDay2 = (chosenDay) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "url": "getQuestionsCurrentChosenDay",
            "chosenDay": chosenDay
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}








