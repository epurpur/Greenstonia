const { Schema, model } = require('mongoose');

const areaSchema = new Schema({
  areaName: {
    type: String,
    required: true,
  },
  areaDescription: {
    type: String,
    required: true,
  },
  parkingDescription: {
    type: String,
    required: true,
  },
  approachDescription: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  boulders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Boulder'
    }
  ],
});

const Area = model('Area', areaSchema);

module.exports = Area;
