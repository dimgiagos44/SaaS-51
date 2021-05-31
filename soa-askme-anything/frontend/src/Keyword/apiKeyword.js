export const readAllKeywords = () => {
    return fetch(`http://localhost:3001/keyword`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readKeyword = (keywordId) => {
    return fetch(`http://localhost:3001/keyword/id/${keywordId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};