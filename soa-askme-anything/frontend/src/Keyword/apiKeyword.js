/* export const readAllKeywords = () => {
    return fetch(`http://localhost:4000/keyword`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const readAllKeywords2 = () => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "getAllKeywords",
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/* export const readKeyword = (keywordId) => {
    return fetch(`http://localhost:4000/keyword/id/${keywordId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const readKeyword2 = (keywordId) => {
    return fetch(`http://localhost:4200/bus`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            "url": "getKeywordById",
            "keywordId": keywordId
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};