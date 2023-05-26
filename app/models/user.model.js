module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING,
        },
        balance: {
            type: Sequelize.DECIMAL(10, 2),
        },
        refresh_token: {
            type: Sequelize.STRING,
        },
    });

    return User;
};
