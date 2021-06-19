export const readAll = () => {
    return fetch(`http://localhost:4000/question`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readQuestion = (questionId) => {
    return fetch(`http://localhost:4000/question/${questionId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readQuestionByUserId = (userId) => {
    return fetch(`http://localhost:4000/question/user/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createQuestion = (question, token) => {
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
};

export const readQuestionsAfterDay = (chosenDay) => {
    return fetch(`http://localhost:4002/question/afterday/${chosenDay}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const readQuestionsBeforeDay = (chosenDay) => {
    return fetch(`http://localhost:4002/question/beforeday/${chosenDay}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const readQuestionsCurrentDay = (chosenDay) => {
    return fetch(`http://localhost:4002/question/currentday/${chosenDay}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}








