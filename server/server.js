const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

const {mongoose} = require('./database/db_connection');
const {Todo}     = require('./models/todo');
const {User}     = require('./models/user');

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var newTodo = new Todo({
        text : req.body.text
    })
    
    newTodo.save().then((doc) => {
        res.send(doc);
    },(err) => {
        res.status(400).send(err);
    });
});

app.post('/user', (req, res) => {
    var newUser = new User({
        email : req.body.email
    })

    newUser.save().then((doc) => {
        res.send(doc);
    },(err) => {
        res.status(400).send(err);
    });
});



app.listen(3000 , () => {console.log('server started')});