// constains config info, ie. database credentials, etc

const config = {

    db: {
        // dont expose this stuff (obviously)
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "planner_db",
    },
};

module.exports = config;
