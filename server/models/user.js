const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');
const bcrypt    = require('bcrypt');


var UserSchema = new mongoose.Schema( {
    email : {
        type : String,
        trim : true,
        minlength  : 1,
        required : true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid Email`
         }
    },
    password : {
        type: String,
        require: true,
        minlength: 6

    },
    tokens : [{
        access : {
            type: String,
            require: true
        },
        token : {
            type : String,
            required : true 
        }
    }] 
        
});
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id', 'email'])
}
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access}, 'sriram').toString();
    user.tokens.push({access, token});
    return user.save().then((user) => {
        return token;
    });
}

UserSchema.methods.removeToken = function(token){
    var user = this;
    return user.update({
        $pull:{
            tokens : {
                token : token
            }
        }
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'sriram');
    }catch(e){
        return Promise.reject()
    }

    return User.findOne({
        _id : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })
}

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res)=>{
                if(res){
                    resolve(user);
                }
                else{
                    reject();
                }
            })
        });
        
    }).catch((e)=>{
        return Promise.reject()
    });
}

UserSchema.pre('save', function(next){
    var user = this;
    if(user.isModified(user.password)){
        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash)=> {
                user.password = hash;
                user.save();
                console.log(user.password);
            })
        })
        next();
    }
    else{
        next();
    }
});
var User = mongoose.model('User',UserSchema);


module.exports = {User}

// var newUser = new User({
//     email : "nikhil@gmail.com"
// });

// newUser.save().then((doc)=> {
//     console.log("user : ", doc);
// }, (e) => {
//     console.log(e);
// });