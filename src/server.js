const express = require('express');
const routes = require('./routes/routes');

require('./database');
require('dotenv').config;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT_SIS, () => console.log('Api On'));