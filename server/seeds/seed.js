const db = require('../config/connection');
const { User, Job } = require('../models');

// import data from .json files
const userData = require('./userData.json')

db.once('open', async () => {
    // clean any existing database records
    await User.deleteMany({});

    // bulk create each model
    const users = await User.insertMany(userData);

    console.log('user seed data inserted ')
    process.exit(0);
});


const jobData = require('./jobData.json')


db.once('open', async () => {
    await Job.deleteMany({});

    const jobs = await Job.insertMany(jobData);

    console.log('Seed data inserted!')
    process.exit(0);
});
