const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const areaSchema = new Schema({
  areaName: {
    type: String,
    required: 'Each area must have a name',
    minlength: 1,
    maxlength: 280,
    trim: true,
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
//   boulders: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Boulder',
//     },
//     ],  
});

const Area = model('Area', areaSchema);

module.exports = Area;
