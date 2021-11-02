const db = require('../config/connection');
const { Area, Boulder, Route } = require('../models');

const areaData = require('./areaData.json');
const boulderData = require('./boulderData.json');
const routeData = require('./routeData.json');

db.once('open', async () => {
    // clean database
    await Area.deleteMany({});
    await Boulder.deleteMany({});
    await Route.deleteMany({});
  
    // bulk create each model
    const areas = await Area.insertMany(areaData);
    const boulders = await Boulder.insertMany(boulderData);
    const routes = await Route.insertMany(routeData);
  
    for (newBoulder of boulders) {
        // randomly add each boulder to an area
        console.log('randomly assigning boulders to areas');
        const tempArea = areas[Math.floor(Math.random() * areas.length)];
        tempArea.boulders.push(newBoulder._id);
        await tempArea.save();
    }

    console.log('all done!');
    process.exit(0);
  
});

