const express = require('express');
const {resolve} = require('path');
const fileUploader = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

require('./dataBase').getInstance().setModels();

const {
    PatientRouter,
    DoctorRouter,
    AuthRouter,
    CommentRouter,
    AdminRouter,
    MedicalServiceRouter,
    ReceptionRouter,
    GenderRouter,
    UserRouter

} = require('./router');
const {ResponseStatusCodes} = require('./constant');
const {emailService} = require('./services');
const config = require('./config/configs');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize({}));

app.use(fileUploader({}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(resolve(__dirname, 'public')));
global.appRoot = __dirname;

require('./helpers/googleStrategy');
require('./helpers/facebookStrategy');

app.use('/patients', PatientRouter);
app.use('/doctors', DoctorRouter);
app.use('/auth', AuthRouter);
app.use('/comments', CommentRouter);
app.use('/admin', AdminRouter);
app.use('/services', MedicalServiceRouter);
app.use('/receptions', ReceptionRouter);
app.use('/genders', GenderRouter);
app.use('/genders', GenderRouter);
app.use('/users', UserRouter);


app.use((err, req, res, next) => {

    res
        .status(err.status || ResponseStatusCodes.SERVER_ERROR)
        .json({
            status: err.status,
            message: err.message || 'Unknown Error',
            code: err.code

        });
});

app.listen(config.PORT, (err) => {
    if (err) console.log(err);

    console.log(`listening port ${config.PORT}...`);
    // emailService.sendRememberRecordMail()


});
