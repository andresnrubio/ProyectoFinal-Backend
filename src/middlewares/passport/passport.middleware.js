import passport from "passport";
import LocalPassport from "passport-local";
const LocalStrategy = (LocalPassport).Strategy;
import { isValidePassword, createHash } from "../../utils/utils.js";

import mongoose from 'mongoose'

const schema = {  
  username: {
    type: String,
    trim: true,
    required: true,
    max: 50
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    max: 50
  },
  address: {
    type: String,
    required: true,
    max: 100
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
  },
}

let modelSchema = new mongoose.Schema(schema,
  { timestamps: true }
)

let usersCollection = mongoose.model('users', modelSchema)

passport.use(
  "login",
  new LocalStrategy(  { passReqToCallback: true },(req, username, password, done) => {
    usersCollection.find({username: username}, async function (err, [user]) {
        if (err) {
          done(err)
        } else {
        if (!user) {
          console.log(`No existe el usuario ${username}`);
          return done(null, false, { message: "User not found", source: "/login" });
          }
          if (!isValidePassword(user, password)) {
            console.log("Password Incorrecto");
            return done(null, false, { message: "Password Incorrecto", source: "/login" });
          }
        return done(null, user);
                }})        })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      usersCollection.exists({ username: username }, async function (err, result) {
        if (err) {
          console.log(err);
          done(err)
        } else {
          if (result) {
            console.log(`El email: ${username} ya se encuentra registrado`);
            return done(null, false, { username: "Email already in use" });
          } else {
            const { fullname, address, age, phone, avatar  } = req.body
            let newUser = {
              username,
              fullname, 
              address, 
              age,
              phone, 
              avatar,
              password: createHash(password)
            };
            const userMongo = await usersCollection.create(newUser)
            return done(null, userMongo)
          }
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   let user = Users.find((user) => user.id === id);

//   done(null, user);
// });

passport.deserializeUser((id, done) => {
  usersCollection.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        done(null, docs);
    }
})
});


export {passport, usersCollection};