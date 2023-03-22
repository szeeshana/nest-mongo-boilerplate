export default () => ({
  ports: {
    main: parseInt(process.env.PORT) || 3000,
    socket: 3005,
  },
  database: {
    mongoUrl: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DBNAME,
  },
  mail: {
    sengrid: {
      email: process.env.FROM_EMAIL,
      key: process.env.SENDGRID_SECRET_KEY,
    },
  },
  aws: {
    id: process.env.ACCESS_KEY_ID,
    key: process.env.SECRET_ACCESS_KEY,
    s3: {
      bucketName: process.env.AWS_BUCKET_NAME,
      region: process.env.AWS_REGION,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    expiry: parseInt(process.env.JWT_EXPIRY),
    secret: process.env.JWT_SECRET,
  },
  jwtVerification: {
    secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
    expiry: parseInt(process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME),
    confirmUrl: process.env.EMAIL_CONFIRMATION_URL,
  },
  seed: {
    user: {
      admin: process.env.EMAIL_FOR_ADMIN,
      user: process.env.EMAIL_FOR_USER,
    },
  },
});
