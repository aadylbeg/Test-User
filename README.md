## Getting Start

To set up the project, please follow these steps:

1. Run the following command to install the required dependencies:

```shell
    npm install
    npm install --save sequelize
    npm install -g sequelize-cli
    npm install --save pg pg-hstore
    npm install --save pg
```

2. Create a `.env` file in the project's root directory with the following content:

```shell
    PORT = < your_port >
    JWT_SECRET = < your_secret >
```

run command:

```shell
    sequelize init
```

Update congif.json file in config folder as:

```shell
    "development":
        {
            "username": < your_username >,
            "password": < your_password >,
            "database": < your_db >,
            "host": < your_port > as default 127.0.0.1,
            "dialect": "postgres",
        }

```

Note: Replace `< your_port >`, `< your_secret >`, `< your_username >`, `< your_password >`, ` < your_db >` and `< your_port >` with your actual values.

3. Seed users into the database by running the following command:

```shell
   sequelize db:seed:all
```

4. Start the project by running the following command:

```shell
   npm start
```

all you needed apis in the `TestUser.postman_collection.json` file

You can login by using one of users in seeders:

- email:
- password:

Feel free to explore the project and customize it according to your needs. Happy coding!
