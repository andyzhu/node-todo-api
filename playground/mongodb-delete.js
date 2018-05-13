//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err, client) => {
    if (err) {
        return console.log ('Faile dto onnect to MongoDB server');
    }

    console.log ('Connect to Mondgo DB server');

    var db = client.db('ToDoApp');
    //delete Many
       db.collection('ToDos').deleteMany({
        text: 'Eat something'
    })
        .then((result) => {
            console.log(result);
        });

         //delete one
       db.collection('ToDos').deleteOne({
        text: 'Something to do'
    })
        .then((result) => {
            console.log(result);
        });

         //findone and delete One
       db.collection('ToDos').findOneAndDelete({
        text: 'Do math'
    })
        .then((result) => {
            console.log(result);
        });
    //disconnect from the DB
    client.close();
});