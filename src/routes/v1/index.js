const express = require('express');
const bookRoute = require('./book');
const borrowerRoute = require('./borrower');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/books',
    route: bookRoute
  },
  {
    path: '/borrowers',
    route: borrowerRoute
  }
];

const healthRoutes = [
  {
    path: '/health',
    callback: (req, res) => {
      res.status(200).send({ message: 'OK' });
    }
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

healthRoutes.forEach((route) => {
  router.get(route.path, route.callback);
});

module.exports = router;
