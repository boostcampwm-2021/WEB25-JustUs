module.exports = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [process.env.ENTITIY_PATH],
  synchronize: true, // false로 해두는 게 안전하다.
};
