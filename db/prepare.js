const pg = require('pg');


let connection=process.env.DATABASE_URL;

if(!connection){
  connection=process.env.LOCAL_DB;
}

const pool = new pg.Pool({
    connectionString: connection,
    ssl: {
      rejectUnauthorized: false
    }
  });

  pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.connect();


module.exports = {
	pool,
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	}
}
