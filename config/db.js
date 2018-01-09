 //// MOGODB
  /*
   * MEAN APP uses Mongoose ODM.
   * Connect to app mogod database using mogoose.connect();
   */
   
    // Mongodb connection URI
    // var DB_URI = "mongodb://Abi_mongo:Mongo.pa$$word123@abifreecluster-shard-00-00-mffvr.mongodb.net:27017,abifreecluster-shard-00-01-mffvr.mongodb.net:27017,abifreecluster-shard-00-02-mffvr.mongodb.net:27017/test?ssl=true&replicaSet=AbiFreeCluster-shard-0&authSource=admin";

    var DB_URI = "mongodb://Abi_mongolab:Newpa%24%24word123@ds027425.mlab.com:27425/mongotest?authSource=admin";


    // module.exports = function(mongoose) {

    // mongoose.connect(DB_URI, function(err,db) {
    //     if(err) {
    //       console.log('Error in Mongodb connection');
    //       console.log(err);
    //     }
    //     else {
    //       console.log('Successfully connected to remote mongo database !!!');
    //     }
    // }); 

    module.exports = function(mongoClient) {

      mongoClient.connect('mongodb://ds027425.mlab.com:27425/mongotest',
      {user: 'Abi_mongolab', pass: 'Newpa$$word123'},function(err) {
        if(err) {
          console.log('Error in Mongodb connection');
          console.log(err);
        }
        else {
          console.log('Successfully connected to remote mongo database !!!');
        }
      });

    }; 

    // module.exports = function(mongoclient) {

    // mongoclient.open(function(err, mongoclient) {
      
    //     // Then select a database
    //     var db = mongoclient.db("mongodb://ds027425.mlab.com:27425/mongotest");
      
    //     // Then you can authorize your self
    //     db.authenticate('Abi_mongolab', 'Newpa$$word123', function(err, result) {
    //       if(err) {
    //         console.log("Error in mongo db connection");
    //         console.log(err);
    //       }
    //       else {
    //         console.log("Successfully connected to Mongodb");
    //       }
    //     });
    //   });

  // }
