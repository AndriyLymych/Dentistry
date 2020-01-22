const express = require('express');
const {resolve} = require('path');
const fileUploader = require('express-fileupload');

require('./dataBase').getInstance().setModels();
const {PatientRouter,DoctorRouter, AuthRouter} = require('./router');
const {ResponseStatusCodesEnum} = require('./constant');
const config = require('./config/configs');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(resolve(__dirname, 'public')));
global.appRoot = __dirname;
fileUploader({});

app.use('/patients', PatientRouter);
app.use('/doctors',DoctorRouter);
app.use('/auth', AuthRouter);

app.use((err, req, res) => {
    res
        .status(err.status || ResponseStatusCodesEnum.SERVER_ERROR)
        .json({
            error: {
                message: err.message || 'Unknown Error',
                code: err.code,
                data: err.data
            }
        });
});

app.listen(config.PORT, (err) => {
    if (err) console.log(err);

    console.log(`listening port ${config.PORT}...`);
});
