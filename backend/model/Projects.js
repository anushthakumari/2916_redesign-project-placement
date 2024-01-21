const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  supervisorEmail: {
    type: String,
    required: true,
  },
  supervisorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedDateTime:{
    type: Date,
    default: Date.now
  },
  difficultyRating: {
    type: Number,
    required: true,
  },
  staff:{
    type:Schema.Types.ObjectId,
    ref:"staff"
  }
});

module.exports = mongoose.model("Project",projectSchema);
