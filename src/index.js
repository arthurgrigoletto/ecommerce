const app = require('./config/custom-express')();

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

app.listen(port);
