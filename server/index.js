const PORT = process.env.PORT || 8080;
const app = require('./app');
const db = require('./db');

const init = async()=> {
 await db.syncAndSeed()
 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

init();
