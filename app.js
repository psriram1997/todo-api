const MongoClient = require('mongodb').MongoClient;
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

MongoClient.connect('mongodb://localhost:27017',(err, client) => {
   if(err){
       return console.log('Unable to connect to Datatbase server');
   }
   console.log('Connected to MongoDB');
    var db = client.db('TodoApp');
    // db.collection('Todos').find({completed:true}).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // },(err) => {
    //     console.log('unable to find Todo')
    // });
    db.collection('Todos').find({completed:true}).count().then((count) => {
        console.log('completd todos',count);
    },(err) => {
        console.log('unable to find Todo')
    });
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