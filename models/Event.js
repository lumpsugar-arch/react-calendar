const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('events', eventSchema);