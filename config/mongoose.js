//require the library
const mongoose = require('mongoose');

//it has used connect fn to connect to contact_list_db(database)
//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_lb');

//and when we are connected the connection gives us access to database
//acquire the connection(to check if it is successful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print message 
db.once('open',function(){
    console.log('successfully connected to the database');
});