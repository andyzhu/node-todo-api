const env = process.env.NODE_ENV || 'development'

const cosmosDB = 'az-nodo-todos';
const cosmosDB_key = encodeURIComponent('FLr9V3L2XvOcCzRugx6Z5Hjv39FF6ebSE6mB5lQA7wZUbSCiFu1WUI2JUaOzMt7irVxqUaNN5RswIeF1G2DFbg==');
const cosmosDB_name = 'ToDos';
const cosmosDB_port = 10255;

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
    //process.env.MONGODB_URI = `mongodb://${cosmosDB}:${cosmosDB_key}@${cosmosDB}.documents.azure.com:${cosmosDB_port}/${cosmosDB_name}?ssl=true`
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
