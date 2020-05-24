var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
    });
}

if (env === 'production') {
    process.env.JWT_SECRET = "isocjcoje093cewr25543fsdvds3",
        process.env.AVATAR_FIELD = "avatar",
        process.env.AVATAR_BASE_URL = "/uploads/avatars",
        process.env.AVATAR_STORAGE = "uploads/avatars"
}

