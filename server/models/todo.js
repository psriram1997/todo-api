const mongoose = require('mongoose');


var Todo = mongoose.model('Todo',{
    text : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    completedAt : {
        type : Number,
        default: null
    },
    _creator : {
       type : mongoose.Schema.Types.ObjectId,
       required : true 
    }
});

module.exports = {Todo}

// var newTodo = new Todo({
//     text : "   learn python   ",
// }) ;

// newTodo.save().then((doc) => {
//     console.log("created todo :", doc);
// },(e) => {
//     console.log(e);
// });

