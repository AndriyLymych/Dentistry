const express = require('express');
const {resolve} = require('path');
const fileUploader = require('express-fileupload');

require('./dataBase').getInstance().setModels();
const {PatientRouter, DoctorRouter, AuthRouter, CommentRouter, AdminRouter, MedicalServiceRouter} = require('./router');
const {ResponseStatusCodesEnum} = require('./constant');
const config = require('./config/configs');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(resolve(__dirname, 'public')));
global.appRoot = __dirname;
fileUploader({});

app.use('/patients', PatientRouter);
app.use('/doctors', DoctorRouter);
app.use('/auth', AuthRouter);
app.use('/comments', CommentRouter);
app.use('/admin', AdminRouter);
app.use('/services', MedicalServiceRouter);

app.use((err, req, res, next) => {
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

app.listen(config.PORT, async (err) => {
    if (err) console.log(err);

    console.log(`listening port ${config.PORT}...`);
    // await telegramService.sendTelegramMessage
});
