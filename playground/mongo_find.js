const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017',(err, client) => {
   if(err){
       return console.log('Unable to connect to Datatbase server');
   }
   console.log('Connected to MongoDB');
    var db = client.db('TodoApp');
    db.collection('Todos').find({completed:true}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    },(err) => {
        console.log('unable to find Todo')
    });
    db.collection('Todos').find({completed:true}).count().then((count) => {
        console.log('completd todos',count);
    },(err) => {
        console.log('unable to find Todo')
    });
    
    client.close();
});