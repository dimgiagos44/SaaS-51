/* export const createAnswer = (answer, token) => {
    return fetch(`http://localhost:4000/answer`, {
        method: "POST",
        headers: {
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
}; */
export const createAnswer2 = (answer, token) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "createAnswer",
            "token": token,
            "text": answer.text,
            "user": answer.user,
            "question": answer.question
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


/* export const readAnswer = (answerId) => {
    return fetch(`http://localhost:4000/answer/${answerId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const readAnswer2 = (answerId) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "readAnswerById",
            "answerId": answerId
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/* export const readAnswerByUserId = (userId) => {
    return fetch(`http://localhost:4000/answer/user/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const readAnswerByUserId2 = (userId) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "readAnswersByUserId",
            "userId": userId
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};