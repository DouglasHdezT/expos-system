const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ExpoSchema = new Schema({
  team: {
    type: {
      name: String,
      number: Number,
      section: Number,
      _id: false
    },
    required: true,
  },
  project: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    default: -1
  },
  date: {
    type: Date,
    required: true
  },
  subs: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  attendants: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  } 
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("Expo", ExpoSchema);