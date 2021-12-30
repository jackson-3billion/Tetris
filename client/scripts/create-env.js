const fs = require('fs');

const path = './.env';
const vars = `SERVER_URL=${process.env.SERVER_URL}`;

fs.writeFileSync(path, vars);
