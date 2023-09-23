const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const users = require('./models/user');

const isLoggedIn = (req, res, next) => {
    const token = req.headers["x-access'courser-auth-token"];

    //check if token exists or is null in an if statement
    if (!token || token === "" || token === undefined || token === null || token === "null") {
        return res.status(401).send(JSON.stringify("not-logged-in"));
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            const user = users.findById(decoded._id);
            if (!user) {
                return res.status(401).send(JSON.stringify("no user found"));
            }
            res.userId = decoded._id;
        } catch (er) {
            return res.status(401).send(JSON.stringify("ERROR"));
        }
    }
    next();
};
const asyncMiddleware = fn => 
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { isLoggedIn, asyncMiddleware };