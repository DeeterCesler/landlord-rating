const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || "mongodb://localhost/landlord5";


mongoose.connect(connectionString, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ', err);
});
