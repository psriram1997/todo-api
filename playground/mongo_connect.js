const {MongoClient, ObjectID} = require('mongodb');

//--------object id---------------------- 
var id = new ObjectID();
console.log(id.getTimestamp());


//-------mongo native version 2.xx---------------
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
//     if(err){
//         return console.log('Unable to connect to Database',err);
//     }
//     console.log('Connected to Database');
//     db.collection('Todos').insertOne({
//         text: 'learn Node js',
//         completed : false 
//     },(err, result) => {
//         if(err){
//             return console.log('unable to insert todo');
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     })

//     db.collection('Users').insertOne({
//         name : 'Sriram',
//         location : 'Narasaraopet',
//         age :20
//     }, (err, result) => {
//         if(err){
//             return console.log('Unable to insert user');
//         };
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });
//     db.close();
// });

//-----------version 3.xx---------------------------
MongoClient.connect('mongodb://localhost:27017',(err, client) => {
   if(err){
       return console.log('Unable to connect to Datatbase server');
   }
   console.log('Connected to MongoDB');
    var db = client.db('TodoApp');
    db.collection('Todos').insertOne({
            _id : id,
            text: 'eat lunch',
            completed : true 
            },(err, result) => {
                if(err){
                return console.log('unable to insert todo');
              }
               console.log(JSON.stringify(result.ops, undefined, 2));
         })
    // db.collection('Todos').insertOne({
    //      text: 'learn html',
    //      completed : true 
    //     },(err, result) => {
    //         if(err){
    //         return console.log('unable to insert todo');
    //       }
    //        console.log(JSON.stringify(result.ops, undefined, 2));
    //  })
        
    // db.collection('Users').insertOne({
    //     name : 'Sriram',
    //     location : 'Narasaraopet',
    //     age :20
    //     }, (err, result) => {
    //         if(err){
    //             return console.log('Unable to insert user');
    //         };
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    client.close();
});