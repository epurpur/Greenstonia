const { Schema, model } = require('mongoose');

const routeSchema = new Schema({
  routeName: {
    type: String,
    required: true,
  },
  routeDescription: {
    type: String,
    required: true,
  },
  firstAscent: {
    type: String,
  },
  routeGrade: {
    type: String,
    required: true,
  },
  routeQuality: {
    type: Number,
    required: true,
  }
});

const Route = model('Route', routeSchema);

module.exports = Route;
