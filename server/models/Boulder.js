const { Schema, model } = require('mongoose');

const boulderSchema = new Schema({
  boulderName: {
    type: String,
    required: true,
  },
  boulderDescription: {
    type: String,
    required: true,
  },
  latitude: {
      type: String,
  },
  longitude: {
      type: String,
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: 'Area'
  },
  routes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Route'
    }
  ]
});

const Boulder = model('Boulder', boulderSchema);

module.exports = Boulder;
