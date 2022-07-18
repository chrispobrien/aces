const { PdfReader } = require('pdfreader');

// What do I need out of this PDF?
// PrintKey i.e. 11./6/2.A
// Legal Address i.e. 81 Park Avenue
// Property Class i.e. 210
// acreage: 0.22 or something
// total_assessed_value: ####,### usually
// land_assessed_value: ####,### usually

function flushRows(rows) {
    // Many rows have an unpredictable line break, so this fixes it

    // Check length of each and merge with next if too small
    if (rows.length>7 && rows[0].replace('\*','') !== 'STATE OF NEW YORK' && rows[0]+rows[1] !== 'STATE OF NEW YORK') {
        if (rows[0].length<6) {
            rows[0]=rows[0]+rows[1];
            rows.splice(1,1);
        }
        if (rows[1].length<6) {
            rows[1]=rows[1]+rows[2];
            rows.splice(2,1);
        }
        if (rows[2].length<6) {
            rows[2]=rows[2]+rows[3];
            rows.splice(3,1);
        }

        // Check for PrintKey in third spot, means that address is still broken
        //  if rows[2] starts with three numbers, it is the property class and rows[2] is not the PrintKey
        if (rows[2].includes('/') && isNaN(rows[2].substring(0,2))) {
            rows[0]=rows[0]+rows[1];
            rows.splice(1,1);
        }

        if (rows[5].substring(0,4) === 'Bronx') {
            rows[3]=rows[3]+rows[4];
            rows.splice(4,1);
        }

        let address = rows[0].includes('/') ? '' : rows[0].trim();
        let print_key = rows[0].includes('/') ? rows[0].trim() : rows[1].trim();
        let property_code = isNaN(rows[2].substring(0,2)) ? '' : rows[2];
        let acres = rows.findIndex(item => item.includes('ACRES')) !== -1 ? rows[rows.findIndex(item => item.includes('ACRES'))+1].split(' ')[0] : '0';
        let land_assessed_value = rows.filter(item => Number.isInteger(parseInt(item.replace(',',''))));


        console.log('---------------------');
        console.log('Address: ', address, 'PrintKey: ', print_key, 'acres: ', acres, 'land: ', land_assessed_value);
        //console.log('['+rows[0]+']','['+rows[1]+']','['+rows[2]+']','['+rows[3]+']','['+rows[4]+']','['+rows[5]+']','['+rows[6]+']');
        const output = rows.reduce((prev, curr) => prev+'['+curr+'] ', '');
        if (acres === '0' || property_code.substring(0,2) === '210') {
            console.log(output);
        }
        // rows.map(row => {
        //     console.log(row);
        // });
    }
    // if (rows[2].substring(0,2) === '210') {
    // console.log(rows[0]);
    // console.log(rows[1]);
    // console.log(rows[2]);
    // }
    // console.log(rows[0]);
    // console.log(rows[1]);
    // console.log(rows[2]);
}

function getRoll() {
    let rows = [];

    new PdfReader().parseFileItems('./seeds/roll.pdf', (err, item) => {
        if (err) {
            console.error('error: ', err);
        } else if (!item) {
            console.warn('end of file');
        } else if (item.text) {
            // row of asterisks represents a new parcel
            if (item.text.includes('*******')) {
                flushRows(rows);
                rows = [];
            } else {
                let items = item.text.split('   ');
                rows = rows.concat(items);
                // rows.push(item.text);
            }
        }
    });
}

getRoll();