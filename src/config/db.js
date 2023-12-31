const config = {
  development: {
    username: 'debug',
    password: 'debug',
    database: 'database_development',
    host: 'db',
    dialect: 'postgres'
  },
  test: {
    username: 'test',
    password: 'test',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};

module.exports = config;
