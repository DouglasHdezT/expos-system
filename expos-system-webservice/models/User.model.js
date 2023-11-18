const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase:true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  tokens:{
    type: [String],
    default: []
  },
  roles: {
    type: [String],
    default: []
  }
}, { timestamps: true });

userSchema.methods = {
  encryptPassword: function (password) {
    if(!password) return "";

    try {
      const _password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000, 64,
        `sha512`
      ).toString("hex");

      return _password;
    } catch (error) {
      debug({ error });
      return "";
    }
  },
  makeSalt: function() {
    return crypto.randomBytes(16).toString("hex");
  },
  comparePassword: function(password) {
    return this.hashedPassword === this.encryptPassword(password);
  }
}

userSchema
  .virtual("password")
  .set(function(password = crypto.randomBytes(16).toString()) {
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  });

module.exports = Mongoose.model("User", userSchema);