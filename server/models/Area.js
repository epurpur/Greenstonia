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
  boulders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Boulder'
    }
  ]
//   location: {
//     type: {
//         type: String,
//         enum: ['Point'],
//         required: true,
//     },
//     coordinates: {
//         type: [Number],
//         required: true,
//     }
//   },  
});

const Area = model('Area', areaSchema);

module.exports = Area;
