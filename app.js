const express = require('express');
const {resolve} = require('path');
const fileUploader = require('express-fileupload');

const db = require('./dataBase').getInstance().setModels();
fileUploader({});

const {UserRouter} = require('./router');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(resolve(__dirname,'public')));
global.appRoot = __dirname;

app.use('/users', UserRouter);

app.all('*', (req, res) => {
    res.status(400).end()
});

app.listen(3000, (err) => {
    if (err) console.log(err);

    console.log('listening port 3000...');
});
