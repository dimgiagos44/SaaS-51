const database = require('../database/database');

const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
}

User.create = (newUser, result) => {
    database.connection.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('created user: ', { id: res.insertId, ...newUser});
        //result(null, { id: res.insertId, ...newUser});
    });
};

User.findOne = (user, result) => {
    database.connection.query(`SELECT * FROM users WHERE username = '${user.username}'`, (err, res) => {
        if (err) {
            console.log('error 1 here: ', err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('user found: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not found user'}, null);
    });
};

User.getAllUsers = result => {
    database.connection.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('error 2 here', err);
            result(err);
            return;
        }

        console.log('all users found ', res);
        result(res);
        return;
    });
};

User.updateByUsername = (username, user, result) => {
    database.connection.query(`UPDATE users SET firstname = ?, lastname = ? WHERE username = '${username}'`,
        [user.firstname, user.lastname], (err, res) => {
            if (err) {
                console.log('error 3 here: ', err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not found' }, null);
                return;
            }
            console.log('update user: ', { id: user.username, ...user });
            result(null, { username: username, ...user });
        });
};

module.exports = User;