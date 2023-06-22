const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));
    //    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    const i = req.params.isbn;
    resolve(res.send(books[i]));
  });
  get_books.then(() => console.log("Promise for Task 11 resolved"));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    let isbns = Object.keys(books);
    isbns.forEach((i) => {
        if(books[i]["author"] === req.params.author){
            res.send(books[i]);
        }
    });
  });
  get_books.then(() => console.log("Promise for Task 12 resolved"));
  return res.status(300).json({message: "Author does not exist in our list"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        let isbns = Object.keys(books);
        isbns.forEach((i) => {
            if(books[i]["title"] === req.params.title){
                res.send(books[i]);
            }
        });
    });
    get_books.then(() => console.log("Promise for Task 13 resolved"));
    return res.status(300).json({message: "Title does not exist in our list"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const i = req.params.isbn;
    if(books[i]){
        res.send(books[i]["reviews"]);
    }
    return res.status(300).json({message: "ISBN does not exist in our list"});
});

module.exports.general = public_users;
