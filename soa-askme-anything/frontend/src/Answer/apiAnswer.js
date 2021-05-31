export const createAnswer = (answer, token) => {
    return fetch(`http://localhost:3001/answer`, {
        method: "POST",
        headers: {
            //Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
        body: answer
    })
        .then(response => {
            console.log(answer);
            console.log(token)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readAnswer = (answerId) => {
    return fetch(`http://localhost:3001/answer/${answerId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readAnswerByUserId = (userId) => {
    return fetch(`http://localhost:3001/answer/user/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};