module.exports = {
    HOST: process.env.HOST || 'http://localhost',
    PORT: process.env.PORT || 5000,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ||
        'gffxfxhhghgchghgcghhcghcg',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '67755756756gdhdhhdt',

    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '3295493364010175',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '7f689bad538ef3634930749ad415a5af',

    JWT_SECRET_ACCESS: '1212_32jjk;f;jdso;ofs_fdsdfs$sfsdfadss_ADsafdsaa23df..sddf',
    JWT_SECRET_REFRESH: 'klfdskkhldfhkldfh_sdffs3244_fssdfj4KF%sfsdfAAASSdddfjsdfds',
    JWT_SECRET_CHANGE_PASSWORD: 'laksfklaf124124214_@!1_1424nkfalkklwegngwlll3weewf',

    ACCESS_TOKEN_LIFE: 1,
    REFRESH_TOKEN_LIFE: '20d',
    TOKEN_FOR_RESET_PASSWORD_LIFE: '10d'
};
