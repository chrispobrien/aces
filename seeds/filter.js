// Filter county data for one single municipality

// Filesystem
const fs = require('fs');
// Full county data
const county = JSON.parse(fs.readFileSync('./seeds/Tax_Parcels.geojson'));
county.features = county.features.filter(feature => feature.properties.MUNNAME === 'Bronxville');
// filter
const bronxville = county;

// write out filtered results
fs.writeFileSync('./seeds/bronxville.geojson',JSON.stringify(bronxville, null, 2));

// end
process.exit(0);
