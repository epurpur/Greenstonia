const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema({
  jobText: {
    type: String,
    required: 'You need to post a job!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  jobAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  otherComments: {
    type: String
  },
  comments: [
    {
      commentText: {
        type: String,
        minlength: 0,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  
      
      users:[
        {
        type: Schema.Types.ObjectId,
        ref : 'User'
        },
      ],
      
    });

const Job = model('Job', jobSchema);

module.exports = Job;
