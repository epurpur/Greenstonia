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
});

const Route = model('Route', routeSchema);

module.exports = Route;
