const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Création du schéma utilisateur
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//on applique le validator au schéma avant d'en faire un model
userSchema.plugin(uniqueValidator);
/*

// play function before save into display:"block"
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//lecture du models en login

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incrorrect email");
};*/

/* On export le schéma */
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
