const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _          = require('lodash');
const jwt        = require('jsonwebtoken');

const {mongoose} = require('./database/db_connection');
const {Todo}     = require('./models/todo');
const {User}     = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

app.use(bodyParser.json());
//----------Todo routes------------
//-------POST route-------------
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
//-------------GET TODOS ------------
app.get("/todos", (req, res) => {
    
    Todo.find({}).then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});
//-------GET INDIVIDUAL TODO---------
app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(400).send();
    }
    
    Todo.findById(id).then((todo) => {
        if(todo){
            res.send({todo});
        }else{
            res.status(404).send();
        }
        
    }, (err) => {
        res.status(400).send(err);
    });
});
//-----Delete Route-----------
app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(400).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(todo){
            res.send({todo});
        }
        else{
            res.status(404).send();
        }
    },(err) => {
        res.status(400).send();
    });
});
//----Update Route--------------
app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completedAt = null;
    }
    
    if(!ObjectId.isValid(id)){
        return res.status(400).send();
    }

    Todo.findByIdAndUpdate(id, body, {new: true}).then((todo) => {
        res.send({todo})
    },(err) => {
        res.status(400).send(err);
    });

});






//------Users Routes-------------
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var newUser = new User(body);

    newUser.save().then((doc) => {
        return newUser.generateAuthToken()
    }).then((token) => {
        res.header('X-auth', token).send(newUser);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

//----------Private Route-------
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(3000 , () => {console.log('server started')});