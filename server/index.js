import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../server/Models/userModel";
import userRoutes from "../server/Routes/userRoute";
const app = express();
const PORT = 4000;

mongoose.Promise = global.Promise;
const url = "mongodb://localhost/jeeb";
// const url =
//   "mongodb+srv://abdulrazak:diiriye1992@zeon-m0w0g.mongodb.net/CRMdb?retryWrites=true&w=majority";
mongoose.set("useCreateIndex", true);
mongoose.connect(url, {
  keepAlive: 1,
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//json werbtoken setup
app.use((req, res, next) => {
  console.log(req.headers);
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

userRoutes(app);

app.get(
  "/",
  (req, res) => res.send(`Node and Express server is running on the ${PORT}`)
  // res.redirect("/login.js")
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
