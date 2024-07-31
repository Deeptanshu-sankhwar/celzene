// All the queries and operations live here
const db = require('../config/db');

// SQL Injection
// - Injecting an SQL query from the outside world to manipulate my original query or database is called SQL injection, and its a big security threat to our privacy and data storage.
// - SQL injections are a type of cyber attack where an attacker can interfere with the queries an application makes to its database. This typically happens when user inputs are not properly sanitized and are directly included in SQL queries

// My user object would be a collection of SQL operations that can be utilised by the controller
const User = {
    create: (data, callback) => {
        const query = 'INSERT INTO users (name, email, password, role, age) VALUES (?, ?, ?, ?, ?);';

        db.query(query, [data.name, data.email, data.password, data.role, data.age], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM users;';
        db.query(query, callback)
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?;'
        db.query(query, [id], callback)
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?;';
        db.query(query, [email], (err, results) => {
          if (err) {
            return callback(err, null);
          }
          if (results.length === 0) {
            return callback(null, null);
          }
          callback(null, results[0]);
        });
    },
    update: (id, data, callback) => {
        const query = 'UPDATE users SET name = ?, email = ?, age = ?, role = ? WHERE id = ?;'
        db.query(query, [data.name, data.email, data.age, data.role, id], callback)
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?;'
        db.query(query, [id], callback)
    }
}

module.exports = User;
