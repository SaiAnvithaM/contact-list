const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/contact_database');
const db = mongoose.connection;

db.on('error', console.error.bind(console,'Error in connecting to database'));
db.once('open', function(){
    console.log('Successfully connected to database')
})