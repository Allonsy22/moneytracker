const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const loginRoutes = require('./api/routes/login');

app.use( morgan("tiny") );
app.use( cors() );
app.use( bodyParser.json() );

app.use('/login', loginRoutes);


const port = process.env.PORT || 2222;
app.listen( port, () => {
    console.log( `listening on port: ${port}`);
});