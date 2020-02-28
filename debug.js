const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const morgan = require('morgan');
const app = express();

if (app.get('env') === 'development') {
    app.use(morgan('combined'));
    console.log('Morgan Enabled...')
}

//db work
dbDebugger('Connected to db');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});