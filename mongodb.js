const mongodb= require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL= 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error)
     return console.log('connection failed');

     console.log('connection successful');
     const db = client.db(databaseName);
     db.collection('users').insertOne({

        name:'surya',
        age:'26'
     },(error,res)=>{
        if(error)
        return console.log('cant insert');
        else
        console.log(res.ops);

     })


})