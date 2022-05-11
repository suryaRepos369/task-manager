const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("connection failed");

    console.log("connection successful");
    const db = client.db(databaseName);
    // //   db.collection('users').insertOne({

    // //      name:'surya',
    // //      age:'26'
    // //   },(error,res)=>{
    // //      if(error)
    // //      return console.log('cant insert');
    // //      else
    // //      console.log(res.ops);

    // //   })
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "harry",
    //       age: 25,
    //     },
    //     {
    //       name: "genny ",
    //       age: 25,
    //     },
    //   ],
    //   (err, ops) => {
    //     if (err) console.log("connection error");
    //     else console.log("document inserted");
    //   }
    // );
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       taskname: "completing Rest apis",
    //       status: "no",
    //     },
    //     { taskname: "completing Security ", status: "no" },
    //     { taskname: "completing Mongodb", status: "ongoing" },
    //   ],
    //   (err, ops) => {
    //     if (err) return console.log(err);
    //     console.log(ops);
    //   }
    // );

    // db.collection("users").findOne({ name: "harry" }, (err, user) => {
    //   console.log(user);
    // });
    // db.collection("users")
    //   .find({ age: 25 })
    //   .count((err, count) => {
    //     console.log(count);
    //   });

    //incompleted tasks find
    // db.collection("tasks")
    //   .find({ status: "no" })
    //   .toArray((err, val) => {
    //     console.log(val);
    //   });
    //UpdateOne working

    //   const updatePromise = db
    //     .collection("users")
    //     .updateOne({ name: "prakasam" }, { $set: { name: "sirius" } });

    //   updatePromise
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    // })

    // wecan chain all the commands without useof the separate updatePromise variable
    //

    //update many

    // db.collection("tasks")
    //   .updateMany({ status: "no" }, { $set: { status: "yes" } })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //delete one

    db.collection("tasks")
      .deleteOne({ status: "ongoing" })
      .then((res) => {
        console.log(res.deletedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
