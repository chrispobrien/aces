// const seedAddress = require('./address-seeds.js');
// creating Address with Parcel
const seedParcel = require('./parcel-seeds.js');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });

    // await seedAddress();
    await seedParcel();

    process.exit(0);
};

seedAll();