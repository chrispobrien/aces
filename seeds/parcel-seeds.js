const fs = require('fs');
const { Address, Parcel } = require('../models');

const bronxville = JSON.parse(fs.readFileSync('./seeds/bronxville.geojson'));

// bronxville.features = bronxville.features.map(item => {
//     item.properties.legal_address_id = Address.findOne({
//         where: {
//             address_number: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ')[0] : null,
//             address_street: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ').splice(1).join(' ') : '',
//             address_city: item.properties.MUNNAME,
//             address_state: 'NY',
//             address_zip5: '10708'
//         },
//         attributes: [
//             'address_id'
//         ]
//     });
// item.properties.legal_address_id = await Address.findOne({
//     where: {
//         address_number: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ')[0] : null,
//         address_street: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ').splice(1).join(' ') : '',
//         address_city: item.properties.MUNNAME,
//         address_state: 'NY',
//         address_zip5: '10708'
//     },
//     attributes: [
//         'address_id'
//     ]
// });
// });

// console.log(bronxville.features);

// const parcelData = bronxville.features.reduce((obj, item) => (
//     obj.push({
//         swis_sbl_key: item.properties.SBL ? item.properties.SBL : '',
//         check_digit: 'XX',
//         school_code: item.properties.SWIS,
//         description: null,
//         legal_address_id: {
//             address_number: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ')[0] : null,
//             address_street: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ').splice(1).join(' ') : '',
//             address_city: item.properties.MUNNAME,
//             address_state: 'NY',
//             address_zip5: '10708'
//         },
//         acreage: item.properties.AREA_1/43560,
//         total_assessed_value: 0,
//         land_assessed_value: 0,
//     }), obj
// ), []);

// const seedParcel = () => Parcel.bulkCreate(parcelData,{
//     include: [{
//         association: Parcel.Address,
//         as: 'legal_address_id'
//     }]
// });

const seedParcel = async () => {
    for (const item of bronxville.features) {
        // Create parcel address to use in creating Parcel (legal_address_id) which is (address_id) of Address
        let address = await Address.create({
            address_number: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ')[0] : null,
            address_street: item.properties.PROPADDRESS ? item.properties.PROPADDRESS.split(' ').splice(1).join(' ') : '',
            address_city: item.properties.MUNNAME,
            address_state: 'NY',
            address_zip5: '10708'
        });

        // Check digit, not clear how it is computed, acreage in acres, area in sq ft I am assuming
        await Parcel.create({
            swis_sbl_key: item.properties.SBL ? item.properties.SBL : '',
            print_key: item.properties.PRINTKEY,
            school_code: item.properties.SWIS,
            description: null,
            legal_address_id: address.address_id,
            acreage: 0,
            total_assessed_value: 0,
            land_assessed_value: 0,
        });
    }
};

module.exports = seedParcel;