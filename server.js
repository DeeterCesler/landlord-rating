// requires
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session        = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require("./db/db");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const landlordController = require("./controllers/landlordController");
const reviewController = require("./controllers/reviewController")
const Reviews = require('./models/reviews');


const requireLogin = require("./middleware/requireLogin");

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
});
   
store.on('connected', function() {
    store.client; // The underlying MongoClient object from the MongoDB driver
});
   
  // Catch errors
store.on('error', function(error) {
    console.log(error);
});
   

// middleware
app.use(express.static('public'))
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
  }));

app.use(async (req, res, next) => {
    res.locals.user = req.session.userId || {};
    next();
})

// routes
app.use("/users", requireLogin, userController);
app.use("/auth", authController);
app.use("/landlords", landlordController);
app.use("/reviews", reviewController);

app.get("/", async (req, res)=> {
    const foundReviews = await Reviews.find({}).populate("landlord");
    res.render("index.ejs", {
        user: req.session.name,
        reviews: foundReviews
    });
})

const port = process.env.PORT || "3000"
app.listen(port, () => {
    console.log(`LIVE @ ${port}`);
})