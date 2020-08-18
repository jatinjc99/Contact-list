const mongoose = require("mongoose"); 
// require library 
mongoose.connect("mongodb://localhost/contact_list_db");
// connect to the data base
const db = mongoose.connection;
// aqquire the connection

db.on("error", console.error.bind(console, "error connecting to db"));
// if error


// up and running 
db.once("open", function () {
  console.log("succesfully connected to data base");
});
