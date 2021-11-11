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
  },
  boulder: {
    type: Schema.Types.ObjectId,
    ref: 'Boulder'
  }
});

const Route = model('Route', routeSchema);

module.exports = Route;
