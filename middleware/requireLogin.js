module.exports = function(req, res, next){
    console.log("HELLO");
    console.log(req.session.logged);
    // check and see if the user is logged in
    // if not, redirect them to log-in page with message saying you
    if(req.session.logged){
        console.log("NEXT");
        next();
    }
    else {
        console.log("NOPE");
        req.session.message = "You need to log in before you can do that."
        res.redirect("/auth/login");
    };
}