export default () => ({
  ports: {
    main: parseInt(process.env.PORT) || 3000,
    socket: 3005,
  },
  database: {
    mongoUrl: process.env.MONGO_URL,
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
});
