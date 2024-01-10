require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");
const port = process.env.PORT || 1122;

const server = app.listen(port, async () => {
  await sequelize.authenticate();
  console.log(`Connected and running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
