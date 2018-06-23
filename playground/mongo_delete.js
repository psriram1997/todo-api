const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017',(err, client) => {
   if(err){
       return console.log('Unable to connect to Datatbase server');
   }
   console.log('Connected to MongoDB');
    var db = client.db('TodoApp');
    //deleteMany
    db.collection('Todos').deleteMany({completed:true}).then((result) => {
        console.log(result)
    });
    db.collection('Users').deleteMany({name:'Sriram'}).then((result) => {
        console.log(result)
    });
    //deleteOne
    db.collection('Todos').deleteOne({completed:true}).then((result) => {
        console.log(result)
    });
    db.collection('Users').deleteOne({name:'Sriram'}).then((result) => {
        console.log(result)
    });
    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed:true}).then((result) => {
        console.log(result.value)
    });
    //---------------using _id finding user and deleting-----------------
    db.collection('Users').findOneAndDelete({_id: new ObjectID("5b2dd538e333c225487ad7a4")}).then((result) => {
        console.log(result.value)
    });
    client.close();
});