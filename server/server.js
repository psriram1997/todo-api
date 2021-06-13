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
app.post('/todos',authenticate, (req, res) => {
    var newTodo = new Todo({
        text : req.body.text,
        _creator : req.user._id
    })
    
    newTodo.save().then((doc) => {
        res.send(doc);
    },(err) => {
        res.status(400).send(err);
    });
});
//-------------GET TODOS ------------
app.get("/todos",authenticate, (req, res) => {
    
    Todo.find({_creator:req.user._id}).then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});
//-------GET INDIVIDUAL TODO---------
app.get("/todos/:id",authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(400).send();
    }
    
    Todo.findOne({_id:id,_creator:req.user._id}).then((todo) => {
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
app.delete("/todos/:id",authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(400).send();
    }

    Todo.findOneAndRemove({_id:id,_creator:req.user._id}).then((todo) => {
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
app.patch("/todos/:id",authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    body._creator = req.user._id;
    if(body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completedAt = null;
    }
    
    if(!ObjectId.isValid(id)){
        return res.status(400).send();
    }

    Todo.findOneAndUpdate({_id:id,_creator:req.user._id}, body, {new: true}).then((todo) => {
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
//-------------login ------------
app.post('/users/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    User.findByCredentials(email,password).then((user) => {
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((e)=>{
        res.status(400).send();
    });
});
//------------logout----------------
app.delete('/users/me/token', authenticate, (req, res) => {
    var token = req.token;
    var user  = req.user;
    user.removeToken(token).then(()=>{
        res.status(200).send();
    }).catch((err)=>{
        res.status(400).send();
    });
});
app.listen(3000, () => {
    console.log('server started');
});

