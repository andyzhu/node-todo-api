//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err, client) => {
    if (err) {
        return console.log ('Faile dto onnect to MongoDB server');
    }

    console.log ('Connect to Mondgo DB server');

    var db = client.db('ToDoApp');
    //update one
    // db.collection('ToDos').findOneAndUpdate({
    //     _id: new ObjectID('5af8b93e450d9510f91725bb')
    // }, {
    //     $set : {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // })
    //     .then((result) => {
    //         console.log(result);
    //     });

    db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5af893468d24b51c90b8aae8')
        }, {
            $set : {
                name: 'Joe'
            }, 
        
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        })
            .then((result) => {
                console.log(result);
            });
    
         
    //disconnect from the DB
    client.close();
});