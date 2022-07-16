// const User = require('./User');
const Parcel = require('./Parcel');
const Owner = require('./Owner');
const Address = require('./Address');
const ParcelOwner = require('./ParcelOwner');
const Building = require('./Building');
const User = require('./User');

Owner.belongsToMany(Parcel, {
    through: ParcelOwner,
    as: 'parcel_owner',
    foreignKey: 'parcel_id'
});

Parcel.belongsToMany(Owner, {
    through: ParcelOwner,
    as: 'parcel_owner',
    foreignKey: 'owner_id'
});

Parcel.hasOne(Address, {
    foreignKey: 'address_id',
});

Address.belongsTo(Parcel, {
    foreignKey: 'address_id',
});

Owner.hasOne(Address, {
    foreignKey: 'address_id',
});

Address.belongsTo(Owner, {
    foreignKey: 'address_id'
});

Parcel.hasMany(Building, {
    foreignKey: 'parcel_id'
});

Building.hasOne(Parcel, {
    foreignKey: 'parcel_id'
});

module.exports = { Address, Building, Owner, Parcel, ParcelOwner, User };