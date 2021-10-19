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
//   routes: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Route',
//     },
//     ],  
// photo: {

// }
});

const Boulder = model('Boulder', boulderSchema);

module.exports = Boulder;
