const mongoose = require('mongoose');

var User = mongoose.model('User', {
    email : {
        type : String,
        trim : true,
        minlength  : 1,
        required : true
    }
});


module.exports = {User}

// var newUser = new User({
//     email : "nikhil@gmail.com"
// });

// newUser.save().then((doc)=> {
//     console.log("user : ", doc);
// }, (e) => {
//     console.log(e);
// });