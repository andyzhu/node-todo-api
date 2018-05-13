//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err, client) => {
    if (err) {
        return console.log ('Faile dto onnect to MongoDB server');
    }

    console.log ('Connect to Mondgo DB server');

    var db = client.db('ToDoApp');

    db.collection('ToDos')
        .find({
            completed: false
        })
        .count()
        .then((count) => {
            console.log (`ToDos Collection has ${count} record`);
            }, (err) => {
            console.log ('Unable to fetch record', err)
        });

    db.collection('ToDos')
        .find({
            completed: false
        })
        .toArray()
        .then((records) => {
            //console.log ('ToDos COllection');
            console.log (JSON.stringify(records, undefined, 2));
        }, (err) => {
            console.log ('Unable to fetch record', err)
        });
    //disconnect from the DB
    client.close();
});