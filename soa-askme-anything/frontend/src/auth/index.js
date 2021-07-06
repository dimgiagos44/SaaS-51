/* export const signup = user => {
    return fetch(`http://localhost:4001/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */

export const signup2 = user => {
    return fetch(`http://localhost:4200/bus`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "url": "signup",
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "firstname": user.firstname,
            "lastname": user.lastname
            
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const login2 = user => {
    return fetch(`http://localhost:4200/bus`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "url": "login",
            "username": user.username,
            "password": user.password
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/* export const login = user => {
    return fetch(`http://localhost:4001/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}; */

export const authenticate = (jwt, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt');
    next();
    return fetch(`http://localhost:3001/user/1`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response);
            return response.json();
        })
        .catch(err => console.log(err));
};