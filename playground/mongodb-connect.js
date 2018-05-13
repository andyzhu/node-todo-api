//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err, client) => {
    if (err) {
        return console.log ('Faile dto onnect to MongoDB server');
    }

    console.log ('Connect to Mondgo DB server');

    var db = client.db('ToDoApp');

    // db.collection('ToDos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert to \"ToDos\"', err);
    //     }

    //     console.log (JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'andy',
        age: 42,
        location: 'FTL'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert to \"Users\"', err);
        }

        console.log (JSON.stringify(result.ops, undefined, 2));
    });
    //disconnect from the DB
    client.close();
});