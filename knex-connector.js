const knex = require('knex');
const connString = require('./connection_pg.json');

//############# conecting PostgreSQL ###############
const connectedKnex = require('knex')({
    client: 'pg',
    version: '12',
    connection: connString
  });
  
  

module.exports = connectedKnex;