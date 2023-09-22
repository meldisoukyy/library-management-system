var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.status(200).send({
		message: 'Welcome to the Library Management System',
	});
});

router.get('/health', function (req, res) {
	res.status(200).send({ message: 'OK' });
});

module.exports = router;
