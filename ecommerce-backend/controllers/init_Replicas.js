//Initialize a MongoDB Replica Set with three members
rs.initiate({

  //Replica set name
  _id: "rs0",

  //Define members of the replica set
  members: [
    
    //Primary node (priority based on who starts first)
    { _id: 0, host: "localhost:27117" },
    { _id: 1, host: "localhost:27118" },
    { _id: 2, host: "localhost:27119" }
  ]
});