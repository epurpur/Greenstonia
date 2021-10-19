const { Schema, model } = require('mongoose');

const Route = new Schema({
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
    required: true
  },
  routeQuality: {
    type: Number,
    required: true,
  },
//   photo:{

//   }
});

const Route = model('Route', routeSchema);

module.exports = Route;
