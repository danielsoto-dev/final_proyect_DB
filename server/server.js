const app = require('./app');
//require('dotenv').config();
async function run() {
  const port = app.get('port');
  await app.listen(port);
  console.log('Up and running on: ' + port);
}
run();
