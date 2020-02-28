const config = require('config');
const Joi = require('@hapi/joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const coursesR = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.use(express.json());
app.use(helmet());
app.use('/api/courses', coursesR) //for any routes that start with '/api/courses', use the courses router that's loaded above
app.use('/', home)

app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
    app.use(morgan('combined'));
    console.log('Morgan Enabled...')
}


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${app.get('env')}`);

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' },
];

//configuration
console.log("Application Name: " + config.get('name'));
console.log("Mailer Server: " + config.get('mail.host'));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!!`));