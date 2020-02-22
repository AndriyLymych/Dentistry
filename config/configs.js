module.exports = {
    HOST: process.env.HOST || 'http://localhost',
    PORT: process.env.PORT || 3000,

    JWT_SECRET_ACCESS: '1212_32jjk;f;jdso;ofs_fdsdfs$sfsdfadss_ADsafdsaa23df..sddf',
    JWT_SECRET_REFRESH: 'klfdskkhldfhkldfh_sdffs3244_fssdfj4KF%sfsdfAAASSdddfjsdfds',
    JWT_SECRET_CHANGE_PASSWORD: 'laksfklaf124124214_@!1_1424nkfalkklwegngwlll3weewf',

    ACCESS_TOKEN_LIFE : '10d',
    REFRESH_TOKEN_LIFE : '90d',
    TOKEN_FOR_RESET_PASSWORD_LIFE : '10d'
};
