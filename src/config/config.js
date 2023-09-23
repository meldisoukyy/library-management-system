const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
	env: process.env.NODE_ENV,
};

module.exports = config;
