const mongoose = require('mongoose');

// const connectionString = 'mongodb://localhost/landlords';
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';

mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoUri}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ', err);
});
