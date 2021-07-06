export const read = (userId, token) => {
    return fetch(`http://localhost:3001/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const readUser = (userId, token) => {
    return fetch(`http://localhost:3001/user/${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readUser2 = (userId, token) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "whoami",
            "token": token,
            "userId": userId
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};