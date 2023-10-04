export default () => ({
  port: process.env.PORT,
  database: {
    type: 'mysql',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [],
    synchronize: process.env.POSTGRES_SYNCRONIZE === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  bcrypt: {
    salt: process.env.BCRYPT_SALT,
  },
});
